import Tab from "../../components/Tab/Tab";
import UserProfile from "../../components/UserProfile/UserProfile";
import ModifyUserInfoForm from "../../components/ModifyProfile/ModifyUserInfoForm/ModifyUserInfoForm";
import AllergyListForm from "../../components/ModifyProfile/AllergyListForm/AllergyListForm";
import Footer from "../../components/Footer/Footer";
import * as S from "./ModifyProfile.styled";

const ModifyProfile = () => {
    const tabs = [
        { label: "나의 정보 수정", content: <ModifyUserInfoForm /> },
        {
            label: "나의 알러지 정보 수정",
            content: <AllergyListForm />,
        },
    ];

    return (
        <S.ModifyProfile>
            <UserProfile />
            <Tab tabs={tabs} />
            <Footer />
        </S.ModifyProfile>
    );
};

export default ModifyProfile;
