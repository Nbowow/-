import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileStat from "../../components/UserProfile/UserProfileStat/UserProfileStat";

const test = {
    profileImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC3mWTEKRD3X8xKRx2mx9RGBWk072IZFdJIg&s",
    profileStat: (
        <UserProfileStat nickName={"흑종원"} discription={"설탕 안먹어유"} />
    ),
};

const MyPage = () => {
    return (
        <div>
            <Header />
            <UserProfile
                profileImgUrl={test.profileImgUrl}
                UserProfileStat={test.profileStat}
            />
        </div>
    );
};

export default MyPage;
