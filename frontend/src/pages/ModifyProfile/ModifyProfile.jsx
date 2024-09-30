import Header from "../../components/Header/Header";
import Tab from "../../components/Tab/Tab";
import UserProfile from "../../components/UserProfile/UserProfile";
import CardToggleList from "../../components/CardList/CardToggleList";

const ModifyProfile = () => {
    const tabs = [
        { label: "나의 정보 수정", content: <div>나의 정보 수정</div> },
        {
            label: "나의 알러지 정보 수정",
            content: <CardToggleList />,
        },
    ];

    return (
        <div>
            <Header />
            <UserProfile />
            <Tab tabs={tabs} />
        </div>
    );
};

export default ModifyProfile;
