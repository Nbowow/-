import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRelatedRecipe } from "../../../api/ingredientApi";
import IntroCard from "../../Card/IntroCard/IntroCard";

export const RelatedRecipe = ({ like }) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            const result = like.map(({ id, name }) => ({ id, name }));
            const data = await getRelatedRecipe(result);
            setRecipes(data);
        };
        fetchRecipes();
    }, [like]);
    return (
        <>
            {recipes.length > 0 &&
                recipes.map((recipe) => (
                    <IntroCard
                        key={recipe.id}
                        text={recipe.info}
                        title={recipe.title}
                        imgUrl={recipe.image}
                    />
                ))}
        </>
    );
};

RelatedRecipe.propTypes = {
    like: PropTypes.array.isRequired,
};
export default RelatedRecipe;
