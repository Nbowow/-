import datetime
import difflib

from fastapi import FastAPI
from hdfs import InsecureClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_replace, col, when, regexp_extract
from sqlalchemy import MetaData, Column, BigInteger, String, Boolean, select, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base
from app.database.database import engineconn

# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')
hdfs_directory = "/user/root/recipe/"

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

# 종류별 카테고리 매핑 사전
category_mapping = {
    '전체': 'B_0001',
    '밑반찬': 'B_0002',
    '메인반찬': 'B_0003',
    '국/탕': 'B_0004',
    '찌개': 'B_0005',
    '디저트': 'B_0006',
    '면/만두': 'B_0007',
    '밥/죽/떡': 'B_0008',
    '퓨전': 'B_0009',
    '김치/젓갈/장류': 'B_0010',
    '양념/소스/잼': 'B_0011',
    '양식': 'B_0012',
    '샐러드': 'B_0013',
    '스프': 'B_0014',
    '빵': 'B_0015',
    '과자': 'B_0016',
    '차/음료/술': 'B_0017',
    '기타': 'B_0018'
}

# 상황별 카테고리 매핑 사전
situation_mapping = {
    '전체': 'C_0001',
    '일상': 'C_0002',
    '초스피드': 'C_0003',
    '손님접대': 'C_0004',
    '술안주': 'C_0005',
    '다이어트': 'C_0006',
    '도시락': 'C_0007',
    '영양식': 'C_0008',
    '간식': 'C_0009',
    '야식': 'C_0010',
    '푸드스타일링': 'C_0011',
    '해장': 'C_0012',
    '명절': 'C_0013',
    '이유식': 'C_0014',
    '기타': 'C_0015'
}

# 재료별 카테고리 매핑 사전
ingredient_mapping = {
    '전체': 'D_0001',
    '소고기': 'D_0002',
    '돼지고기': 'D_0003',
    '닭고기': 'D_0004',
    '육류': 'D_0005',
    '채소류': 'D_0006',
    '해물류': 'D_0007',
    '달걀/유제품': 'D_0008',
    '가공식품류': 'D_0009',
    '쌀': 'D_0010',
    '밀가루': 'D_0011',
    '건어물류': 'D_0012',
    '버섯류': 'D_0013',
    '과일류': 'D_0014',
    '콩/견과류': 'D_0015',
    '곡류': 'D_0016',
    '기타': 'D_0017'
}

# 방법별 카테고리 매핑 사전
method_mapping = {
    '전체': 'E_0001',
    '볶음': 'E_0002',
    '끓이기': 'E_0003',
    '부침': 'E_0004',
    '조림': 'E_0005',
    '무침': 'E_0006',
    '비빔': 'E_0007',
    '찜': 'E_0008',
    '절임': 'E_0009',
    '튀김': 'E_0010',
    '삶기': 'E_0011',
    '굽기': 'E_0012',
    '데치기': 'E_0013',
    '회': 'E_0014',
    '기타': 'E_0015'
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
    '메밀': ['메밀가루', '메밀면 (소바)', '메밀빵', '메밀 크래커', '메밀 팬케이크', '메밀'],
    '땅콩': ['땅콩', '땅콩버터', '땅콩 오일', '땅콩 가루', '땅콩 소스', '땅콩 스낵'],
    '대두 (콩)': ['대두', '콩', '두부', '된장', '간장', '콩기름', '콩 단백질', '템페', '낫토', '두유', '에다마메'],
    '밀': ['밀가루', '통밀', '빵', '파스타', '크래커', '시리얼', '쿠키', '케이크', '밀가루 베이스 믹스', '밀글루텐'],
    '잣': ['잣', '잣 오일', '잣 가루', '잣 페스토'],
    '호두': ['호두', '호두 오일', '호두 가루', '호두 스낵'],
    '게': ['게', '게살', '크랩 스틱 (가공 게 제품)', '게 소스'],
    '새우': ['새우', '건새우', '새우 페이스트', '새우칩'],
    '오징어': ['오징어', '마른 오징어', '오징어볼', '오징어젓갈'],
    '고등어': ['고등어', '고등어 통조림', '훈제 고등어'],
    '조개류': ['조개', '바지락', '홍합', '가리비', '굴', '전복', '모시조개', '대합'],
    '복숭아': ['복숭아', '복숭아 잼', '복숭아 통조림', '복숭아 주스'],
    '토마토': ['토마토', '토마토 페이스트', '토마토 소스', '토마토 퓨레', '케첩'],
    '닭고기': ['닭고기', '닭가슴살', '닭날개', '닭다리', '치킨 스톡', '닭고기 소시지'],
    '돼지고기': ['돼지고기', '삼겹살', '베이컨', '햄', '소시지', '돼지갈비'],
    '쇠고기': ['쇠고기', '소고기', '스테이크', '쇠고기 소시지', '쇠고기 스톡', '쇠고기 다짐육'],
    '아황산류 (황산화물)': ['건조 과일', '와인']
}

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("Filter Squash") \
    .config("spark.sql.shuffle.partitions", "50") \
    .getOrCreate()


