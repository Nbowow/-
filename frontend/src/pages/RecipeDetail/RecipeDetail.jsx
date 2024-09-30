import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import RecipeUser from "../../components/RecipeDetail/RecipeUser/RecipeUser";
import RecipeHeader from "../../components/RecipeDetail/RecipeHeader/RecipeHeader";
import RecipeStep from "../../components/RecipeStep/RecipeStep";
import { useEffect } from "react";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import Comments from "../../components/Comment/Comments";
import Review from "../../components/Review/Review";
import * as S from "./RecipeDetail.styled";
const RecipeDetail = () => {
    const { id } = useParams();

    useEffect(() => {}, [id]);

    const reviews = [
        {
            id: 1,
            rating: 5,
            title: "맛있어용",
            content: "굿굿굿굿",
            imgUrl: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
        },
    ];

    const allergies = ["토마토", "우유"];

    const user = {
        id: 1,
        imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjJfMjUg/MDAxNjE2Mzg4ODI3MzMx.0G6S0UjP07n30LGB4ckxTy61yx06j23nvkKxD0J3cPUg.-kIS_AzileIuNGaJ7W_-eCIVIzuKC9VmErz7zoFpDNUg.JPEG.chooddingg/E4DE992B-B5DF-44F2-AA60-E7F9D00B8BEE-16837-0000081DF5EE03C2_file.jpg?type=w800",
        name: "명수옹",
        followCnt: 100,
        talk: " 명수옹의 요리조리요리조리요리조리요리조리",
    };

    const data = {
        tag: ["초스피드", "간식"],
        title: "명수의 초간단피자 만들기",
        text: "맛있는 피자를 만들어 봅시다!",
    };

    const data2 = {
        recipe: {
            minute: 30,
            difficulty: "초급",
            calories: 500,
            cost: 5000,
        },
        ingredients: [
            { name: "밀가루", amount: "200g" },
            { name: "토마토소스", amount: "100g" },
            { name: "치즈", amount: "100g" },
            { name: "피자토핑", amount: "100g" },
            { name: "버섯", amount: "50g" },
            { name: "올리브", amount: "30g" },
            { name: "파프리카", amount: "70g" },
        ],
    };

    const comment = [
        {
            imgUrl: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
            user: "명수옹",
            text: "맛있어용",
            date: "2021-07-19",
            reply: [
                {
                    imgUrl: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
                    user: "명수옹",
                    text: "맛있어용",
                    date: "2021-07-19",
                },
            ],
        },
    ];
    const step = [
        {
            img: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
            text: "밀가루, 소금, 설탕, 이스트를 넣고 섞어주세요.",
        },
        {
            img: "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
            text: "밀가루, 소금, 설탕, 이스트를 넣고 섞어주세요.",
        },
    ];

    const rating = [100, 50, 30, 1, 5];
    return (
        <>
            <Header />
            <S.Container>
                <S.InfoSection>
                    <RecipeHeader data={data} />
                    <RecipeInfo data={data2} allergies={allergies} />
                </S.InfoSection>

                <S.StepSection>
                    <RecipeStep recipe={step} />
                </S.StepSection>

                <S.UserSection>
                    <RecipeUser data={user} />
                </S.UserSection>

                <Review
                    reviews={reviews}
                    rating={rating}
                    recipe={data2.recipe}
                />
                <S.CommentSection>
                    <S.CommentTitle>댓글 {comment.length}개</S.CommentTitle>
                    <Comments comments={comment} />
                </S.CommentSection>
            </S.Container>
        </>
    );
};

export default RecipeDetail;
