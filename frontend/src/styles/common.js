import { css } from "styled-components";

export const flexCenterStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const flexBetweenStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const flexAroundStyle = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const flexStartStyle = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const IconStyle = css`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;