class Materials(Base):
    __tablename__ = "Materials"

    material_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    material_name = Column(String(20), nullable=False)
    material_price_status = Column(Boolean, default=False, nullable=False)
    material_img = Column(String(512))
    material_allergy_num = Column(String(20))


class RecipeMaterials(Base):
    __tablename__ = "RecipeMaterials"

    recipe_material_id = Column(BigInteger, primary_key=True, nullable=False, index=True)
    recipe_material_amount = Column(String(100))
    recipe_material_unit = Column(String(100))

    recipe_id = Column(BigInteger, ForeignKey("Recipes.recipe_id"), nullable=False)
    recipe = relationship("Recipes", back_populates="recipe_materials")


class Recipes(Base):
    __tablename__ = "Recipes"

    recipe_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    recipe_title = Column(String(255))
    recipe_name = Column(String(255))
    recipe_intro = Column(String(1024))
    recipe_image = Column(String(255))
    recipe_like_count = Column(BigInteger, default=0, nullable=False)
    recipe_view_count = Column(BigInteger, default=0, nullable=False)
    recipe_servings = Column(Integer, default=1, nullable=False)
    recipe_time = Column(Integer, default=30, nullable=False)
    recipe_level = Column(String(10), default="아무나", nullable=False)
    recipe_type = Column(String(20))
    recipe_situation = Column(String(20))
    recipe_ingredients = Column(String(20))
    recipe_method = Column(String(20))
    created_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    modified_date = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    user_status = Column(Boolean, default=True, nullable=False)

    user_id = Column(BigInteger, ForeignKey("Users.user_id"), nullable=False)
    user = relationship("Users", back_populates="recipe")

    recipe_orders = relationship("RecipeOrders", back_populates="recipe")

    recipe_materials = relationship("RecipeMaterials", back_populates="recipe")

    recipe_nutrient = relationship("RecipeNutrient", back_populates="recipe")


class RecipeOrders(Base):
    __tablename__ = "RecipeOrders"

    recipe_order_id = Column(BigInteger, primary_key=True, index=True, autoincrement=True, nullable=False)
    recipe_order_content = Column(String(512), nullable=False)
    recipe_order_num = Column(Integer, nullable=False)
    recipe_order_img = Column(String(512))

    recipe_id = Column(BigInteger, ForeignKey("Recipes.recipe_id"), nullable=False)

    recipe = relationship("Recipes", back_populates="recipe_orders")


def main():
    file_statuses = hdfs_client.list(hdfs_directory)

    print("1. hdfs 파일 목록 읽기")

    for file_name in file_statuses:
        file_path = f"hdfs://master:9870{hdfs_directory}{file_name}"

        # 파일 경로를 이용해 데이터를 정제 및 저장
        print("2. hdfs 파일 정제시작")
        process_recipe_data(file_path)

        print(f"Uploaded data from {file_name} to MySQL")

    return {"message": "All files processed and uploaded to MySQL"}


