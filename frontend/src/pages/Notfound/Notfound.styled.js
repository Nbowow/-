import CryingIcon from "../../assets/icons/crying.svg";
import styled from "styled-components";

export const Notfound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    gap: 3.4rem;
`;

export const Icon = styled(CryingIcon)`
    width: 12.75rem;
`;

export const ErrorCode = styled.div`
    text-align: center;
    font-family: "SUITHeavy";
    color: #56804a;
    font-size: 44px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
