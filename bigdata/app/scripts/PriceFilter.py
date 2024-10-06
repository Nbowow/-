import difflib
import re
from collections.abc import Sequence

import pytz
from hdfs import InsecureClient
from pyspark.sql import SparkSession
from sqlalchemy import Column, BigInteger, String, Boolean, select, DateTime, ForeignKey, Integer
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

kst = pytz.timezone('Asia/Seoul')

DATABASE_URL = "mysql+pymysql://eejuuung:eejuuung@mysql:3306/yorijori?charset=utf8mb4"

# 공통코드 (알러지 목록) 매핑 사전
allergy_code_mapping = {
    '알류': 'A_0001',
    '우유': 'A_0002',
    '메밀': 'A_0003',
    '땅콩': 'A_0004',
    '대두 (콩)': 'A_0005',
    '밀': 'A_0006',
    '잣': 'A_0007',
    '호두': 'A_0008',
    '게': 'A_0009',
    '새우': 'A_0010',
    '오징어': 'A_0011',
    '고등어': 'A_0012',
    '조개류': 'A_0013',
    '복숭아': 'A_0014',
    '토마토': 'A_0015',
    '닭고기': 'A_0016',
    '돼지고기': 'A_0017',
    '쇠고기': 'A_0018',
    '아황산류 (황산화물)': 'A_0019'
}

# 사전 정의된 매칭 규칙
material_mapping = {
    '소고기': '소고기 안심',
    '소 고기': '소고기 안심',
    '쇠고기': '소고기 안심',
    '쇠 고기': '소고기 안심',
    '돼지고기': '돼지고기 삼겹살',
    '돼지 고기': '돼지고기 삼겹살',
    # 필요시 더 많은 규칙 추가
}

# 알러지 항목에 따른 세부 품목 리스트
allergy_mapping = {
    '알류': ['달걀', '계란', '메추리알', '오리알', '거위알', '난백', '흰자', '난황', '노른자', '계란 파우더', '난백 파우더', '마요네즈', '타르타르 소스', '홀랜다이즈 소스',
           '에그누들', '팬케이크 믹스', '머랭', '크레페', '에그'],
    '우유': ['우유', '연유', '크림', '치즈', '버터', '요거트', '사워 크림', '카제인', '유청 단백질', '우유 분말'],
    '메밀': ['메밀가루', '메밀면', '소바', '메밀빵', '메밀 크래커', '메밀 팬케이크', '메밀'],
    '땅콩': ['땅콩', '땅콩버터', '땅콩 오일', '땅콩 가루', '땅콩 소스', '땅콩 스낵'],
    '대두 (콩)': ['대두', '콩', '두부', '된장', '간장', '콩기름', '콩 단백질', '템페', '낫토', '두유', '에다마메'],
    '밀': ['밀가루', '통밀', '빵', '파스타', '크래커', '시리얼', '쿠키', '케이크', '밀가루 베이스 믹스', '밀글루텐'],
    '잣': ['잣', '잣 오일', '잣 가루', '잣 페스토'],
    '호두': ['호두', '호두 오일', '호두 가루', '호두 스낵'],
    '게': ['게', '게살', '크랩 스틱', '게 소스'],
    '새우': ['새우', '건새우', '새우 페이스트', '새우칩'],
    '오징어': ['오징어', '마른 오징어', '오징어볼', '오징어젓갈'],
    '고등어': ['고등어', '고등어 통조림', '훈제 고등어'],
    '조개류': ['조개', '바지락', '홍합', '가리비', '굴', '전복', '모시조개', '대합'],
    '복숭아': ['복숭아', '복숭아 잼', '복숭아 통조림', '복숭아 주스'],
    '토마토': ['토마토', '토마토 페이스트', '토마토 소스', '토마토 퓨레', '케첩'],
    '닭고기': ['닭고기', '닭가슴살', '닭날개', '닭다리', '치킨 스톡', '닭고기 소시지'],
    '돼지고기': ['돼지고기', '삼겹살', '베이컨', '햄', '소시지', '돼지갈비'],
    '쇠고기': ['쇠고기', '소고기', '스테이크', '쇠고기 소시지', '쇠고기 스톡', '쇠고기 다짐육'],
    '아황산류': ['건조 과일', '와인']
}


class Materials(Base):
    __tablename__ = "materials"

    material_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    material_name = Column(String(20), nullable=False)
    material_price_status = Column(Boolean, default=False, nullable=False)
    material_img = Column(String(512))
    material_allergy_num = Column(String(20))

    year_price = relationship("YearPrice", back_populates="material")
    month_price = relationship("MonthPrice", back_populates="material")
    week_price = relationship("WeekPrice", back_populates="material")
    day_price = relationship("DayPrice", back_populates="material")


