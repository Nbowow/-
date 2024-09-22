import styled from "styled-components";

export const IntroCard = styled.div`
    width: 276px;
    height: 359px;
    border-radius: 20px;

    box-sizing: border-box;
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    gap: 18px;

    padding-bottom: 30px;
    cursor: pointer;

    transition:
        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:active {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }

    &:hover {
        transform: translateY(-10px) scale(1.04);
        box-shadow: 0px 0.4rem 1.5rem rgba(0, 0, 0, 0.3);
    }
`;

export const Thumnail = styled.img`
    width: 100%;
    height: 210px;
    object-fit: cover;
    object-position: center;

    flex-shrink: 0;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

export const TextArea = styled.div`
    display: flex;
    padding: 2px 20px 0px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 15px;
    align-self: stretch;
    overflow: hidden;
    user-select: none;
`;

export const Title = styled.div`
    width: 100%;
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h4};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Text = styled.div`
    flex: 1;
    font-family: "SUITRegular";
    line-height: 21px;
    font-size: ${({ theme }) => theme.fontSize.text};
    overflow: hidden;
`;
