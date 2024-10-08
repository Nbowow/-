import PropTypes from "prop-types";
import * as S from "./LikeIngredient.styled";
const IngredientLike = ({ ingredients, onClick, onLike }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.Wrapper>
            {ingredients.map((ingredient, idx) => {
                return (
                    <S.Info onClick={() => onClick(idx)} key={ingredient.id}>
                        <S.Img src={ingredient.img || placeholderImage} />
                        <S.Name>{ingredient.name}</S.Name>
                        <S.Remove onClick={() => onLike(ingredient)}>
                            삭제
                        </S.Remove>
                    </S.Info>
                );
            })}
        </S.Wrapper>
    );
};

IngredientLike.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
};

export default IngredientLike;