# HDFS 파일을 읽고 Spark DataFrame으로 처리하여 정제하는 함수
def process_recipe_data(file_path):
    # HDFS에서 데이터 읽기
    df = spark.read.csv(
        "hdfs://master:9000/user/root/recipe/*.csv",
        header=True,
        inferSchema=True,
        encoding='utf-8'
    )

    print("3. hdfs read.csv 성공")
    # 레시피이름, 글 제목, 조리순서가 null이 아닌 행만 필터링
    df = df.filter(df['레시피이름'].isNotNull() & df['글 제목'].isNotNull() & df['조리순서'].isNotNull())

    # 조회수 데이터에서 콤마를 제거하고 정수형으로 변환
    df = df.withColumn("조회수", regexp_replace(col("조회수"), ",", "").cast("int"))

    # 종류별 카테고리를 코드로 변환 (기본값: '기타')
    df = df.withColumn("종류별",
                       when(col("종류별").isin(list(category_mapping.keys())),
                            col("종류별").map(category_mapping))
                       .otherwise("B_0018"))

    # 상황별 카테고리를 코드로 변환 (기본값: '기타')
    df = df.withColumn("상황별",
                       when(col("상황별").isin(list(situation_mapping.keys())),
                            col("상황별").map(situation_mapping))
                       .otherwise("C_0015"))

    # 재료별 카테고리를 코드로 변환 (기본값: '기타')
    df = df.withColumn("재료별",
                       when(col("재료별").isin(list(ingredient_mapping.keys())),
                            col("재료별").map(ingredient_mapping))
                       .otherwise("D_0017"))

    # 방법별 카테고리를 코드로 변환 (기본값: '기타')
    df = df.withColumn("방법별",
                       when(col("방법별").isin(list(method_mapping.keys())),
                            col("방법별").map(method_mapping))
                       .otherwise("E_0015"))

    # 조리시간
    df = df.withColumn(
        "조리시간",
        when(
            col("조리시간").isNull(), 60  # None 또는 null 값일 경우 60으로 고정
        ).otherwise(
            regexp_extract(col("조리시간"), r'(\d+)', 1).cast("int")  # 숫자만 추출하여 int로 변환
        )
    )

    # 인분 데이터를 숫자만 추출하고 None 또는 비어 있으면 1로 설정
    df = df.withColumn("인분", when(col("인분").isNull() | (col("인분") == ""), 1)
                       .otherwise(regexp_extract(col("인분"), r'(\d+)', 1).cast("int")))
    print("4. df 정제")

    # 필요한 컬럼만 선택하고 이름 변경
    selected_columns = df.select(
        col("index").alias("recipe_id"),
        col("글 제목").alias("recipe_title"),
        col("레시피이름").alias("recipe_name"),
        col("소개글").alias("recipe_intro"),
        col("조회수").alias("recipe_view_count"),
        col("조리시간").alias("recipe_time"),
        col("난이도").alias("recipe_level"),
        col("인분").alias("recipe_servings"),
        col("종류별").alias("recipe_type"),
        col("상황별").alias("recipe_situation"),
        col("재료별").alias("recipe_ingredients"),
        col("방법별").alias("recipe_method")
    )
    print("5. 재료, 조리순서 db 추가")
    # 재료, 조리순서 컬럼 db데이터 추가
    for row in df.collect():
        print("6. 레시피 저장")
        recipe_id = save_recipe_to_db(row)  # 레시피 저장 함수, 각 레시피에 대해 recipe_id 반환

        print("7. 레시피 재료 저장")
        process_recipe_ingredients(row['재료'], recipe_id)

        # 레시피 단계별 정보 저장
        print("8. 레시피 주문 저장")
        recipe_orders = eval(row['recipe_orders'])  # JSON 형태의 recipe_orders를 파이썬 리스트로 변환
        process_recipe_orders(recipe_orders, recipe_id)


