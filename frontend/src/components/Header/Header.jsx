import * as S from "./Header.styled";

const Header = () => {
    const imagePath = "./logo/logo_green.svg";

    return (
        <S.MenuBar>
            <img src={imagePath} />
            <S.LinkContainer>
                <S.Link>모든 레시피</S.Link>
                <S.Link>물가 동향</S.Link>
                <S.Link>레시피 등록</S.Link>
                <S.Link>마이 페이지</S.Link>
            </S.LinkContainer>
        </S.MenuBar>
    );
};

export default Header;
