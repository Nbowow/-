import BannerSlider from "../../components/Slider/BannerSlider/BannerSlider";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardSlider from "../../components/Slider/CardSlider/CardSlider";
import LinkBanner from "../../components/Banner/LinkBanner";
import Footer from "../../components/Footer/Footer";

import * as S from "./Main.styled";

// TODO: 테스트용 데이터
const winterMenus = [
    {
        title: "삼계탕",
        text: "인삼과 찹쌀, 닭을 넣어 끓인 보양식으로, 몸을 따뜻하게 해주는 영양 가득한 한 그릇입니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCwyQOXdjcsRY9X59giB2fCagp7hq-R58Gw&s",
    },
    {
        title: "갈비찜",
        text: "부드럽게 조리한 소갈비에 각종 채소와 양념을 넣어 푸짐하게 즐길 수 있는 명절 별미입니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX1XRm_Wm3wwhCpOFRxedKNkW-ZYplB90b8w&s",
    },
    {
        title: "호박죽",
        text: "달콤한 호박을 곱게 간 후 쌀과 함께 끓여 만든 따뜻하고 부드러운 겨울 간식입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/06/08/b560336eeda34ce5e47fd4be7cde548a.jpg",
    },
    {
        title: "부대찌개",
        text: "다양한 재료와 소시지, 김치가 어우러진 얼큰한 찌개로 추운 날씨에 몸을 녹여줍니다.",
        imgUrl: "https://static.wtable.co.kr/image-resize/production/service/recipe/360/16x9/a35f8e69-6874-4cc3-9b55-7a9994390a93.jpg",
    },
    {
        title: "전골",
        text: "신선한 채소와 고기를 듬뿍 넣어 끓인 뜨끈한 국물 요리로, 가족과 함께 따뜻하게 즐기기 좋습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2020/04/13/6610b548fed627ae5d1cc4520e7c79c91.jpg",
    },
    {
        title: "해물파전",
        text: "각종 해물과 파를 듬뿍 넣어 바삭하게 부친 전으로, 추운 날씨에 막걸리와 함께 즐기기 제격입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2017/05/29/19ea74f464f2faf18ed5ed534fed84f01.jpg",
    },
    {
        title: "떡국",
        text: "얇게 썬 떡을 국물에 넣어 끓인 전통적인 새해 음식으로, 따뜻하고 담백한 맛이 일품입니다.",
        imgUrl: "https://img.samsungsemiconductor.com/kr/wp-content/uploads/2021/06/food_trend_20170103_01.jpg",
    },
    {
        title: "김치찌개",
        text: "잘 익은 김치와 돼지고기를 넣어 끓인 매콤한 찌개로, 추운 겨울에 몸을 데워줍니다.",
        imgUrl: "https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg",
    },
    {
        title: "순두부찌개",
        text: "부드러운 순두부와 해산물, 채소를 넣어 끓인 얼큰한 찌개로, 영양가 높고 따뜻하게 즐길 수 있습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2019/03/01/cbdcad39283af740afd0e08f97849c7c1.jpg",
    },
    {
        title: "갈비탕",
        text: "소갈비를 오랜 시간 푹 고아낸 진한 국물에 무와 대파를 넣어 만든 따뜻한 탕 요리입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2022/09/26/67e1e49d30007c25b7e34908551d0da71.jpg",
    },
    {
        title: "오징어볶음",
        text: "매콤하게 양념한 오징어와 채소를 볶아낸 반찬으로, 따뜻한 밥과 함께 잘 어울립니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/12/01/bd2b8255a2f1bbcb66bf1faf04cdba531.jpg",
    },
    {
        title: "감자탕",
        text: "감자와 돼지등뼈를 푹 고아 만든 진한 국물에 각종 채소를 넣어 끓인 든든한 찌개입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2016/12/19/64f70311042c29d4a882c5187dfab63c1.jpg",
    },
    {
        title: "갈비국",
        text: "소갈비를 푹 고아 만든 맑은 국물에 무와 대파를 넣어 담백하게 즐길 수 있는 국 요리입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2022/09/26/67e1e49d30007c25b7e34908551d0da71.jpg",
    },
    {
        title: "매운 닭볶음탕",
        text: "닭고기와 각종 채소를 매콤하게 양념해 푹 조린 찜 요리로, 밥과 함께 따뜻하게 먹기 좋습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/08/11/0554430063ac68758e4929e120c655001.jpg",
    },
    {
        title: "해장국",
        text: "숙취 해소에 좋은 여러 가지 재료를 넣어 끓인 뜨끈한 국물 요리로, 추운 날씨에 더욱 어울립니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrW6S9kl_lZ6y-z482WI0lQWGtieewmTO_EA&s",
    },
    {
        title: "보쌈",
        text: "부드럽게 삶은 돼지고기를 신선한 배추에 싸서 쌈장과 함께 즐기는 따뜻한 한 끼 식사입니다.",
        imgUrl: "https://i.namu.wiki/i/jgm2bWyeBCIqOHEu3052S2TK-zyd_pHYeNmsUeUwgk9yuiPGt2C0JPEFgocGwVElJeMkwzPrHIuuNAVbSOzd_g.webp",
    },
    {
        title: "칼국수",
        text: "쫄깃한 면발과 시원한 국물이 어우러진 칼국수로, 따뜻하게 즐기기 좋은 면 요리입니다.",
        imgUrl: "https://i.namu.wiki/i/XOXY4Q4ix1v8LxEHg0MejrPs8uT6SKWM57pexVwJ-pqK0c7y8so9b70RMIRqaJ0aI1lVD7Uy0auXNyP_bk8_Ig.webp",
    },
    {
        title: "닭도리탕",
        text: "매콤한 양념에 닭고기와 감자, 당근 등을 넣어 푹 조린 찜 요리로, 밥과 함께 든든하게 먹을 수 있습니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OZGjdJcBcQ9dLpDS4dEJxq0qqEpowLxtzQ&s",
    },
    {
        title: "된장찌개",
        text: "된장과 다양한 채소, 두부를 넣어 끓인 전통적인 찌개로, 따뜻하고 구수한 맛이 일품입니다.",
        imgUrl: "https://semie.cooking/image/post/recipe/hx/es/nnjzvvrh/html/102157311rzhi.jpg",
    },
    {
        title: "팥빙수",
        text: "추운 겨울에도 즐길 수 있는 따뜻한 팥빙수로, 달콤한 팥과 떡, 견과류가 어우러져 색다른 디저트를 즐길 수 있습니다.",
        imgUrl: "https://health.chosun.com/site/data/img_dir/2022/05/31/2022053101899_0.jpg",
    },
];