def save_recipe_to_db(row):
    engine = engineconn()
    session = engine.sessionmaker()

    # 중복 확인을 위해 기존 레시피 확인 (예: 레시피 이름과 제목을 기준으로 중복 확인)
    existing_recipe = session.query(Recipes).filter(
        Recipes.recipe_id == row['recipe_id'],
        Recipes.recipe_name == row['recipe_name'],
        Recipes.recipe_title == row['recipe_title']
    ).first()

    if existing_recipe:
        print(f"이미 존재하는 레시피입니다: {existing_recipe.recipe_id}")
        return existing_recipe.recipe_id  # 중복된 레시피의 ID 반환

    new_recipe = Recipes(
        recipe_id=row['recipe_id'],
        recipe_title=row['recipe_title'],
        recipe_name=row['recipe_name'],
        recipe_intro=row['recipe_intro'],
        recipe_view_count=row['recipe_view_count'],
        recipe_time=row['recipe_time'],
        recipe_level=row['recipe_level'],
        recipe_servings=row['recipe_servings'],
        recipe_type=row['recipe_type'],
        recipe_situation=row['recipe_situation'],
        recipe_ingredients=row['recipe_ingredients'],
        recipe_method=row['recipe_method']
    )

    session.add(new_recipe)
    session.commit()

    print(f"레시피 저장 완료: {new_recipe.recipe_id}")
    return new_recipe.recipe_id  # 저장된 레시피의 ID 반환


# 레시피 단계를 처리하고 RecipeOrders 테이블에 저장하는 함수
def process_recipe_orders(recipe_orders, recipe_id):
    """
    레시피 단계별 정보를 RecipeOrders 테이블에 저장하는 함수
    """
    if isinstance(recipe_orders, list):
        for order in recipe_orders:
            try:
                step_number = order.get('step_number')
                description = order.get('description')
                image_url = order.get('image_url')

                # 단계가 제대로 전달되지 않은 경우 무시
                if step_number is None or description is None:
                    print(f"잘못된 레시피 단계 정보: {order}")
                    continue

                # RecipeOrders 테이블에 단계 정보 저장
                add_recipe_order(recipe_id, step_number, description, image_url)

            except Exception as e:
                print(f"레시피 단계를 저장하는 중 오류 발생: {str(e)}")
                continue
    else:
        print("레시피 단계 데이터가 리스트 형태가 아닙니다.")


# RecipeOrders 테이블에 단계를 추가하는 함수
def add_recipe_order(recipe_id, step_number, description, image_url):
    """
    RecipeOrders 테이블에 단계를 추가하는 함수
    """
    engine = engineconn()
    session = engine.sessionmaker()

    new_recipe_order = RecipeOrders(
        recipe_order_num=step_number,
        recipe_order_content=description,
        recipe_order_img=image_url,
        recipe_id=recipe_id
    )

    session.add(new_recipe_order)
    session.commit()
    print(f"레시피 ID {recipe_id}의 단계 {step_number} 저장 완료.")


def process_recipe_ingredients(ingredients_str, recipe_id):
    """
    재료 문자열을 처리하여 RecipeMaterials 테이블에 각 재료 정보를 저장하는 함수
    """
    ingredients = ingredients_str.split(',')
    for item in ingredients:
        try:
            material, amount_with_unit = item.split(':')  # 재료명과 양, 단위 분리
            material = material.strip()  # 재료명
            amount_with_unit = amount_with_unit.strip()  # 양과 단위

            # 양과 단위를 분리 (숫자와 단위 추출)
            amount, unit = extract_amount_and_unit(amount_with_unit)

            # 재료 ID 확인 또는 추가
            material_info = get_material_id(material)
            material_id = material_info['material_id']

            # RecipeMaterials 테이블에 재료 저장
            add_recipe_material(recipe_id, material_id, amount, unit)

        except ValueError:
            print(f"재료 데이터 분리 중 오류 발생: {item}")
            continue


