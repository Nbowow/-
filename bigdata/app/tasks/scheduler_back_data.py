is_running = False


def run_recipe_back_data_scheduler():
    global is_running
    if (is_running):
        print("작업이 이미 실행 중입니다. 새로운 작업을 실행하지 않습니다.")
        return

    try:
        is_running = True

        # 현재 크롤링중인 위치 체크해서 메일로 보내놓기 .env에서 받아와서 해당부분부터 시작하기










    finally:
        is_running = False
