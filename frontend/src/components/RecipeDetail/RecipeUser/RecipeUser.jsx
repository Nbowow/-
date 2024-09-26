import PropTypes from "prop-types";
import Button from "../../Button/Button";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeUser.styled";
function RecipeUser({ data }) {
    const handleFollow = () => {};
    return (
        <S.UserContainer>
            <UserProfileImage imageUrl={data.imgUrl} size={"6rem"} />
            <S.UserDetails>
                <S.UserInfo>
                    <S.UserName>{data.name}</S.UserName>
                    <S.UserHome>{"🏠"}</S.UserHome>
                    <Button
                        width={"3rem"}
                        height={"1.5rem"}
                        text={"구독"}
                        onClick={handleFollow}
                        type={"small"}
                    />
                </S.UserInfo>
                <S.UserTalk>{data.talk}</S.UserTalk>
            </S.UserDetails>
        </S.UserContainer>
    );
}

RecipeUser.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        followCnt: PropTypes.number.isRequired,
        talk: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeUser;
