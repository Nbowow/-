import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HotIngredient from "./HotIngredient";
import * as S from "./HotIngredient.styled";
import { getIngredientPopularWeekly } from "../../../api/ingredientApi";
import Title from "../../Title/Title";

const HotWeekIngredients = ({ onLike, like }) => {
    const [hotWeekIngredients, setHotWeekIngredients] = useState([]);

    useEffect(() => {
        const fetchHotWeekIngredients = async () => {
            const result = await getIngredientPopularWeekly();
            setHotWeekIngredients(result);
        };

        fetchHotWeekIngredients();
    }, []);

    return (
        <S.Hot>
            <Title title={"월간 인기 재료"} />
            {hotWeekIngredients.map((ingredient) => (
                <HotIngredient
                    onLike={() => onLike(ingredient)}
                    key={ingredient.id}
                    like={like.find((i) => i.id === ingredient.id)}
                    ingredient={ingredient}
                />
            ))}
        </S.Hot>
    );
};

HotWeekIngredients.propTypes = {
    onLike: PropTypes.func,
    like: PropTypes.array,
};

export default HotWeekIngredients;
