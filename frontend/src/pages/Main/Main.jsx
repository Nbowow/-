import Header from "../../components/Header/Header";
import BannerSlider from "../../components/Slider/BannerSlider/BannerSlider";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardSlider from "../../components/Slider/CardSlider/CardSlider";
import LinkBanner from "../../components/Banner/LinkBanner";
import Footer from "../../components/Footer/Footer";

import * as S from "./Main.styled";

const Main = () => {
    return (
        <S.Main>
            <div>
                <Header />
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
                <CardSlider color={({ theme }) => theme.color.point.green} />
                <CardSlider
                    color={({ theme }) => theme.color.point.lightYellow}
                />
            </div>

            <LinkBanner />
            <Footer />
        </S.Main>
    );
};
export default Main;
