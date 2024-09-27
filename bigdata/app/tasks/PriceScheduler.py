import os
from datetime import datetime, timedelta

import requests
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

# 환경 변수 읽기
cert_key = os.getenv('CERT_KEY')
cert_id = os.getenv('CERT_ID')
api_url = os.getenv('API_URL')

# 소매우선, 그 후 도매
p_cls_code = ["01", "02"]
p_category_code = {'식량작물': '100', '채소류': '200', '특용작물': '300', '과일류': '400', '축산물': '500', '수산물': '600'}
p_categgoty_item_name = {
    '100': {
        "쌀", "찹쌀", "콩", "팥", "녹두", "메밀", "고구마", "감자"
    },
    '200': {
        "양배추", "시금치", {"상추", {"적=상추&적상추", "청=청상추"}}, {"배추", "배추&고랭지"}, "수박", "얼갈이배추",
        {"오이", {"가시=오이&가시오이", "다다기=다다기오이", "취청=취청오이"}}, {"호박", {"애호박", "쥬키니"}},
        "토마토", "무", "당근", "열무", "건고추", "참외", "고춧가루", "브로콜리",
        {"풋고추", {"풋고추=고추", "풋고추", "꽈리고추", "청양고추", "오이맛고추=오이고추"}},
        "붉은고추", {"피마늘", {"난지=마늘"}}, "양파", {"파", {"대파", "쪽파"}}, "생강", "미나리", "깻잎", "피망",
        "파프리카", "멜론", "깐마늘=마늘", "알배기배추", {"방울토마토", {"방울토마토", "대추방울토마토"}}
    },
    '300': {
        "참깨", "들깨", "땅콩", {"느타리버섯", {"느타리버섯", "애느타리버섯"}}, "팽이버섯", "새송이버섯", "호두", "아몬드"
    },
    '400': {
        "사과", "배", "복숭아", {"포도", {"캠벨얼리", "거봉", "MBA=머루포도", "샤인머스켓"}}, "감귤=귤", "바나나", "참다래=키위",
        "파인애플", "오렌지", "레몬", "망고", "체리", "아보카도"
    },
    '500': {
        {"소", {"안심=소_안심", "등심=소_등심", "설도", "양지=소_양지", "갈비=소_갈비"}},
        {"돼지", {"앞다리=돼지_앞다리살", "삼겹살=돼지_삼겹살", "갈비=돼지_갈비", "목심=돼지_목심"}},
        "닭", "계란", "우유"
    },
    '600': {
        "고등어", "꽁치", "갈치", "명태", "물오징어=오징어", "건멸치=멸치&건멸치", "북어=황태&북어",
        "건오징어=건오징어&마른오징어", {"김", {"마른김=김&마른김", "구운김"}}, "건미역=미역", "새우젓", "멸치액젓",
        "굵은소금", "전복", "새우", "홍합", "건다시마=다시마&건다시마", {"조기", {"참조기=조기&참조기", "굴비"}}
    }
}


# kg, 개, 구, 마리, 속, 포기


async def price_back_data_api_scheduler(get_start_date):
    start_date = datetime.strptime(get_start_date, "%Y-%m-%d")
    now_date = datetime.now()

    while start_date <= now_date:

        for cls_code in p_cls_code:

            for category_code in p_categgoty_item_name.keys():
                url = api_url

                # 파라미터 설정
                params = {
                    "action": "dailyPriceByCategoryList",  # API 액션
                    "p_product_cls_code": cls_code,  # 상품 구분 코드
                    "p_country_code": "1101",  # 국가 코드
                    "p_regday": start_date.strftime("%Y-%m-%d"),  # 조회 날짜
                    "p_convert_kg_yn": "Y",  # kg 단위 변환 여부
                    "p_item_category_code": category_code,  # 품목 대분류 코드
                    "p_cert_key": cert_key,  # 인증 키
                    "p_cert_id": cert_id,  # 인증 ID
                    "p_returntype": "json",  # 반환 형식 (XML)
                }

                # API 요청 보내기
                response = requests.get(url, params=params)

                # 응답 상태 코드 확인
                if response.status_code == 200:

                    data = response.json()

                    # if data["data"][errorcode] == "000":
                    #     items = data["data"]["item"]

                    print(
                        f"{start_date.strftime('%Y-%m-%d')} - 상품 구분 코드: {cls_code} - 카테고리 코드: {category_code} - API 요청 성공!")


                else:
                    print(
                        f"API 요청 실패. 상태 코드: {response.status_code} - 날짜: {start_date.strftime('%Y-%m-%d')}, 상품 구분 코드: {cls_code}, 카테고리 코드: {category_code}")

                # 날짜를 하루씩 증가시킴
            start_date += timedelta(days=1)
