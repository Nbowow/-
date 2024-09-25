import PropTypes from "prop-types";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import { Rating } from "react-simple-star-rating";
import * as S from "./ReviewDetail.styled";
const ReviewDetail = ({ review, recipe }) => {
    return (
        <S.Wrapper>
            <S.FlexLayout>
                <UserProfileImage imageUrl={recipe.imgUrl} size={"2.5em"} />
                <S.FlexInside>
                    <S.RecipeName>{recipe.name}</S.RecipeName>
                    <S.FlexCenter>
                        <Rating
                            initialValue={1}
                            readonly
                            iconsCount={1}
                            size={25}
                        />
                        <S.RecipeTotalRating>
                            {recipe.totalRating}
                        </S.RecipeTotalRating>
                    </S.FlexCenter>
                </S.FlexInside>
            </S.FlexLayout>

            <S.ReviewImg src={review.imgUrl} alt="리뷰 이미지" />
            <S.FlexLayout>
                <UserProfileImage
                    imageUrl={review.author.imgUrl}
                    size={"2rem"}
                />
                <S.FlexInside>
                    <S.UserName>{review.author.name}</S.UserName>
                    <S.FlexBetween>
                        <Rating
                            initialValue={4.3}
                            readonly
                            allowFraction
                            size={17}
                        />
                        <S.ReviewDate>{review.createdAt}</S.ReviewDate>
                    </S.FlexBetween>
                </S.FlexInside>
            </S.FlexLayout>

            <S.ReviewWrapper>
                <S.ReviewTitle>{review.title}</S.ReviewTitle>
                <S.ReviewContent>{review.content}</S.ReviewContent>
            </S.ReviewWrapper>
        </S.Wrapper>
    );
};

ReviewDetail.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            imgUrl: PropTypes.string,
        }).isRequired,
    }).isRequired,
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        totalRating: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};
export default ReviewDetail;
