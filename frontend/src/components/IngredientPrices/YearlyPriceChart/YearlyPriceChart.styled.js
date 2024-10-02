import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../../styles/common";

export const ChartWrapper = styled.div`
    width: 80%;
`;
export const TagWrapper = styled.div`
    width: 80%;
    margin-bottom: 2rem;
    ${flexStartStyle}
`;
export const Wrapper = styled.div`
    width: 60%;
    ${flexCenterStyle}
    padding: 1rem 0;
    flex-direction: column;
`;
