import styled from "styled-components";
import { flexCenterStyle } from "../../styles/common";

export const TagEmoji = styled.span`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: "TossFace";
`;
export const TagName = styled.span`
    margin-right: 0.5rem;
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.point.lightGreen};
`;
export const TagWrapper = styled.div`
    ${flexCenterStyle}
    font-size: ${({ theme }) => theme.fontSize.text};
    background-color: ${({ theme }) => theme.color.point.green};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    text-align: center;

    padding: 0.3rem 0.6rem;

    inline-size: max-content;
`;
