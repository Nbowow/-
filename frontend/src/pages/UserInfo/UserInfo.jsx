import RecipeCardList from "../../components/CardList/RecipeCardList";
import UserProfile from "../../components/UserProfile/UserProfile";
import Tab from "../../components/Tab/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { useOtherUserInfo, useOtherUserRecipe } from "../../hooks/useUser";

const UserInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: member, isLoading, error } = useOtherUserInfo(id);
    const { data: recipes, isLoading: recipeIsLoading } =
        useOtherUserRecipe(id);

    if (isLoading || recipeIsLoading) return <div></div>;
    if (!member || error) {
        navigate("/user-not-found");
    }

    const buttonText = "팔로우";

    const tabs = [
        {
            label: "등록 레시피",
            content: <RecipeCardList recipes={recipes} showProfile={false} />,
        },
    ];

    const handleButtonClick = () => {
        // TODO: 팔로우/팔로잉 로직 구현
    };

    return (
        <div>
            <UserProfile
                showInfo={true}
                member={member}
                buttonText={buttonText}
                buttonOnClick={handleButtonClick()}
                isFollowButtonEnabled={false}
            />
            <Tab tabs={tabs} />
        </div>
    );
};

export default UserInfo;
