import PropTypes from "prop-types";
import * as S from "./UserProfile.styled";

function UserProfile({ imageUrl, size = "5rem" }) {
    const ProfileComponent = imageUrl ? S.ProfileImageIcon : S.DefaultIcon;
    return <ProfileComponent src={imageUrl} size={size} />;
}

UserProfile.propTypes = {
    imageUrl: PropTypes.string,
    size: PropTypes.string,
};

export default UserProfile;
