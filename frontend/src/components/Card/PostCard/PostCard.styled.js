import styled from "styled-components";

const cardBorderRadius = "10px";

export const PostCard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 322px;
    box-sizing: border-box;
    padding-bottom: 28px;
`;

export const Thumnail = styled.img`
    width: 100%;
    height: 13.125rem;
    object-fit: cover;
    object-position: center;

    flex-shrink: 0;

    border-radius: ${cardBorderRadius};
`;

export const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-left: 12px;
    padding-right: 12px;
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
    height: 63px;
    font-family: "SUITRegular";
    line-height: 21px;
    font-size: ${({ theme }) => theme.fontSize.text};
    overflow: hidden;
`;
