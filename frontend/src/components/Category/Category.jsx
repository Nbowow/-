import {
    CategoryItem,
    CategoryList,
    CategorySection,
    CategoryTitle,
    Container,
} from "./Category.styled";
import PropTypes from "prop-types";
import { useRecipeStore } from "./../../store/recipeStore";
import { useEffect, useState } from "react";
import { CATEGORY_TYPES, fetchCategories } from "../../api/category";

const CategoryComponent = ({
    onTypeSelect,
    onSituationSelect,
    onIngredientsSelect,
    onMethodSelect,
}) => {
    const [categories, setCategories] = useState({
        [CATEGORY_TYPES.TYPE]: [],
        [CATEGORY_TYPES.SITUATION]: [],
        [CATEGORY_TYPES.INGREDIENT]: [],
        [CATEGORY_TYPES.METHOD]: [],
    });

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

    useEffect(() => {
        const getCategories = async () => {
            const categorizedData = await fetchCategories();
            setCategories(categorizedData);
        };
        getCategories();
    }, []);

    const handleCategoryClick = (category, item) => {
        if (category === CATEGORY_TYPES.TYPE) {
            setSelectedType(item);
            onTypeSelect(item);
        } else if (category === CATEGORY_TYPES.SITUATION) {
            setSelectedSituation(item);
            onSituationSelect(item);
        } else if (category === CATEGORY_TYPES.INGREDIENT) {
            setSelectedIngredients(item);
            onIngredientsSelect(item);
        } else if (category === CATEGORY_TYPES.METHOD) {
            setSelectedMethod(item);
            onMethodSelect(item);
        }
    };
    return (
        <Container>
            {Object.entries(categories).map(([categoryKey, items]) => (
                <CategorySection key={categoryKey}>
                    <CategoryTitle>{categoryKey}</CategoryTitle>
                    <CategoryList>
                        {items.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CategoryItem
                                    selected={
                                        (categoryKey === CATEGORY_TYPES.TYPE &&
                                            selectedType === item) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.SITUATION &&
                                            selectedSituation === item) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.INGREDIENT &&
                                            selectedIngredients === item) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.METHOD &&
                                            selectedMethod === item)
                                    }
                                    onClick={() =>
                                        handleCategoryClick(categoryKey, item)
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
