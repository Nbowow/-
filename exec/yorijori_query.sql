select count(*) from recipes;

select * from dayprice where material_id=61 order by day_price_day desc;

select * from materials;

select * from dayprice order by day_price_day desc;


# 칼로리 업데이트 로직
UPDATE recipes r
JOIN recipenutrient rn ON r.recipe_name LIKE CONCAT('%', rn.name, '%')
SET r.recipe_kcal = rn.kcal
WHERE r.recipe_kcal IS NULL OR r.recipe_kcal = 0;

# recipe_id로 recipes와 recipematerials에 아이디는 존재하는데 recipeorders에  recipe_id의 데이터가 없는경우 해당 id데이터가 있는 데이터를 recipes와 recipeorders에서 삭제
# recipeorders에 존재하지 않는 recipe_id 조회
SELECT r.recipe_id
FROM recipes r 
LEFT JOIN recipeorders ro ON r.recipe_id = ro.recipe_id 
WHERE ro.recipe_id IS NULL;

SET FOREIGN_KEY_CHECKS = 0;
-- 1. recipeorders에 없는 recipe_id를 찾고 삭제
-- 임시 테이블로 recipe_id 목록을 먼저 가져오기
DELETE FROM recipes 
WHERE recipe_id IN (
    SELECT recipe_id FROM (
        SELECT r.recipe_id 
        FROM recipes r 
        LEFT JOIN recipeorders ro ON r.recipe_id = ro.recipe_id 
        WHERE ro.recipe_id IS NULL
    ) AS temp
);
SET FOREIGN_KEY_CHECKS = 1;

-- 2. recipematerials에서도 같은 recipe_id로 데이터 삭제
DELETE FROM recipematerials 
WHERE recipe_id IN (
    SELECT r.recipe_id 
    FROM recipes r 
    LEFT JOIN recipeorders ro ON r.recipe_id = ro.recipe_id 
    WHERE ro.recipe_id IS NULL
);

# 칼로리 업데이트
UPDATE recipes r
JOIN recipenutrient rn ON r.recipe_name LIKE CONCAT('%', rn.name, '%')
SET r.recipe_kcal = rn.kcal
WHERE (r.recipe_kcal IS NULL OR r.recipe_kcal = 0)
AND r.recipe_id BETWEEN 250000 AND 300000;

# 도구
CREATE TABLE dogu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_order_content VARCHAR(255)
);

INSERT INTO dogu (recipe_order_content)
VALUES 
('칼'),
('랩'),
('조리용나이프'),
('도마'),
('볼'),
('믹싱볼'),
('유리볼'),
('소스볼'),
('계량컵'),
('찬기'),
('프라이팬'),
('채반'),
('스푼'),
('에어프라이기'),
('집게'),
('장갑'),
('저울'),
('접시'),
('주걱'),
('냄비'),
('볶음팬'),
('국자'),
('대접'),
('요리젓가락'),
('조리용젓가락'),
('젓가락'),
('면기'),
('숟가락'),
('내열접시'),
('전자레인지');

SELECT *
FROM recipeorders
WHERE recipe_order_content LIKE '%요리용';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '요리용' FROM TRIM(TRAILING ' , 요리용' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%요리용';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '소스볼' FROM TRIM(TRAILING ' , 소스볼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%소스볼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '믹싱볼' FROM TRIM(TRAILING ' , 믹싱볼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%믹싱볼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리용나이프' FROM TRIM(TRAILING ' , 조리용나이프' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리용나이프';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '볼' FROM TRIM(TRAILING ' , 볼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%볼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '계량컵' FROM TRIM(TRAILING ' , 계량컵' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%계량컵';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리용나이프' FROM TRIM(TRAILING ' , 조리용나이프' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리용나이프';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '랩' FROM TRIM(TRAILING ' , 랩' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%랩';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '칼' FROM TRIM(TRAILING ' , 칼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%칼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '도마' FROM TRIM(TRAILING ' , 도마' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%도마';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '찬기' FROM TRIM(TRAILING ' , 찬기' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%찬기';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '프라이팬' FROM TRIM(TRAILING ' , 프라이팬' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%프라이팬';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '채반' FROM TRIM(TRAILING ' , 채반' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%채반';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리용스푼' FROM TRIM(TRAILING ' , 조리용스푼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리용스푼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '나무스푼' FROM TRIM(TRAILING ' , 나무스푼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%나무스푼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '요리스푼' FROM TRIM(TRAILING ' , 요리스푼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%요리스푼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '계량스푼' FROM TRIM(TRAILING ' , 계량스푼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%계량스푼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '스푼' FROM TRIM(TRAILING ' , 스푼' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%스푼';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '에어프라이기' FROM TRIM(TRAILING ' , 에어프라이기' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%에어프라이기';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '요리집게' FROM TRIM(TRAILING ' , 요리집게' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%요리집게';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '뒤집게' FROM TRIM(TRAILING ' , 뒤집게' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%뒤집게';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리용집게' FROM TRIM(TRAILING ' , 조리용집게' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리용집게';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '집게' FROM TRIM(TRAILING ' , 집게' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%집게';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '대접' FROM TRIM(TRAILING ' , 대접' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%대접';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '국자' FROM TRIM(TRAILING ' , 국자' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%국자';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '요리젓가락' FROM TRIM(TRAILING ' , 요리젓가락' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%요리젓가락';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리용젓가락' FROM TRIM(TRAILING ' , 조리용젓가락' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리용젓가락';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '젓가락' FROM TRIM(TRAILING ' , 젓가락' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%젓가락';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '전자레인지' FROM TRIM(TRAILING ' , 전자레인지' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%전자레인지';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '내열용기' FROM TRIM(TRAILING ' , 내열용기' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%내열용기';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '냄비' FROM TRIM(TRAILING ' , 냄비' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%냄비';

UPDATE recipeorders
SET recipe_order_content = TRIM(TRAILING '조리주걱' FROM TRIM(TRAILING ' , 조리주걱' FROM recipe_order_content))
WHERE recipe_order_content LIKE '%조리주걱';





select * from recipeorders where recipe_order_id=91;





