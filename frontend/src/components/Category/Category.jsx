import { useState } from "react";
import {
    CategoryItem,
    CategoryList,
    CategorySection,
    CategoryTitle,
    Container,
} from "./Category.styld";
import { PropTypes } from "prop-types";

const categories = {
    종류: [
        "전체",
        "디저트",
        "밑반찬",
        "메인반찬",
        "국/탕",
        "찌개",
        "면/만두",
        "김치",
        "양념",
        "양식",
    ],
    상황: [
        "전체",
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
        "전체",
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
        "전체",
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

const CategoryComponent = ({
    onTypeSelect,
    onSituationSelect,
    onIngredientsSelect,
    onMethodSelect,
}) => {
    const [selectedCategories, setSelectedCategories] = useState({
        종류: "전체",
        상황: "전체",
        재료: "전체",
        방법: "전체",
    });

    const handleCategoryClick = (category, item) => {
        const newSelectedCategories = {
            ...selectedCategories,
            [category]: item,
        };
        setSelectedCategories(newSelectedCategories);

        // 부모 컴포넌트에 선택된 값 전달
        if (category === "종류") onTypeSelect(item);
        else if (category === "상황") onSituationSelect(item);
        else if (category === "재료") onIngredientsSelect(item);
        else if (category === "방법") onMethodSelect(item);
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
                                    selected={
                                        selectedCategories[title] === item
                                    }
                                    onClick={() =>
                                        handleCategoryClick(title, item)
                                    }
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
        </Container>
    );
};

CategoryComponent.propTypes = {
    onTypeSelect: PropTypes.func.isRequired,
    onSituationSelect: PropTypes.func.isRequired,
    onIngredientsSelect: PropTypes.func.isRequired,
    onMethodSelect: PropTypes.func.isRequired,
};

export default CategoryComponent;
