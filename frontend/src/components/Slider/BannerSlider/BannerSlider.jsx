import * as S from "./BannerSlider.styled";
import Banner from "../../Banner/Banner";

import PizzaImg from "../../../img/pizza.png";
import BibimImg from "../../../img/bibim.png";
import TacoImg from "../../../img/taco.png";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const BannerSlider = () => {
    const banners = [
        {
            subTitle: "쉽게 만드는 홈메이드",
            title: "페퍼로니 피자",
            navLink: "#",
            imgUrl: PizzaImg,
            backgroundColor: "#d42525",
            pointColor: "#f7d860",
        },
        {
            subTitle: "비빔 비빔 ♪ 비트 주세요",
            title: "간단식사 비빔밥",
            navLink: "#",
            imgUrl: BibimImg,
            backgroundColor: "#f7d860",
            pointColor: "#4b8f29",
        },
        {
            subTitle: "집 안에서 세계 일주",
            title: "하드 타코",
            navLink: "#",
            imgUrl: TacoImg,
            backgroundColor: "#4b8f29",
            pointColor: "#d42525",
            fontColor: "#ffec8b",
        },
    ];

    return (
        <S.BannerSlider>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                loop={true}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <Banner key={index} {...banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </S.BannerSlider>
    );
};

export default BannerSlider;
