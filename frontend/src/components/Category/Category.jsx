import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 1440px;
`;

const CategorySection = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 10px 0;
`;

const CategoryTitle = styled.h3`
    font-size: 1.5em;
    text-align: center;
    background-color: #4cac67;
    padding: 20px;
    color: white;
`;

const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const CategoryItem = styled.div`
    /* background-color: ${(props) =>
        props.selected ? "#4caf50" : "#e0f7fa"}; // 선택된 경우 색상 변경 */
    border-radius: 10px;
    padding: 20px;
    margin: 5px;
    text-align: center;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
    cursor: pointer;
    font-weight: ${(props) => (props.selected ? "bold" : null)};
    /* &:hover {
    background-color: #b2ebf2; // 호버 효과
  } */
`;

const categories = {
    종류: [
        "디저트",
        "밀반찬",
        "메인반찬",
        "국/탕",
        "찌개",
        "면/만두",
        "김치",
        "양념",
        "양식",
    ],
    상황: [
        "다이어트",
        "일상",
        "초스피드",
        "손님접대",
        "술안주",
        "도시락",
        "영양식",
        "간식",
        "야식",
        "푸드스타일",
    ],
    재료: [
        "채소류",
        "소고기",
        "돼지고기",
        "육류",
        "해물류",
        "달걀",
        "가공식품",
        "쌀",
        "밀가루",
        "건어물",
    ],
    방법: [
        "볶음",
        "굽기",
        "부침",
        "조림",
        "무침",
        "비빔",
        "찜",
        "절임",
        "튀김",
        "삶기",
    ],
};

const CategoryComponent = () => {
    const [selectionCategory, setSelectionCategory] = useState(null);

    const handleCategoryClick = (item) => {
        setSelectionCategory(item);
    };

    return (
        <Container>
            {Object.entries(categories).map(([title, items]) => (
                <CategorySection key={title}>
                    <CategoryTitle>{title}</CategoryTitle>
                    <CategoryList>
                        {items.map((item, index) => (
                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CategoryItem
                                    selected={selectionCategory === item} // 선택된 카테고리인지 확인
                                    onClick={() => handleCategoryClick(item)}
                                >
                                    {item}
                                </CategoryItem>
                                {index < items.length - 1 && (
                                    <span style={{ margin: "0 5px" }}>|</span>
                                )}
                            </div>
                        ))}
                    </CategoryList>
                </CategorySection>
            ))}
            {selectionCategory && (
                <h4>선택된 카테고리: {selectionCategory}</h4> // 선택된 카테고리 출력
            )}
        </Container>
    );
};

export default CategoryComponent;
