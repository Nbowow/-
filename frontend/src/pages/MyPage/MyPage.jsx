import * as S from "./MyPage.styled";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileLevel from "../../components/UserProfile/UserProfileLevel/UserProfileLevel";
import Tab from "../../components/Tab/Tab";
import RecipeCardList from "../../components/CardList/RecipeCardList";
import useUser, {
    useUserLikes,
    useUserReceipe,
    useUserScraps,
} from "../../hooks/useUser";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const { isLoading: isUserLoading } = useUser();
    const { isLoading: isRecipeLoading } = useUserReceipe();

    const { data: likes } = useUserLikes();
    const { data: scraps } = useUserScraps();

    const user = useUserStore((state) => state.user);
    const recipes = useUserStore((state) => state.recipes);

    if (isUserLoading || isRecipeLoading) return <div></div>;

    const tabs = [
        {
            label: "나의 레시피",
            content: <RecipeCardList recipes={recipes} showProfile={false} />,
        },
        {
            label: "스크랩 레시피",
            content: <RecipeCardList recipes={scraps} showProfile={true} />,
        },
        {
            label: "좋아요한 레시피",
            content: <RecipeCardList recipes={likes} showProfile={true} />,
        },
    ];

    return (
        <S.MyPage>
            <div>
                <UserProfile
                    showInfo={true}
                    member={user}
                    buttonText={"정보 수정"}
                    buttonOnClick={() => navigate("/modify")}
                    isFollowButtonEnabled={true}
                />
                <UserProfileLevel score={user.score} />
            </div>
            <Tab tabs={tabs} />
        </S.MyPage>
    );
};

export default MyPage;
