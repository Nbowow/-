import os

from hdfs import InsecureClient

# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')


async def upload_recipe_file_to_hdfs():
    # 업로드 할 파일 경로
    # local_directory = "../data/recipe/"
    local_directory = "/app/data/recipe/"

    # 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기
    csv_files = [f for f in os.listdir(local_directory) if f.endswith('.csv')]

    print(f"1. 로컬 디렉토리 내 모든 .csv 파일 목록 가져오기")

    # HDFS 업로드 경로 (파일을 저장할 디렉토리)
    hdfs_directory = "/user/root/recipe/"

    # HDFS 디렉토리가 없으면 생성
    if not hdfs_client.status(hdfs_directory, strict=False):
        hdfs_client.makedirs(hdfs_directory)

    print(f"2. HDFS 디렉토리가 없으면 생성")

    hdfs_file_path = ""

    for file_name in csv_files:
        local_file_path = os.path.join(local_directory, file_name)
        hdfs_file_path = os.path.join(hdfs_directory, file_name)

        # HDFS에 해당 파일이 이미 존재하는지 확인
        if not hdfs_client.status(hdfs_file_path, strict=False):
            # 파일이 존재하지 않으면 업로드
            with open(local_file_path, 'rb') as local_file:
                hdfs_client.write(hdfs_file_path, local_file)
                print(f"Uploaded: {file_name}")
        else:
            print(f"Skipped (already exists): {file_name}")

    return {"message": f"Recipe Back File uploaded to {hdfs_file_path} in HDFS!"}
