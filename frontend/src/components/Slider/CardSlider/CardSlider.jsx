import IntroCard from "../../Card/IntroCard/IntroCard";
import * as S from "./CardSlider.styled";
import PropTypes from "prop-types";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CardSlider = ({ color, data }) => {
    const chunkArray = (array, chunckSize) => {
        const results = [];
        for (let i = 0; i < array.length; i += chunckSize) {
            results.push(array.slice(i, i + chunckSize));
        }
        return results;
    };

    const chunkedData = chunkArray(data, 4);

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
                {chunkedData.map((chunk, index) => (
                    <SwiperSlide key={index}>
                        <S.CardPack color={color}>
                            {chunk.map((item, itemIndex) => (
                                <IntroCard
                                    key={itemIndex}
                                    title={item.title}
                                    text={item.text}
                                    imgUrl={item.imgUrl}
                                />
                            ))}
                        </S.CardPack>
                    </SwiperSlide>
                ))}
            </Swiper>
        </S.CardSlider>
    );
};

CardSlider.propTypes = {
    color: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            imgUrl: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CardSlider;
