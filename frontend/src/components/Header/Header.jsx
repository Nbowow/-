import * as S from "./Header.styled";

const Header = () => {
    const imagePath = "./logo/logo_green.svg";

    return (
        <S.MenuBar>
            <img src={imagePath} />
            <S.List>
                <S.ListItem>모든 레시피</S.ListItem>
                <S.ListItem>물가 동향</S.ListItem>
                <S.ListItem>레시피 등록</S.ListItem>
                <S.ListItem>마이 페이지</S.ListItem>
            </S.List>
        </S.MenuBar>
    );
};

export default Header;
