from fastapi import APIRouter, HTTPException, BackgroundTasks

from app.globals import get_recipe_back_crawling_status, set_recipe_back_crawling_status, \
    get_price_back_crawling_status, set_price_back_crawling_status
from app.model.request.PriceBackAPIDto import PriceBackAPIDto
from app.model.request.RecipeBackCrawlingDto import RecipeBackCrawlingDto
from app.tasks.RecipeScheduler import recipe_back_data_crawling_scheduler
from fastapi import APIRouter, HTTPException, BackgroundTasks

from app.globals import get_recipe_back_crawling_status, set_recipe_back_crawling_status, \
    get_price_back_crawling_status, set_price_back_crawling_status
from app.model.request.PriceBackAPIDto import PriceBackAPIDto
from app.model.request.RecipeBackCrawlingDto import RecipeBackCrawlingDto
from app.tasks.RecipeScheduler import recipe_back_data_crawling_scheduler

router = APIRouter(
    prefix="/crawling",
    tags=["Crawling"]
)


# recipe 백데이터 쌓는 api
@router.post("/recipe/back-data")
def start_recipe_back_crawling(data: RecipeBackCrawlingDto, background_tasks: BackgroundTasks):
    if get_recipe_back_crawling_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_recipe_back_crawling_status(True)

    background_tasks.add_task(
        recipe_back_data_crawling_scheduler,
        data.now_type,
        data.now_situation,
        data.now_ingredient,
        data.now_method,
        data.now_page,
        data.recipe_idx)

    # 클라이언트에게 즉시 응답 반환
    return {"message": "작업이 백그라운드에서 시작되었습니다."}


@router.post("/price/back-data")
def start_price_back_crawling(data: PriceBackAPIDto, background_tasks: BackgroundTasks):
    if get_price_back_crawling_status():
        raise HTTPException(status_code=429, detail="이미 작업이 진행 중입니다. 작업이 완료된 후 다시 시도하세요.")

    set_price_back_crawling_status(True)

    background_tasks.add_task()

# 저장된 데이터 local에 다운받는 api

# 저장된 데이터를 hdfs에 저장하는 api
