from datetime import date

from pydantic import BaseModel


# 일별 부류별 도.소매가격정보
class PriceBackAPIDto(BaseModel):
    p_item_category_code: str
    p_item_code: str
    p_kind_code: str
    p_product_rank_code: str
    p_item_name: str

    @classmethod
    def create_dto(cls, *args):
        return cls(
            p_item_category_code=args[0],
            p_item_code=args[1],
            p_kind_code=args[2],
            p_product_rank_code=args[3],
            p_item_name=args[4]
        )
