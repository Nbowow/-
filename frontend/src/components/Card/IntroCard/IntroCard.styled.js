import styled from "styled-components";

const cardBorderRadius = "1.25rem";

export const IntroCard = styled.div`
    width: 17.25rem;
    height: 22.438rem;
    border-radius: ${cardBorderRadius};

    box-sizing: border-box;
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    gap: 1.125rem;

    padding-bottom: 1.25rem;
    cursor: pointer;

    transition:
        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:active {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }

    &:hover {
        transform: translateY(-0.625rem) scale(1.04);
        box-shadow: 0px 0.4rem 1.5rem rgba(0, 0, 0, 0.3);
    }
`;

export const Thumnail = styled.img`
    width: 100%;
    height: 13.125rem;
    object-fit: cover;
    object-position: center;

    flex-shrink: 0;

    border-top-left-radius: ${cardBorderRadius};
    border-top-right-radius: ${cardBorderRadius};
`;

export const TextArea = styled.div`
    display: flex;
    padding: 0.125rem 1.25rem 0px 1.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.938rem;
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
    height: 4.125rem;
    font-family: "SUITRegular";
    line-height: 1.313rem;
    font-size: ${({ theme }) => theme.fontSize.text};
    overflow: hidden;
`;
