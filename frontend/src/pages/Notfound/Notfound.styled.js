import CryingIcon from "../../assets/icons/crying.svg";
import styled from "styled-components";

export const Notfound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;

    gap: 32px;
`;

export const IconContainer = styled.div`
    font-family: "TossFace";
    font-size: 205px;
`;

export const Icon = styled(CryingIcon)`
    width: 204px;
`;

export const ErrorCode = styled.div`
    text-align: center;
    font-family: "SUITHeavy";
    color: #56804a;
    font-size: 34px;
`;

export const Title = styled.div`
    text-align: center;
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h3};
    line-height: 32px;
`;

export const Text = styled.div`
    text-align: center;
    font-family: "SUITRegular";
    font-size: ${({ theme }) => theme.fontSize.text};
    line-height: 24px;
    color: ${({ theme }) => theme.color.gray.dark};
`;
