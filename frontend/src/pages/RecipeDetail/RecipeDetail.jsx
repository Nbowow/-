import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RecipeUser from "../../components/RecipeDetail/RecipeUser/RecipeUser";
import RecipeHeader from "../../components/RecipeDetail/RecipeHeader/RecipeHeader";
import RecipeStep from "../../components/RecipeStep/RecipeStep";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import Comments from "../../components/Comment/Comments";
import Review from "../../components/Review/Review";
import * as S from "./RecipeDetail.styled";
import { getRecipe, getReviews } from "../../api/recipe";

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const [reviews, setReviews] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await getRecipe(id);
            setRecipe(data);
        };
        const fetchReview = async () => {
            const data = await getReviews(id);
            setReviews(data);
        };

        fetchRecipe(id);
        fetchReview(id);
    }, [id]);

    const allergies = ["토마토", "우유"];

    const rating = [100, 50, 30, 1, 5];
    return (
        recipe && (
            <S.Container>
                <S.InfoSection>
                    <RecipeHeader recipe={recipe} />
                    <RecipeInfo recipe={recipe} allergies={allergies} />
                </S.InfoSection>

                <S.StepSection>
                    <RecipeStep recipe={recipe.recipeOrders} />
                </S.StepSection>

                <S.UserSection>
                    <RecipeUser
                        user={{
                            nickname: recipe.nickname,
                            profileImage: recipe.profileImage,
                            id: recipe.userId,
                            summary: recipe.summary,
                        }}
                    />
                </S.UserSection>

                {reviews && (
                    <Review reviews={reviews} rating={rating} recipe={recipe} />
                )}

                <S.CommentSection>
                    <Comments id={id} />
                </S.CommentSection>
            </S.Container>
        )
    );
};

export default RecipeDetail;
