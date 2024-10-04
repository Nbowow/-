import * as S from "./MyPage.styled";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileLevel from "../../components/UserProfile/UserProfileLevel/UserProfileLevel";
import Tab from "../../components/Tab/Tab";
import RecipeCardList from "../../components/CardList/RecipeCardList";
import useUser, { useUserReceipe } from "../../hooks/useUser";
import { useUserStore } from "../../store/userStore";

const MyPage = () => {
    const { isLoading: isUserLoading } = useUser();
    const { isLoading: isRecipeLoading } = useUserReceipe();

    const user = useUserStore((state) => state.user);
    const recipes = useUserStore((state) => state.recipes);

    if (isUserLoading || isRecipeLoading) return <div></div>;

    const scraps = [
        {
            recipeId: 1,
            imgUrl: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/01/234cd540-11d0-452e-8656-98f2eb5dfe4b.jpg",
            title: "매콤한 닭볶음탕",
            text: "매콤한 닭볶음탕으로 입맛 돋우기!",
            showProfile: true,
            profileImgUrl:
                "https://i.namu.wiki/i/QAeoGZZYPIr0Cmj7UYnQSovYc56fslX55u4YOeHuBTZLsCy6XB_Q5HqhhSfy0OgzQuCGlmfw4ulMSVWrrcQGmQ.webp",
            author: "요리하는형",
        },
        {
            recipeId: 2,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2018/05/28/3f8b92f24a1a80ee14fda24058aa87741.jpg",
            title: "고소한 감자전",
            text: "바삭하고 고소한 감자전 한 접시!",
            showProfile: true,
            profileImgUrl:
                "https://kormedi.com/wp-content/uploads/2023/05/unnamed-file-240.jpg",
            author: "감자도사",
        },
        {
            recipeId: 3,
            imgUrl: "https://static.wtable.co.kr/image-resize/production/service/recipe/1917/4x3/d912095b-45ad-4d94-9fad-c80257b2d838.jpg",
            title: "든든한 소고기미역국",
            text: "건강한 소고기미역국으로 시작하는 하루!",
            showProfile: true,
            profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvfL9a0ET8qX7sWE5pYhQs9IcsAnPkVbJvpA&s",
            author: "밥도둑",
        },
        {
            recipeId: 4,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2021/10/12/8fb47f58ed6c934d2e86dc9961e50a1b1.jpg",
            title: "상큼한 과일샐러드",
            text: "신선한 과일샐러드로 가볍게!",
            showProfile: true,
            profileImgUrl:
                "https://image.yes24.com/images/chyes24/c/e/2/8/ce284d13757b9a4f57a716100e51880e.jpg",
            author: "샐러드여왕",
        },
        {
            recipeId: 5,
            imgUrl: "https://i.namu.wiki/i/QmCg_wtSaWqRXR5-gIBfAy36a14b7WOzSwMIu3AC7BECbdRKN1uOb22mes9px6thnhl2kXh1eKUWStoQLLX9WQ.webp",
            title: "치즈가득 김치볶음밥",
            text: "치즈가 듬뿍 올라간 김치볶음밥!",
            showProfile: true,
            profileImgUrl:
                "https://blog.kakaocdn.net/dn/b0RGp6/btqMpKDHaxX/hnYFcCdCArzjDfKbi7H8o0/img.webp",
            author: "치즈덕후",
        },
        {
            recipeId: 6,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2016/08/01/852bfdb3627182aa05afa4a40d6f2c4d1.jpg",
            title: "크림파스타",
            text: "부드러운 크림파스타 한 그릇.",
            showProfile: true,
            profileImgUrl:
                "https://cdn.lecturernews.com/news/photo/202106/69803_262593_3628.jpg",
            author: "파스타마스터",
        },
        {
            recipeId: 7,
            imgUrl: "https://www.tefal.co.kr/medias/?context=bWFzdGVyfHJvb3R8MjM4MTF8aW1hZ2UvanBlZ3xhRGN6TDJnd1pTOHhOREEzTURJMU1qSTNNelk1TkM1cWNHY3xkOTRlZDU5ODU2NTY0ZjlhYzM3NmFiN2JmYzM2OGQ2M2ZhNDAwZWIwZmY3MTE2MWFiYTUwNmY4Y2IyZDJkNzcy",
            title: "초콜릿 브라우니",
            text: "진한 초콜릿 브라우니로 달콤하게!",
            showProfile: true,
            profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3jEjp3CoXF1UUpjdI0nNBGm6Nb6zxlWsdg&s",
            author: "디저트왕자",
        },
        {
            recipeId: 8,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/06/19/113e25bd88c92310d9e4405f252976b9.jpg",
            title: "불고기 덮밥",
            text: "달콤한 불고기로 완성하는 든든한 한 끼!",
            showProfile: true,
            profileImgUrl:
                "https://c-fa.cdn.smule.com/rs-s53/arr/fa/59/6818e6cf-db6b-436b-a415-f8a5204f51e3.jpg",
            author: "한식러버",
        },
        {
            recipeId: 9,
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2016/05/21/3f5e9c44171513fd98ec2f038e4e1b9d1.jpg",
            title: "바질페스토 피자",
            text: "향긋한 바질페스토가 들어간 피자!",
            showProfile: true,
            profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHU7_BrDnl1o8ACVqAP40n0C4DBxM3uKH7Ag&s",
            author: "피자장인",
        },
        {
            recipeId: 10,
            imgUrl: "https://mblogthumb-phinf.pstatic.net/MjAxODEyMDZfMTEx/MDAxNTQ0MTA3NDU5NDA1.VGSEwOk8Cpdc_-Y92GhPMXI4GwBzqCSQ8M7lJirsgesg.YEgxewCJfIgnLX-D6FoP9IATQ-LCoO9YNp_FmePdpYQg.JPEG.rlagywmd/downloadfile-2.jpg?type=w800",
            title: "계란찜",
            text: "폭신폭신한 계란찜으로 가볍게!",
            showProfile: true,
            profileImgUrl:
                "https://i.namu.wiki/i/_NprO9QHh0WplJXnQlv6Y_A_JrTIdIB6580vgCoGAqmf6YqHZo18cPZ_M9_l35ahjemjB7MPpdqy8RDV-VREyw.webp",
            author: "최강록 도전자",
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
                <UserProfile showInfo={true} member={user} />
                <UserProfileLevel score={user.score} />
            </div>
            <Tab tabs={tabs} />
        </S.MyPage>
    );
};

export default MyPage;
