import PropTypes from "prop-types";
import * as S from "./FollowingModal.styled";
import { useState } from "react";
import UserProfileImage from "../UserProfileImage/UserProfileImage";
import { useNavigate } from "react-router-dom";

const FollowingModal = ({ isOpen, onClose, followers, followings }) => {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const getActiveList = () => {
        switch (activeTab) {
            case 0:
                return followers;
            case 1:
                return followings;
            default:
                return [];
        }
    };

    return (
        <S.ModalWrapper onClick={onClose}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
                <S.TabButtons>
                    <S.TabButton
                        isActive={activeTab === 0}
                        onClick={() => setActiveTab(0)}
                    >
                        팔로우
                    </S.TabButton>
                    <S.TabButton
                        isActive={activeTab === 1}
                        onClick={() => setActiveTab(1)}
                    >
                        팔로잉
                    </S.TabButton>
                </S.TabButtons>

                <S.UserList>
                    {getActiveList().map((item, index) => (
                        <S.UserListItem key={index}>
                            <UserProfileImage
                                imageUrl={item.profileImage}
                                size="42px"
                            />
                            <S.UserNickname
                                onClick={() => navigate(`/user/${item.id}`)}
                            >
                                {item.nickname}
                            </S.UserNickname>
                            <S.FollowButton>팔로잉</S.FollowButton>
                        </S.UserListItem>
                    ))}
                </S.UserList>
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

FollowingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    followers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            nickname: PropTypes.string.isRequired,
            profileImage: PropTypes.string,
        }),
    ).isRequired,
    followings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            nickname: PropTypes.string.isRequired,
            profileImage: PropTypes.string,
        }),
    ).isRequired,
};
export default FollowingModal;
