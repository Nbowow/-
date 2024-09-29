import * as S from "./MyPage.styled";
import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileLevel from "../../components/UserProfile/UserProfileLevel/UserProfileLevel";
import Tab from "../../components/Tab/Tab";
import RecipeCardList from "../../components/CardList/RecipeCardList";

const testProfile = {
    profileImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC3mWTEKRD3X8xKRx2mx9RGBWk072IZFdJIg&s",
    nickName: "흑종원",
    discription: "조보아씨 일루 내려와바유",
};

const MyPage = () => {
    //TODO : 테스트용 데이터
    const recipes = [
        {
            recipeId: 1,
            imgUrl: "https://example.com/img1.jpg",
            title: "매콤한 한국식 김치찌개",
            text: "추운 날씨에 딱 맞는 얼큰하고 맛있는 한국식 김치찌개입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 2,
            imgUrl: "https://example.com/img2.jpg",
            title: "클래식 이탈리아 카르보나라",
            text: "판체타와 파르메산 치즈가 들어간 부드럽고 진한 이탈리아 파스타입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 3,
            imgUrl: "https://example.com/img3.jpg",
            title: "고소한 참깨 드레싱 샐러드",
            text: "고소한 참깨 드레싱이 어우러진 신선한 샐러드입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 4,
            imgUrl: "https://example.com/img4.jpg",
            title: "단짠단짠 간장 떡볶이",
            text: "달콤하고 짭짤한 맛이 어우러진 특별한 간장 떡볶이입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 5,
            imgUrl: "https://example.com/img5.jpg",
            title: "바삭한 크림새우",
            text: "바삭한 새우튀김에 크리미한 소스를 얹어 더욱 맛있게 즐겨보세요.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 6,
            imgUrl: "https://example.com/img6.jpg",
            title: "감자와 치즈가 듬뿍 들어간 치즈 감자전",
            text: "바삭하게 구운 감자전 안에 고소한 치즈가 가득 들어간 간식입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 7,
            imgUrl: "https://example.com/img7.jpg",
            title: "매운 해물 짬뽕",
            text: "다양한 해산물과 매운 국물이 특징인 한국식 해물 짬뽕입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 8,
            imgUrl: "https://example.com/img8.jpg",
            title: "고소한 미소 된장국",
            text: "일본식 미소 된장국으로 부드러운 맛을 즐겨보세요.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 9,
            imgUrl: "https://example.com/img9.jpg",
            title: "상큼한 과일 샐러드",
            text: "신선한 과일을 가득 담은 상큼한 샐러드입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
        {
            recipeId: 10,
            imgUrl: "https://example.com/img10.jpg",
            title: "담백한 치킨 스테이크",
            text: "건강하고 담백하게 즐기는 간편한 치킨 스테이크 레시피입니다.",
            showProfile: false,
            profileImgUrl: "",
            author: "익명",
        },
    ];

    const scraps = [
        {
            recipeId: 1,
            imgUrl: "https://example.com/img1.jpg",
            title: "매콤한 한국식 김치찌개",
            text: "추운 날씨에 딱 맞는 얼큰하고 맛있는 한국식 김치찌개입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile1.jpg",
            author: "김요리",
        },
        {
            recipeId: 2,
            imgUrl: "https://example.com/img2.jpg",
            title: "클래식 이탈리아 카르보나라",
            text: "판체타와 파르메산 치즈가 들어간 부드럽고 진한 이탈리아 파스타입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile2.jpg",
            author: "이탈리안 셰프",
        },
        {
            recipeId: 3,
            imgUrl: "https://example.com/img3.jpg",
            title: "고소한 참깨 드레싱 샐러드",
            text: "고소한 참깨 드레싱이 어우러진 신선한 샐러드입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile3.jpg",
            author: "샐러드 마스터",
        },
        {
            recipeId: 4,
            imgUrl: "https://example.com/img4.jpg",
            title: "단짠단짠 간장 떡볶이",
            text: "달콤하고 짭짤한 맛이 어우러진 특별한 간장 떡볶이입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile4.jpg",
            author: "분식의 달인",
        },
        {
            recipeId: 5,
            imgUrl: "https://example.com/img5.jpg",
            title: "바삭한 크림새우",
            text: "바삭한 새우튀김에 크리미한 소스를 얹어 더욱 맛있게 즐겨보세요.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile5.jpg",
            author: "해산물 애호가",
        },
        {
            recipeId: 6,
            imgUrl: "https://example.com/img6.jpg",
            title: "감자와 치즈가 듬뿍 들어간 치즈 감자전",
            text: "바삭하게 구운 감자전 안에 고소한 치즈가 가득 들어간 간식입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile6.jpg",
            author: "감자요리 전문가",
        },
        {
            recipeId: 7,
            imgUrl: "https://example.com/img7.jpg",
            title: "매운 해물 짬뽕",
            text: "다양한 해산물과 매운 국물이 특징인 한국식 해물 짬뽕입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile7.jpg",
            author: "한식 셰프",
        },
        {
            recipeId: 8,
            imgUrl: "https://example.com/img8.jpg",
            title: "고소한 미소 된장국",
            text: "일본식 미소 된장국으로 부드러운 맛을 즐겨보세요.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile8.jpg",
            author: "일본 가정식 전문가",
        },
        {
            recipeId: 9,
            imgUrl: "https://example.com/img9.jpg",
            title: "상큼한 과일 샐러드",
            text: "신선한 과일을 가득 담은 상큼한 샐러드입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile9.jpg",
            author: "헬시 푸드 크리에이터",
        },
        {
            recipeId: 10,
            imgUrl: "https://example.com/img10.jpg",
            title: "담백한 치킨 스테이크",
            text: "건강하고 담백하게 즐기는 간편한 치킨 스테이크 레시피입니다.",
            showProfile: true,
            profileImgUrl: "https://example.com/profile10.jpg",
            author: "홈쿡 전문가",
        },
    ];

    const tabs = [
        {
            label: "나의 레시피",
            content: <RecipeCardList recipes={recipes} />,
        },
        {
            label: "스크랩 레시피",
            content: <RecipeCardList recipes={scraps} />,
        },
    ];

    return (
        <S.MyPage>
            <div>
                <Header />
                <UserProfile
                    profileImgUrl={testProfile.profileImgUrl}
                    UserProfileStat={testProfile.profileStat}
                    nickName={testProfile.nickName}
                    discription={testProfile.discription}
                />
                <UserProfileLevel />
            </div>
            <Tab tabs={tabs} />
        </S.MyPage>
    );
};

export default MyPage;
