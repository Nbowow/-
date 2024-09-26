import styled from "styled-components";

export const ProfileText = styled.div`
    width: 51.25rem;
    display: flex;
    flex-direction: column;
    margin: 3.125rem 5rem 0 4.625rem;
    gap: 0.75rem;
    padding: 2.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.lighter};
`;

export const NickName = styled.div`
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

export const Description = styled.p`
    font-family: "SUITRegular";
    height: 4.063rem;
    font-size: ${({ theme }) => theme.fontSize.h4};
    line-height: 1.375rem;
    overflow: hidden;
`;

export const Stat = styled.div`
    display: flex;
    gap: 1.25rem;

    div {
        font-family: "SUITRegular";
        font-size: ${({ theme }) => theme.fontSize.text};
        display: flex;
        gap: 0.5rem;
    }

    .bold {
        font-family: "SUITSemibold";
    }
`;

export const ProfileButton = styled.div`
    min-width: 6.25rem;
`;
