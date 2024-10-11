import {
    CategoryItem,
    CategoryList,
    CategorySection,
    CategoryTitle,
    Container,
} from "./Category.styled";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CATEGORY_TYPES, fetchCategories } from "../../api/category";

const CategoryComponent = ({
    onTypeSelect,
    onSituationSelect,
    onIngredientsSelect,
    onMethodSelect,
    selectedType = "B_0001",
    selectedSituation = "C_0001",
    selectedIngredients = "D_0001",
    selectedMethod = "E_0001",
}) => {
    const [categories, setCategories] = useState({
        [CATEGORY_TYPES.TYPE]: [],
        [CATEGORY_TYPES.SITUATION]: [],
        [CATEGORY_TYPES.INGREDIENT]: [],
        [CATEGORY_TYPES.METHOD]: [],
    });

    useEffect(() => {
        const getCategories = async () => {
            const categorizedData = await fetchCategories();
            setCategories(categorizedData);
        };
        getCategories();
    }, []);

    const handleCategoryClick = (category, item) => {
        if (category === CATEGORY_TYPES.TYPE) {
            onTypeSelect(item.num);
        } else if (category === CATEGORY_TYPES.SITUATION) {
            onSituationSelect(item.num);
        } else if (category === CATEGORY_TYPES.INGREDIENT) {
            onIngredientsSelect(item.num);
        } else if (category === CATEGORY_TYPES.METHOD) {
            onMethodSelect(item.num);
        }
    };

    const isItemSelected = (categoryKey, itemNum) => {
        switch (categoryKey) {
            case CATEGORY_TYPES.TYPE:
                return !selectedType || selectedType === "B_0001"
                    ? itemNum === "B_0001"
                    : selectedType === itemNum;
            case CATEGORY_TYPES.SITUATION:
                return !selectedSituation || selectedSituation === "C_0001"
                    ? itemNum === "C_0001"
                    : selectedSituation === itemNum;
            case CATEGORY_TYPES.INGREDIENT:
                return !selectedIngredients || selectedIngredients === "D_0001"
                    ? itemNum === "D_0001"
                    : selectedIngredients === itemNum;
            case CATEGORY_TYPES.METHOD:
                return !selectedMethod || selectedMethod === "E_0001"
                    ? itemNum === "E_0001"
                    : selectedMethod === itemNum;
            default:
                return false;
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
                                key={item.num}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CategoryItem
                                    selected={isItemSelected(
                                        categoryKey,
                                        item.num,
                                    )}
                                    onClick={() =>
                                        handleCategoryClick(categoryKey, item)
                                    }
                                >
                                    {item.name}
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
    selectedType: PropTypes.string,
    selectedSituation: PropTypes.string,
    selectedIngredients: PropTypes.string,
    selectedMethod: PropTypes.string,
};

export default CategoryComponent;
