import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeCard.styled";
import PropTypes from "prop-types";

const RecipeCard = ({ recipe, showProfile }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.RecipeCard>
            <S.Thumnail
                src={recipe.image || placeholderImage}
                onError={(e) =>
                    (e.target.src = e.target.src = placeholderImage)
                }
            />
            <S.TextArea>
                <ActionToggleGroup />
                <S.Title>{recipe.title}</S.Title>
                <S.Text>{recipe.info}</S.Text>
            </S.TextArea>
            {showProfile ? (
                <S.Profile>
                    <UserProfileImage
                        imageUrl={recipe.profileImage}
                        size="1.838rem"
                    />
                    {recipe.nickname}
                </S.Profile>
            ) : null}
        </S.RecipeCard>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        info: PropTypes.string,
        profileImage: PropTypes.string,
        nickname: PropTypes.string,
    }).isRequired,
    showProfile: PropTypes.bool.isRequired,
};

export default RecipeCard;
