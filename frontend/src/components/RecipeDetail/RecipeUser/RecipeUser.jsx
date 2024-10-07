import PropTypes from "prop-types";
import Button from "../../Button/Button";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeUser.styled";
function RecipeUser({ user }) {
    const handleFollow = () => {};
    return (
        <S.UserContainer>
            <UserProfileImage imageUrl={user.profileImage} size={"6rem"} />
            <S.UserDetails>
                <S.UserInfo>
                    <S.UserName>{user.nickname}</S.UserName>
                    <S.UserHome>{"🏠"}</S.UserHome>
                    <Button
                        width={"3rem"}
                        height={"1.5rem"}
                        text={"팔로우"}
                        onClick={handleFollow}
                        type={"small"}
                    />
                </S.UserInfo>
                <S.UserTalk>{user.summary}</S.UserTalk>
            </S.UserDetails>
        </S.UserContainer>
    );
}

RecipeUser.propTypes = {
    user: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        followCnt: PropTypes.number.isRequired,
        summary: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeUser;
