import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import LivePriceTracker from "./LivePriceTracker";

const mock = {
    name: "양파",
    day: "어제",
    price: 1000,
    img: "https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_1280.jpg",
};
const Slider = () => {
    return (
        <div style={{ height: "17rem" }}>
            <Swiper
                spaceBetween={10}
                centeredSlides={false}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                speed={5000}
                loop={true}
                direction="vertical"
                slidesPerView={3}
                modules={[Autoplay, Pagination, Navigation, Scrollbar]}
                className="mySwiper"
                style={{ height: "100%", width: "100%" }}
            >
                <SwiperSlide style={{ height: "100%" }}>
                    <LivePriceTracker ingredient={mock} />
                </SwiperSlide>
                <SwiperSlide style={{ height: "100%" }}>
                    <LivePriceTracker ingredient={mock} />
                </SwiperSlide>
                <SwiperSlide style={{ height: "100%" }}>
                    <LivePriceTracker ingredient={mock} />
                </SwiperSlide>
                <SwiperSlide style={{ height: "100%" }}>
                    <LivePriceTracker ingredient={mock} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