def extract_amount_and_unit(amount_with_unit):
    """
    양과 단위를 분리하는 함수 (예: '600g'에서 '600'과 'g'를 분리)
    """
    import re
    match = re.match(r"(\d+)([a-zA-Z]+)", amount_with_unit)
    if match:
        return match.group(1), match.group(2)  # 숫자(양)와 단위 반환
    else:
        return amount_with_unit, ""  # 단위가 없으면 빈 문자열 반환


def add_recipe_material(recipe_id, material_id, amount, unit):
    """
    RecipeMaterials 테이블에 재료 정보를 추가하는 함수
    """
    engine = engineconn()
    session = engine.sessionmaker()

    try:
        new_recipe_material = RecipeMaterials(
            recipe_material_amount=amount,
            recipe_material_unit=unit,
            recipe_id=recipe_id,
            recipe_material_id=material_id  # 외부 키로 연결
        )

        session.add(new_recipe_material)
        session.commit()
        print(f"레시피 ID {recipe_id}에 재료 ID {material_id} 추가 완료.")

    except Exception as e:
        session.rollback()  # 오류 발생 시 트랜잭션 롤백
        print(f"레시피 재료 추가 중 오류 발생: {str(e)}")

    finally:
        session.close()


# 유사도 계산 함수
def get_best_match(item_name, reference_names, match_value):
    match = difflib.get_close_matches(item_name, reference_names, n=1, cutoff=match_value)  # 0.85 이상일 경우 매칭
    if match:
        return match[0]
    return item_name


# 재료가 알레르기 항목에 해당하는지 확인하는 함수
def get_allergy_num(material_name):
    for allergy_category, items in allergy_mapping.items():
        best_match = get_best_match(material_name, items, 0.7)
        if best_match != material_name:
            print(f"'{material_name}'이(가) '{best_match}' 항목으로 매칭되었습니다. 알레르기 카테고리: {allergy_category}")
            return allergy_code_mapping[allergy_category]  # 알레르기 공통 코드 반환
    return None  # 알레르기 코드가 없는 경우 None 반환


def get_material_id(material_name):
    # 재료 존재여부 확인하고 테이블 추가
    engine = engineconn()
    session = engine.sessionmaker()
    metadata = MetaData()

    # 기존 재료 리스트 추출 (재료 이름 리스트)
    stmt_reference = select(Materials.material_name)
    reference_materials = session.execute(stmt_reference).scalars().all()

    # 재료명 유사도 계산하여 가장 유사한 이름 반환
    best_match = get_best_match(material_name, reference_materials, 0.85)

    # 유사도가 높은 재료가 있는지 확인
    if best_match != material_name:
        print(f"'{material_name}'이(가) '{best_match}'으로 매칭되었습니다.")
        material_name = best_match  # 유사한 값으로 재료명 변경

    # 재료가 존재하는지 확인하는 쿼리
    stmt = select(Materials).where(Materials.material_name == material_name)

    # 쿼리 실행
    material = session.execute(stmt).scalars().first()

    # 재료가 존재한다면 material_id와 material_name 반환
    if material:
        return {"material_id": material.material_id, "material_name": material.material_name}
    else:
        # 재료가 없다면 가장 최근 material_id 값을 가져와 +1을 적용
        last_id_stmt = select(Materials.material_id).order_by(Materials.material_id.desc()).limit(1)
        last_id = session.execute(last_id_stmt).scalars().first()

        # 새로운 material_id 설정
        new_material_id = (last_id + 1) if last_id is not None else 1  # 마지막 id가 없을 경우 1로 시작

        # 알레르기 번호를 확인하고 새로운 재료 추가
        allergy_num = get_allergy_num(material_name)
        new_material = Materials(
            material_id=new_material_id,  # 수동으로 ID 설정
            material_name=material_name,
            material_allergy_num=allergy_num  # 알레르기 번호 추가
        )
        session.add(new_material)
        session.commit()
        print(f"'{material_name}' 재료가 추가되었습니다.")
        return {"material_id": new_material.material_id, "material_name": new_material.material_name}
