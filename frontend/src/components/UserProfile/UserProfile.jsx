import * as S from "./UserProfile.styled";
import UserProfileImage from "./UserProfileImage/UserProfileImage";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../util/format-number";

const UserProfile = ({
    userId,
    showInfo,
    profileImgUrl,
    nickName,
    discription,
}) => {
    const buttonText = "정보 수정";
    const follow = formatNumber(0);
    const following = formatNumber(2000000);

    const navigate = useNavigate();

    const onClickModifyButton = () => {
        navigate("/modify");
    };

    return (
        <S.UserProfile>
            <S.ProfileImage>
                <UserProfileImage imageUrl={profileImgUrl} size="180px" />
            </S.ProfileImage>
            {showInfo && (
                <S.UserStat>
                    <S.TextWrapper>
                        <div className="nickname">{nickName}</div>
                        <div className="discription">{discription}</div>
                        <S.StatWrapper>
                            <S.Stat>
                                <div className="stat">팔로우</div>{" "}
                                <div>{follow}</div>
                            </S.Stat>
                            <S.Stat>
                                <div className="stat">팔로잉</div>{" "}
                                <div>{following}</div>
                            </S.Stat>
                        </S.StatWrapper>
                    </S.TextWrapper>
                    <Button
                        text={buttonText}
                        width="80px"
                        height="32px"
                        type="small"
                        onClick={onClickModifyButton}
                    />
                </S.UserStat>
            )}
        </S.UserProfile>
    );
};

UserProfile.propTypes = {
    userId: PropTypes.string,
    showInfo: PropTypes.bool,
    profileImgUrl: PropTypes.string,
    UserProfileStat: PropTypes.node,
    nickName: PropTypes.string,
    discription: PropTypes.string,
};

export default UserProfile;
