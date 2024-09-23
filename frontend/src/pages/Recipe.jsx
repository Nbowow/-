import Category from "../components/Category/Category";
import CategoryIcon from "../components/Category/CategoryIcon";

// This is the Recipe page
// It contains the CategoryIcon and Category components
// The CategoryIcon component displays the icons for different categories
// The Category component displays the recipes for each category
const Recipe = () => {
    return (
        <div>
            <h1>Recipe</h1>
            <CategoryIcon />
            <Category />
        </div>
    );
};

export default Recipe;
