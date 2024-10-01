import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../../styles/common";

export const ChartWrapper = styled.div`
    width: 80%;
`;
export const TagWrapper = styled.div`
    ${flexStartStyle}
`;
export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    ${flexCenterStyle}
    flex-direction: column;
`;