class YearPrice(Base):
    __tablename__ = "yearprice"

    year_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    year_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="year_price")


class MonthPrice(Base):
    __tablename__ = "monthprice"

    month_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    month_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="month_price")


class WeekPrice(Base):
    __tablename__ = "weekprice"

    week_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    week_price_day = Column(DateTime, nullable=False)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="week_price")


class DayPrice(Base):
    __tablename__ = "dayprice"

    day_price_id = Column(BigInteger, primary_key=True, autoincrement=True, index=True, nullable=False)
    day_price_day = Column(DateTime, nullable=False)
    day_price = Column(Integer, default=0)

    material_id = Column(BigInteger, ForeignKey("materials.material_id"), nullable=False)
    material = relationship("Materials", back_populates="day_price")


class engineconnection:

    def __init__(self):
        self.engine = create_engine(DATABASE_URL, echo=False, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()

        return conn


# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')
hdfs_directory = "/user/root/price/"

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("Filter Price Squash") \
    .config("spark.sql.shuffle.partitions", "50") \
    .getOrCreate()


def main():
    # 파일 경로를 이용해 데이터를 정제 및 저장
    print("1. hdfs 파일 정제시작")
    process_price_data()

    print(f"Uploaded data to MySQL")

    spark.stop()
    return {"message": "All files processed and uploaded to MySQL"}


def process_price_data():
    print("2. hdfs 에서 파일 읽기")
    df = spark.read.csv(
        "hdfs://master:9000/user/root/price/*.csv",
        header=True,
        inferSchema=True,
        encoding='utf-8'
    )

    print("3. hdfs read.csv 성공")
    # item_name이 null이 아닌 행만 필터링
    df = df.filter(df['item_name'].isNotNull())

    # 데이터를 리스트로 변환 (collect 사용)
    rows = df.collect()

    print(f"남아있는 데이터의 수: {len(rows)}")

    for idx, row in enumerate(rows, 1):  # idx는 1부터 시작
        # 각 row를 순회하며 필요한 값들을 가져옴
        item_name = row['item_name']
        unit = row['unit']
        price = row['dpr1']
        date = row['day1']

        print(f"총 {len(rows)}개 중 {idx}번째 row 처리 중입니다.")

        print(f"변환전 unit/price: {unit} / {price}")
        # 필요시 각 데이터를 정제
        if unit and price:
            price = convert_price_udf(unit, price)  # 가격 변환
        print(f"변환된 가격: {price}")

        # 날짜 정제 (괄호 제거 및 변환)
        if date:
            match = re.search(r'\((\d{2}/\d{2})\)', date)
            if match:
                extracted_date = match.group(1)  # "01/01"을 추출
                date = f"2024/{extracted_date[:2]}/{extracted_date[3:]}"  # "2024/01/01"로 변환
                print(f"변환된 날짜: {date}")
            else:
                print("날짜 형식이 맞지 않습니다.")

        # 정제된 데이터를 DB에 저장
        db_material_id = get_material_id(item_name)  # DB에서 material_id 가져옴
        print(f"material_id: {db_material_id}")

        save_dayprice_db(db_material_id, {'day1': date, 'dpr1': price})  # DB에 저장

    print("데이터 정제가 완료되고 DB에 저장되었습니다.")


# 단위별 가격 변환을 위한 UDF 등록
def convert_price_udf(unit, price):
    if price is None or price in ['-', '']:  # 가격이 None, '-' 또는 빈 문자열일 경우
        return 0.0  # 0으로 설정

    price = int(price.replace(',', ''))  # 가격 문자열에서 쉼표를 제거한 후 정수로 변환

    unit_value = extract_number(unit)  # 숫자만 추출하여 float로 변환

    if 'kg' in unit:
        return int(price / (unit_value * 10))
    elif 'g' in unit:
        return int(price / (unit_value / 100))
    elif any(x in unit for x in ['포기', '개', '장', '마리', '구', '손']):
        return int(price)
    elif 'L' in unit:
        return int(price)
    return int(price)


# 단위에서 숫자만 추출하고 괄호 및 그 안의 내용을 제거하는 함수
def extract_number(unit_string):
    unit_string = re.sub(r'\(.*?\)', '', unit_string).strip()  # 괄호 제거
    number = ''.join(filter(str.isdigit, unit_string))  # 숫자만 추출
    return float(number) if number else 1.0  # 숫자가 없으면 기본값 1.0 반환


def save_dayprice_db(get_db_data, row):
    engine = engineconnection()
    session = engine.sessionmaker()

    # 중복 데이터 확인 로직 추가
    existing_price = session.query(DayPrice).filter(
        DayPrice.material_id == get_db_data,
        DayPrice.day_price_day == row['day1']
    ).first()

    if existing_price:
        session.close()
        return

    new_day_price = DayPrice(
        day_price_day=row['day1'],
        material_id=get_db_data,  # material_id는 별도로 조회해야 함
        day_price=row['dpr1']  # dpr1 가격 추가
    )
    session.add(new_day_price)
    session.commit()  # 새로운 재료를 데이터베이스에 추가
    session.close()


def get_allergy_num(material_name):
    for allergy_category, items in allergy_mapping.items():
        best_match = get_best_allergy_match(material_name, items, 0.8)

        if best_match != material_name:
            print(f"'{material_name}'이(가) '{best_match}' 항목으로 매칭되었습니다. 알레르기 카테고리: {allergy_category}")
            allergy_code = allergy_code_mapping.get(allergy_category)

            if allergy_code:
                return allergy_code  # 알레르기 공통 코드 반환
            else:
                print(f"'{allergy_category}'에 대한 알레르기 코드가 존재하지 않습니다.")

    return ""  # 알레르기 코드가 없는 경우 None 반환


def get_best_allergy_match(item_name, reference_names, match_value):
    match = difflib.get_close_matches(item_name, reference_names, n=1,
                                      cutoff=match_value)
    if match:
        return match[0]
    return item_name


def get_best_material_match(item_name, reference_names, match_value):
    match = difflib.get_close_matches(item_name, reference_names, n=1,
                                      cutoff=match_value)
    if match:
        return match[0]
    return item_name


def get_material_id(material_name):
    # 재료 존재여부 확인하고 테이블 추가
    engine = engineconnection()
    session = engine.sessionmaker()

    try:
        print(f"입력된 재료명: '{material_name}'")  # 입력된 재료명 확인

        # 기존 재료 리스트 추출 (재료 이름 리스트)
        stmt_reference = select(Materials.material_name)
        reference_materials: Sequence[str] = session.execute(stmt_reference).scalars().all()  # Sequence로 변경

        # 참조 재료 리스트가 비어 있는 경우 바로 새로운 재료 추가
        if not reference_materials:
            allergy_num = get_allergy_num(material_name)
            print(f"참조 재료 리스트가 비어 있습니다. 새 재료 추가: '{material_name}', 알레르기 번호: {allergy_num}")  # 추가될 재료 정보 확인
            new_material = Materials(
                material_name=material_name,
                material_price_status=True,
                material_allergy_num=allergy_num,  # 알레르기 번호 추가
            )
            session.add(new_material)
            session.commit()  # 새로운 재료를 데이터베이스에 추가
            print(f"'{material_name}' 재료가 추가되었습니다. 새로운 ID: {new_material.material_id}")  # 추가 확인
            return new_material.material_id  # material_id만 반환

        # 재료명 유사도 계산하여 가장 유사한 이름 반환
        best_match = get_best_material_match(material_name, reference_materials, 0.85)

        print(f"최고 매칭 재료명: '{best_match}'")  # 매칭된 재료명 확인

        # 유사도가 높은 재료가 있는지 확인
        if best_match != material_name:
            print(f"'{material_name}'이(가) '{best_match}'으로 매칭되었습니다.")
            material_name = best_match  # 유사한 값으로 재료명 변경

        # 재료가 존재하는지 확인하는 쿼리
        stmt = select(Materials).where(Materials.material_name == material_name)

        # 쿼리 실행
        material = session.execute(stmt).scalars().first()

        if material:
            print(f"'{material_name}'이(가) 이미 존재합니다. ID: {material.material_id}")
            return material.material_id  # material_id만 반환
        else:
            # 재료가 없다면 새로운 재료 추가 (material_id는 auto increment로 자동 처리)
            allergy_num = get_allergy_num(material_name)
            print(f"새 재료 추가: '{material_name}', 알레르기 번호: {allergy_num}")  # 추가될 재료 정보 확인
            new_material = Materials(
                material_name=material_name,
                material_allergy_num=allergy_num,  # 알레르기 번호 추가
                material_price_status=True
            )
            session.add(new_material)
            session.commit()  # 새로운 재료를 데이터베이스에 추가
            print(f"'{material_name}' 재료가 추가되었습니다. 새로운 ID: {new_material.material_id}")  # 추가 확인
            return new_material.material_id  # material_id만 반환
    except Exception as e:
        session.rollback()  # 오류 발생 시 트랜잭션 롤백
        print(f"재료 처리 중 오류 발생: {str(e)}")
    finally:
        session.close()


if __name__ == "__main__":
    main()