const kimchiDishes = [
    {
        title: "김치찌개",
        text: "잘 익은 김치와 돼지고기, 두부를 넣어 끓인 매콤하고 얼큰한 찌개로, 밥과 함께 든든하게 즐길 수 있습니다.",
        imgUrl: "https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg",
    },
    {
        title: "김치볶음밥",
        text: "잘 익은 김치를 밥과 함께 볶아 간장과 참기름으로 맛을 낸 간단하면서도 맛있는 한 그릇 요리입니다.",
        imgUrl: "https://i.namu.wiki/i/QmCg_wtSaWqRXR5-gIBfAy36a14b7WOzSwMIu3AC7BECbdRKN1uOb22mes9px6thnhl2kXh1eKUWStoQLLX9WQ.webp",
    },
    {
        title: "김치전",
        text: "잘게 썬 김치와 부침가루를 섞어 부친 바삭한 전으로, 간단한 안주나 간식으로 제격입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2019/05/02/ddafc8912fdd1c261dd673cec48b96861.jpg",
    },
    {
        title: "김치말이국수",
        text: "싱싱한 오이와 함께 김치를 말아 넣은 시원한 국수 요리로, 여름뿐만 아니라 다양한 계절에 즐길 수 있습니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYF5JJSaLrLJ0vgpREButbsQKIG6t4PP1ONQ&s",
    },
    {
        title: "김치찜",
        text: "두툼하게 자른 돼지고기와 김치를 함께 푹 졸여 만든 진한 맛의 찜 요리로, 밥과 함께 먹기 좋습니다.",
        imgUrl: "https://www.foodnews.news/data/photos/20220937/art_16633105549838_336582.jpg",
    },
    {
        title: "김치라면",
        text: "매콤한 김치를 넣어 끓인 라면으로, 간단하면서도 깊은 맛을 즐길 수 있는 인기 메뉴입니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-qStFX0R7_w-BZdKt6TaOipLhhF8kH7N6A&s",
    },
    {
        title: "김치볶음",
        text: "잘 익은 김치를 간장과 설탕, 고추장을 넣어 볶아낸 반찬으로, 다양한 요리에 곁들여 먹기 좋습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2020/07/05/229fc35b94e755259fa93e9e2b0522e91.jpg",
    },
    {
        title: "김치우동",
        text: "김치와 우동 면을 함께 끓여 만든 퓨전 요리로, 매콤한 맛이 특징입니다.",
        imgUrl: "https://img-cf.kurly.com/hdims/resize/%3E720x/quality/90/src/shop/data/goodsview/20240118/gv40000794710_1.jpg",
    },
    {
        title: "김치스튜",
        text: "김치와 각종 채소, 고기를 넣어 끓인 스튜로, 서양식 스튜와 김치의 조화로운 맛을 느낄 수 있습니다.",
        imgUrl: "https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2022/08/19/20220819000650_0.jpg",
    },
    {
        title: "김치비빔국수",
        text: "매콤한 김치 소스를 곁들인 비빔국수로, 상큼하고 얼큰한 맛이 일품입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2018/03/22/599723cfecc8d9dd610aabadcbf6f3a71.jpg",
    },
    {
        title: "김치찜닭",
        text: "닭고기와 김치를 함께 졸여 만든 매콤한 찜 요리로, 밥과 함께 푸짐하게 즐길 수 있습니다.",
        imgUrl: "https://media-cdn.tripadvisor.com/media/photo-s/19/eb/21/2c/caption.jpg",
    },
    {
        title: "김치돈까스",
        text: "바삭하게 튀긴 돈까스 위에 매콤한 김치를 얹어 낸 퓨전 요리로, 독특한 맛을 자랑합니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/04/21/8bcae61cbbb4ccae0c86911f56cdd68e1.jpg",
    },
    {
        title: "김치피자",
        text: "피자 도우 위에 김치와 치즈, 각종 토핑을 올려 구운 퓨전 피자로, 매콤하고 고소한 맛이 특징입니다.",
        imgUrl: "https://i.ytimg.com/vi/nDVb1oMv1K8/maxresdefault.jpg",
    },
    {
        title: "김치김밥",
        text: "김치와 각종 채소, 고기를 넣어 말아낸 김밥으로, 간편하게 즐길 수 있는 한 끼 식사입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2018/10/07/2296b31a2cb55ad57844711b60048be81.jpg",
    },
    {
        title: "김치볶음면",
        text: "김치를 넣어 볶은 면 요리로, 간단하면서도 매콤한 맛을 즐길 수 있습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/06/18/574b99d150b0282a70cc6810118baa5a1.jpg",
    },
    {
        title: "김치나베",
        text: "김치와 다양한 채소, 두부 등을 넣어 끓인 일본식 전골로, 따뜻하게 즐기기 좋습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2016/01/11/7142dffcdd15ef60d4c65ef7ff05e7221.jpg",
    },
    {
        title: "김치그라탕",
        text: "김치와 치즈, 베샤멜 소스를 층층이 올려 오븐에 구운 그라탕으로, 고소하고 매콤한 맛이 조화를 이룹니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/10/10/d274573f6145770b3983e3e4231bdc43.jpg",
    },
    {
        title: "김치샌드위치",
        text: "김치와 햄, 치즈 등을 넣어 만든 샌드위치로, 간편하면서도 독특한 맛을 즐길 수 있습니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/07/31/b941191d178d64a19704c9b528b1b400.jpg",
    },
    {
        title: "김치수제비",
        text: "김치를 넣어 끓인 수제비로, 매콤한 국물과 부드러운 수제비의 조화가 일품입니다.",
        imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2015/07/01/bb4c5d1331cf628810224ca490083f33.jpg",
    },
    {
        title: "김치떡볶이",
        text: "김치를 넣어 매콤하게 조리한 떡볶이로, 전통적인 떡볶이보다 깊은 맛을 느낄 수 있습니다.",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSG62ssx0vSNRYDGjCUwUs-92t-cQSDiaBAA&s",
    },
];

const Main = () => {
    return (
        <S.Main>
            <div>
                <BannerSlider />
                <SearchBar
                    userId={"test"}
                    purpose={"recipe"}
                    boldPlacehold={"오늘은 무슨 요리를 할까요?"}
                    grayPlacehold={
                        "재료와 요리명으로 추천 레시피를 검색해보세요."
                    }
                />
            </div>
            <div>
                <CardSlider
                    color={({ theme }) => theme.color.point.green}
                    data={winterMenus}
                />
                <CardSlider
                    color={({ theme }) => theme.color.point.lightYellow}
                    data={kimchiDishes}
                />
            </div>

            <LinkBanner />
            <Footer />
        </S.Main>
    );
};
export default Main;
