import Tab from "../../components/Tab/Tab";
import ModifyUserInfoForm from "../../components/ModifyProfile/ModifyUserInfoForm/ModifyUserInfoForm";
import AllergyListForm from "../../components/ModifyProfile/AllergyListForm/AllergyListForm";
import * as S from "./ModifyProfile.styled";
import UserProfileImage from "../../components/UserProfile/UserProfileImage/UserProfileImage";
import { useUserStore } from "../../store/userStore";
import useUser from "../../hooks/useUser";

const ModifyProfile = () => {
    const { isLoading } = useUser();
    const user = useUserStore((state) => state.user);

    if (isLoading) return <div></div>;

    const tabs = [
        {
            label: "나의 정보 수정",
            content: <ModifyUserInfoForm user={user} />,
        },
        {
            label: "나의 알러지 정보 수정",
            content: <AllergyListForm />,
        },
    ];

    return (
        <S.ModifyProfile>
            <S.ProfileImageWrapper>
                <UserProfileImage size="180px" imageUrl={user.profileImage} />
            </S.ProfileImageWrapper>
            <Tab tabs={tabs} />
        </S.ModifyProfile>
    );
};

export default ModifyProfile;
