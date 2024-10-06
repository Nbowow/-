import styled from "styled-components";

// Dummy data representing categories fetched from a database
const categories = [
    {
        type: "종류",
        items: [
            "디저트",
            "밑반찬",
            "메인반찬",
            "국/탕",
            "찌개",
            "면/만두",
            "밥/죽/떡",
            "김치",
            "양념",
            "양식",
        ],
    },
    {
        type: "상황",
        items: [
            "다이어트",
            "일상",
            "초스피드",
            "손님접대",
            "술안주",
            "도시락",
            "영양식",
            "간식",
            "야식",
            "해장",
        ],
    },
    {
        type: "재료",
        items: [
            "채소류",
            "소고기",
            "닭고기",
            "육류",
            "해물류",
            "달걀",
            "가공식품",
            "쌀",
            "밀가루",
            "버섯",
        ],
    },
    {
        type: "방법",
        items: [
            "볶음",
            "끓이기",
            "부침",
            "조림",
            "무침",
            "비빔",
            "찜",
            "절임",
            "튀김",
            "구이",
        ],
    },
];

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const CategoryGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const CategoryTitle = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c2c2c;
`;

const CategoryItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const CategoryItem = styled.div`
    background-color: #f1f1f1;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;

const CategoryComponent = () => {
    return (
        <Container>
            {categories.map((category) => (
                <CategoryGroup key={category.type}>
                    <CategoryTitle>{category.type}</CategoryTitle>
                    <CategoryItems>
                        {category.items.map((item) => (
                            <CategoryItem key={item}>{item}</CategoryItem>
                        ))}
                    </CategoryItems>
                </CategoryGroup>
            ))}
        </Container>
    );
};

export default CategoryComponent;
