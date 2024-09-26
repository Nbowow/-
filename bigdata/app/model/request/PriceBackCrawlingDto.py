from datetime import date

from pydantic import BaseModel


# 일별 부류별 도.소매가격정보
class PriceBackCrawlingDto(BaseModel):
    now_item_category_code: int
    now_check_day: date
