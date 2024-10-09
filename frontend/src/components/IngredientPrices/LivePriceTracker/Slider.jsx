import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import LivePriceTracker from "./LivePriceTracker";
import { useEffect, useState } from "react";
import { getIngredientPriceChange } from "../../../api/ingredientApi";

const Slider = () => {
    const [changePrice, setChangePrice] = useState(null);
    useEffect(() => {
        const fetchPrice = async () => {
            const data = await getIngredientPriceChange();
            setChangePrice(data);
        };
        fetchPrice();
    }, []);

    return (
        <div style={{ height: "21.5rem" }}>
            {changePrice && (
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
                    {changePrice.map((ingredient, index) => (
                        <SwiperSlide key={index} style={{ height: "100%" }}>
                            <LivePriceTracker ingredient={ingredient} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Slider;
