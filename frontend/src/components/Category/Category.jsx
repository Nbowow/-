import {
    CategoryItem,
    CategoryList,
    CategorySection,
    CategoryTitle,
    Container,
} from "./Category.styled";
import PropTypes from "prop-types";
import { useRecipeStore } from "./../../store/recipeStore";

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
    const {
        selectedType,
        selectedSituation,
        selectedIngredients,
        selectedMethod,
        setSelectedType,
        setSelectedSituation,
        setSelectedIngredients,
        setSelectedMethod,
    } = useRecipeStore((state) => ({
        selectedType: state.selectedType,
        selectedSituation: state.selectedSituation,
        selectedIngredients: state.selectedIngredients,
        selectedMethod: state.selectedMethod,
        setSelectedType: state.setSelectedType,
        setSelectedSituation: state.setSelectedSituation,
        setSelectedIngredients: state.setSelectedIngredients,
        setSelectedMethod: state.setSelectedMethod,
    }));

    const handleCategoryClick = (category, item) => {
        if (category === "종류") {
            setSelectedType(item);
            onTypeSelect(item);
        } else if (category === "상황") {
            setSelectedSituation(item);
            onSituationSelect(item);
        } else if (category === "재료") {
            setSelectedIngredients(item);
            onIngredientsSelect(item);
        } else if (category === "방법") {
            setSelectedMethod(item);
            onMethodSelect(item);
        }
    };

    return (
        <Container>
            {Object.entries(categories).map(([title, items]) => (
                <CategorySection key={title}>
                    <CategoryTitle>{title}</CategoryTitle>
                    <CategoryList>
                        {items.map((item, index) => (
                            <div
                                key={`${item}-${index}`} // 고유한 key 사용
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CategoryItem
                                    selected={
                                        (title === "종류" &&
                                            selectedType === item) ||
                                        (title === "상황" &&
                                            selectedSituation === item) ||
                                        (title === "재료" &&
                                            selectedIngredients === item) ||
                                        (title === "방법" &&
                                            selectedMethod === item)
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
