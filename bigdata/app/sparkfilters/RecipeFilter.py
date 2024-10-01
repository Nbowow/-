import socket

import pandas as pd
from hdfs import InsecureClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import regexp_replace, col

from app.database.database import engineconn

# HDFS 클라이언트 설정 (HDFS NameNode 주소로 접속)
hdfs_client = InsecureClient('http://master:9870', user='root')
hdfs_directory = "/user/root/recipe/"

hostname = socket.gethostname()
ip_address = socket.gethostbyname(hostname)

# Spark 세션 생성
spark = SparkSession.builder \
    .appName("RecipeDataProcessing") \
    .master("spark://master:7077") \
    .config("spark.driver.host", ip_address) \
    .config("spark.jars", "/path/to/mysql-connector-java.jar") \
    .getOrCreate()


# HDFS 파일을 읽고 Spark DataFrame으로 처리하여 정제하는 함수
def process_recipe_data(file_path):
    # HDFS에서 CSV 파일 읽기
    df = spark.read.csv(file_path, header=True, inferSchema=True)

    # 조회수 데이터에서 콤마를 제거하고 정수형으로 변환
    df = df.withColumn("조회수", regexp_replace(col("조회수"), ",", "").cast("int"))

    # 조리시간과 인분 데이터를 정수형으로 변환
    df = df.withColumn("조리시간", col("조리시간").cast("int")) \
        .withColumn("인분", col("인분").cast("int"))

    # 필요한 컬럼만 선택하고 이름 변경
    selected_columns = df.select(
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

    return selected_columns


# MySQL에 데이터를 업로드하기 전에 중복 여부를 확인하는 함수
def upload_data_to_mysql(df):
    engine = engineconn()
    session = engine.sessionmaker()

    # Spark DataFrame을 Pandas로 변환
    pandas_df = df.toPandas()

    # MySQL에서 이미 저장된 recipe_id 목록 가져오기
    with engine.connect() as conn:
        existing_ids = pd.read_sql("SELECT recipe_id FROM Recipes", conn)

    # 중복을 피하기 위해 새로 추가된 레시피의 recipe_id와 기존 recipe_id 비교
    if "recipe_id" in pandas_df.columns:
        pandas_df = pandas_df[~pandas_df['recipe_id'].isin(existing_ids['recipe_id'])]

    # 중복된 데이터는 제외하고 새 데이터를 MySQL 테이블에 삽입
    if not pandas_df.empty:
        pandas_df.to_sql(name="Recipes", con=engine, if_exists="append", index=False)
    else:
        print("No new data to upload. All records already exist in MySQL.")


# HDFS에서 파일 목록을 읽고 처리하는 메인 함수
def upload_recipe_file_to_mysql():
    file_statuses = hdfs_client.list(hdfs_directory)

    for file_name in file_statuses:
        file_path = f"hdfs://master:9870{hdfs_directory}{file_name}"

        # 파일 경로를 이용해 데이터를 정제
        processed_data = process_recipe_data(file_path)

        # 정제된 데이터를 MySQL에 업로드 (중복 제거 후)
        upload_data_to_mysql(processed_data)

        print(f"Uploaded data from {file_name} to MySQL")

    return {"message": "All files processed and uploaded to MySQL"}


upload_recipe_file_to_mysql()
