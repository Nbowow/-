import * as S from "./UserProfile.styled";
import UserProfileImage from "./UserProfileImage/UserProfileImage";
import PropTypes from "prop-types";
import CookingLevel from "./UserProfileLevel/UserProfileLevel";

const UserProfile = ({
    userId,
    profileImgUrl,
    backgroundImgUrl,
    UserProfileStat,
}) => {
    return (
        <div>
            <S.BackgroundImage $backgroundImgUrl={backgroundImgUrl} />
            <S.ProfileContainer>
                <S.ProfileImage>
                    <UserProfileImage imageUrl={profileImgUrl} size="240px" />
                </S.ProfileImage>
                {UserProfileStat}
            </S.ProfileContainer>
            <CookingLevel />
        </div>
    );
};

UserProfile.propTypes = {
    userId: PropTypes.string,
    profileImgUrl: PropTypes.string,
    backgroundImgUrl: PropTypes.string,
    UserProfileStat: PropTypes.node,
};

export default UserProfile;
