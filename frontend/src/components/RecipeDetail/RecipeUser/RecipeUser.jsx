import PropTypes from "prop-types";
import Button from "../../Button/Button";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeUser.styled";
function RecipeUser({ data }) {
    const handleFollow = () => {};
    return (
        <S.UserContainer>
            <UserProfileImage imageUrl={data.imageUrl} size={"4.5rem"} />
            <S.UserDetails>
                <S.UserInfo>
                    <S.UserName>{data.name}</S.UserName>
                    <S.UserLabel>님의 레시피입니다.</S.UserLabel>
                </S.UserInfo>
                <S.UserFollowSection>
                    <S.UserLabel>구독자 {data.followCnt}명</S.UserLabel>
                    <Button
                        width={"4rem"}
                        height={"1.5rem"}
                        text={"구독"}
                        onClick={handleFollow}
                        type={"small"}
                    />
                </S.UserFollowSection>
            </S.UserDetails>
        </S.UserContainer>
    );
}

RecipeUser.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        followCnt: PropTypes.number.isRequired,
    }).isRequired,
};

export default RecipeUser;
