import Header from "../../components/Header/Header";
import BannerSlider from "../../components/Slider/BannerSlider/BannerSlider";
import SearchBar from "../../components/SearchBar/SearchBar";

const Main = () => {
    return (
        <>
            <Header />
            <BannerSlider />
            <SearchBar
                userId={"test"}
                purpose={"recipe"}
                boldPlacehold={"오늘은 무슨 요리를 할까요?"}
                grayPlacehold={"재료와 요리명으로 추천 레시피를 검색해보세요."}
            />
        </>
    );
};
export default Main;
