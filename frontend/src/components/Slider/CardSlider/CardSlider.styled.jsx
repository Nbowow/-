import styled from "styled-components";

export const CardSlider = styled.div`
    position: relative;
    padding-top: 100px;
    padding-bottom: 70px;

    .swiper-button-prev {
        color: black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    .swiper-button-next {
        color: black;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    .swiper-pagination-bullet-active {
        background-color: black;
    }
    .swiper-wrapper {
        transition-timing-function: linear;
    }
`;

export const Title = styled.div`
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h3};
    margin-left: 70px;
    margin-bottom: 12px;
`;

export const CardPack = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    padding-bottom: 20px;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 76%;
        background-color: ${({ theme }) => theme.color.point.green};
        z-index: -1;
    }
`;
