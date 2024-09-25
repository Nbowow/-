import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import BannerSlider from "../../components/Slider/BannerSlider/BannerSlider";

import * as S from "./Main.styled";

const Main = () => {
    return (
        <>
            <Header />
            <BannerSlider />
            <S.SearchWrapper>
                <SearchInput
                    boldPlacehold="오늘은 무슨 요리를 할까요?"
                    grayPlacehold="재료와 요리명으로 추천 레시피를 검색해보세요."
                />
            </S.SearchWrapper>
        </>
    );
};
export default Main;
