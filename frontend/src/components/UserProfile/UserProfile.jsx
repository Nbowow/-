import * as S from "./UserProfile.styled";
import UserProfileImage from "./UserProfileImage/UserProfileImage";
import Button from "../Button/Button";
import PropTypes from "prop-types";

const UserProfile = ({ userId, profileImgUrl, UserProfileStat }) => {
    const buttonText = "정보 수정";

    return (
        <S.UserProfile>
            <S.ProfileImage>
                <UserProfileImage imageUrl={profileImgUrl} size="180px" />
            </S.ProfileImage>
            <S.UserStat>
                <S.TextWrapper>
                    <div className="nickname">흑종원</div>
                    <div className="discription">조보아씨 일로 내려와봐유</div>
                </S.TextWrapper>
                <Button
                    text={buttonText}
                    width="80px"
                    height="32px"
                    type="small"
                />
            </S.UserStat>
        </S.UserProfile>
    );
};

UserProfile.propTypes = {
    userId: PropTypes.string,
    profileImgUrl: PropTypes.string,
    UserProfileStat: PropTypes.node,
};

export default UserProfile;
