import * as S from "./Review.styled";
import ReviewModalButton from "./ReviewModal/ReviewModalButton";
import ReviewOverview from "./ReviewOverview/ReviewOverview";
import ReviewRating from "./ReviewRating/ReviewRating";

import PropTypes from "prop-types";

const Review = ({ reviews, rating, recipe }) => {
    const hasReviews = reviews.length > 0;

    return (
        <S.ReviewSection>
            <S.ReviewSectionTop>
                <S.ReviewTitle>리뷰 {reviews.length}개</S.ReviewTitle>
                <ReviewModalButton reviews={reviews} recipe={recipe} />
            </S.ReviewSectionTop>
            <S.ReviewSectionBottom>
                {hasReviews ? (
                    <>
                        <ReviewRating rating={rating} />
                        {reviews.slice(0, 2).map((review, index) => (
                            <ReviewOverview key={index} review={review} />
                        ))}
                    </>
                ) : (
                    <S.NoReviewsMessage>
                        아직 등록된 리뷰가 없습니다.
                    </S.NoReviewsMessage>
                )}
            </S.ReviewSectionBottom>
        </S.ReviewSection>
    );
};
Review.propTypes = {
    reviews: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    recipe: PropTypes.object.isRequired,
};
export default Review;
