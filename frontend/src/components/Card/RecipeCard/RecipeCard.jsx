import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";
import * as S from "./RecipeCard.styled";
import PropTypes from "prop-types";

const RecipeCard = ({
    recipeId,
    imgUrl,
    title,
    text,
    showProfile,
    profileImgUrl,
    author,
}) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.RecipeCard>
            <S.Thumnail
                src={imgUrl || placeholderImage}
                onError={(e) =>
                    (e.target.src = e.target.src = placeholderImage)
                }
            />
            <S.TextArea>
                <ActionToggleGroup />
                <S.Title>{title}</S.Title>
                <S.Text>{text}</S.Text>
            </S.TextArea>
            {showProfile ? (
                <S.Profile>
                    <S.Image src={profileImgUrl} />
                    {author}
                </S.Profile>
            ) : null}
        </S.RecipeCard>
    );
};

RecipeCard.propTypes = {
    recipeId: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    showProfile: PropTypes.bool.isRequired,
    profileImgUrl: PropTypes.string,
    author: PropTypes.string,
};

export default RecipeCard;
