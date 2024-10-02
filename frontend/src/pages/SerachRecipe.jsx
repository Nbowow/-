import SearchBar from "./../components/SearchBar/SearchBar";

const SearchRecipe = () => {
    // eslint-disable-next-line no-unused-vars
    const result = [
        {
            recipeId: 1,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/fa3cd1800838bf561ea00b7552e9866a.jpg",
            title: "매콤한 한국식 김치찌개",
            text: "추운 날씨에 딱 맞는 얼큰하고 맛있는 한국식 김치찌개입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 2,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2020/08/09/b53479e644967fdb26161f95fa0d74531.jpg",
            title: "클래식 이탈리아 카르보나라",
            text: "판체타와 파르메산 치즈가 들어간 부드럽고 진한 이탈리아 파스타입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 3,
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHeptKdfzNSzNKVmHTFH-eUkVCJFHkJh7Pww&s",
            title: "고소한 참깨 드레싱 샐러드",
            text: "고소한 참깨 드레싱이 어우러진 신선한 샐러드입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 4,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2022/11/10/29d88f0c0873d46073199f0e076d621e1.jpg",
            title: "단짠단짠 간장 떡볶이",
            text: "달콤하고 짭짤한 맛이 어우러진 특별한 간장 떡볶이입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 5,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2016/10/06/eefee6abe37a21262025025b8a833ddf1.jpg",
            title: "바삭한 크림새우",
            text: "바삭한 새우튀김에 크리미한 소스를 얹어 더욱 맛있게 즐겨보세요.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 6,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/07/09/eb45d77360e28f93aec8fee1ba0a96f21.jpg",
            title: "감자와 치즈가 듬뿍 들어간 치즈 감자전",
            text: "바삭하게 구운 감자전 안에 고소한 치즈가 가득 들어간 간식입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 7,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2020/11/28/2c2544a9719cccc3a794efe4ca994cd51.jpg",
            title: "매운 해물 짬뽕",
            text: "다양한 해산물과 매운 국물이 특징인 한국식 해물 짬뽕입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 8,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2017/06/28/1b4ba3c855623497b93bfa761430484d1.jpg",
            title: "고소한 미소 된장국",
            text: "일본식 미소 된장국으로 부드러운 맛을 즐겨보세요.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 9,
            imgUrl: "https://kid.chosun.com/site/data/img_dir/2009/04/03/2009040301272_0.jpg",
            title: "상큼한 과일 샐러드",
            text: "신선한 과일을 가득 담은 상큼한 샐러드입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 10,
            imgUrl: "https://ktxmagazine.kr/old_data/mlounge/contents/data/recipe/R_L_140789597510115.jpg",
            title: "담백한 치킨 스테이크 샌드위치",
            text: "건강하고 담백하게 즐기는 간편한 치킨 스테이크 샌드위치 레시피입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
    ];
    return (
        <div>
            <SearchBar />
        </div>
    );
};

export default SearchRecipe;
