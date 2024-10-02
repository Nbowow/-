import * as S from "./Header.styled";
import useAuthStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const imagePath = import.meta.env.BASE_URL + "logo/logo_green.svg";

    const { isLoggedIn, logout } = useAuthStore();

    return (
        <S.MenuBar>
            <S.LogoImage src={imagePath} onClick={() => navigate("/")} />
            <S.LinkContainer>
                <S.Link>모든 레시피</S.Link>
                <S.Link>물가 동향</S.Link>
                <S.Link onClick={() => navigate("/post")}>레시피 등록</S.Link>

                {isLoggedIn ? (
                    <>
                        <S.Link onClick={() => navigate("/mypage")}>
                            마이 페이지
                        </S.Link>
                        <S.Link onClick={logout}>로그아웃</S.Link>
                    </>
                ) : (
                    <S.Link onClick={() => navigate("/login")}>로그인</S.Link>
                )}
            </S.LinkContainer>
        </S.MenuBar>
    );
};

export default Header;
