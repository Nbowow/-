import Tab from "../../components/Tab/Tab";
import ModifyUserInfoForm from "../../components/ModifyProfile/ModifyUserInfoForm/ModifyUserInfoForm";
import AllergyListForm from "../../components/ModifyProfile/AllergyListForm/AllergyListForm";
import * as S from "./ModifyProfile.styled";
import UserProfileImage from "../../components/UserProfile/UserProfileImage/UserProfileImage";
import { useUserStore } from "../../store/userStore";
import { useRef } from "react";
import useUser from "../../hooks/useUser";

const ModifyProfile = () => {
    const { isLoading } = useUser();
    const user = useUserStore((state) => state.user);
    const fileInputRef = useRef(null);

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

    const handleProfileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        // TODO: 백엔드에 사진 업로드
    };

    return (
        <S.ModifyProfile>
            <S.ProfileImageWrapper onClick={handleProfileClick}>
                <div className="overlay">프로필 사진 수정</div>
                <UserProfileImage size="180px" imageUrl={user.profileImage} />
                <S.FileInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </S.ProfileImageWrapper>
            <Tab tabs={tabs} />
        </S.ModifyProfile>
    );
};

export default ModifyProfile;
