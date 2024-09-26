import IntroCard from "../../Card/IntroCard/IntroCard";
import * as S from "./CardSlider.styled";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// TODO: 배경색 props로 받기
// TODO: 페이지네이션 스크롤바로 변경, 버튼 색상 변경

const CardSlider = () => {
    const CardPack = () => (
        <S.CardPack>
            <IntroCard
                title="비빔비빔비빔비빔"
                text="hihihihi"
                imgUrl="https://cdn.bonif.co.kr/cmdt/20220628_M7O_1656371902441_626Kb.jpg"
            />
            <IntroCard
                title="비빔비빔비빔비빔"
                text="hihihihi"
                imgUrl="https://cdn.bonif.co.kr/cmdt/20220628_M7O_1656371902441_626Kb.jpg"
            />
            <IntroCard
                title="비빔비빔비빔비빔"
                text="hihihihi"
                imgUrl="https://cdn.bonif.co.kr/cmdt/20220628_M7O_1656371902441_626Kb.jpg"
            />
            <IntroCard
                title="비빔비빔비빔비빔"
                text="hihihihi"
                imgUrl="https://cdn.bonif.co.kr/cmdt/20220628_M7O_1656371902441_626Kb.jpg"
            />
        </S.CardPack>
    );

    return (
        <S.CardSlider>
            <S.Title>추운 겨울에 집에서 이런 메뉴는 어떠세요?</S.Title>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
            >
                <SwiperSlide>
                    <CardPack />
                </SwiperSlide>
                <SwiperSlide>
                    <CardPack />
                </SwiperSlide>
                <SwiperSlide>
                    <CardPack />
                </SwiperSlide>
                <SwiperSlide>
                    <CardPack />
                </SwiperSlide>
                <SwiperSlide>
                    <CardPack />
                </SwiperSlide>
            </Swiper>
        </S.CardSlider>
    );
};

export default CardSlider;
