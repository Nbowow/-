# 전역 변수와 잠금 객체
is_recipe_back_crawling_in_progress = False


def get_recipe_back_crawling_status():
    """현재 크롤링 상태를 반환"""
    return is_recipe_back_crawling_in_progress


def set_recipe_back_crawling_status(status: bool):
    """크롤링 상태를 설정"""
    global is_recipe_back_crawling_in_progress
    is_recipe_back_crawling_in_progress = status
