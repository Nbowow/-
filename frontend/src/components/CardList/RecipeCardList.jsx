import * as S from "./CardList.styled";
import RecipeCard from "../Card/RecipeCard/RecipeCard";
import PropTypes from "prop-types";

const RecipeCardList = ({ recipes, showProfile }) => {
    return (
        <S.CardList>
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.recipeId}
                    showProfile={showProfile}
                    recipe={recipe}
                />
            ))}
        </S.CardList>
    );
};

/*
commentCount
: 
0
cookingTools
: 
null
id
: 
172
image
: 
"https://recipe1.ezmember.co.kr/cache/recipe/2018/05/29/74f665b3e76e4a4aa9f06e12b6c900fc1.jpg"
info
: 
"시장에 나온 햇감자가 너무 맛있어 보여서 작은상자로 한박스 들여 보았어요, 요즘 감자값이 금값이긴 한데 파실하니 또 맛있는지라 쪄서도 먹고 반찬으로 볶아서도... 또 이렇게 일본가정식 #니쿠자가 #쇠고기감자조림 으로도 만들어 감칠맛 좋게 감자도 먹고 고기도 먹는 조림반찬으로 즐겨 보았답니다. 니쿠는 고기와 감자를 뜻하는 말로 쇠고기와 함께 감자, 야채를 간장에 조려낸 반찬을 니쿠자가 라고 합니다."
ingredients
: 
"D_0002"
level
: 
"아무나"
likeCount
: 
0
method
: 
"E_0005"
name
: 
"쇠고기감자조림"
nickname
: 
"나는야수근수근이수근"
profileImage
: 
"https://phinf.pstatic.net/contact/20240815_278/1723710540545GG7jm_JPEG/image.jpg"
scrapCount
: 
0
servings
: 
3
situation
: 
"C_0002"
time
: 
30
title
: 
"쇠고기 감자조림 니쿠자가 감자도먹고 고기도먹고~"
type
: 
"B_0002"
userId
: 
1
viewCount
: 
19238
*/
RecipeCardList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            info: PropTypes.string.isRequired,
            showProfile: PropTypes.bool.isRequired,
            profileImage: PropTypes.string,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    showProfile: PropTypes.bool.isRequired,
};

export default RecipeCardList;
