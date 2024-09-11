import { List, ListItem, MenuBar } from "./style";

const Header = () => {
    const imagePath = "./logo/logo_green.svg";

    return (
        <MenuBar>
            <img src={imagePath} />
            <List>
                <ListItem>모든 레시피</ListItem>
                <ListItem>물가 동향</ListItem>
                <ListItem>레시피 등록</ListItem>
                <ListItem>마이 페이지</ListItem>
            </List>
        </MenuBar>
    );
};

export default Header;
