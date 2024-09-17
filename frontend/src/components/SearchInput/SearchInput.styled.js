import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    width: 78.125rem;
    height: 6.875rem;
    gap: 1.5rem;

    border: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
    border-radius: 6.25rem;

    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);

    padding-left: 4.375rem;

    display: flex;
    align-items: center;
`;

export const Icon = styled.div`
    font-family: "TossFace";
    font-size: 1.875rem;
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.313rem;

    .bold {
        font-family: "SUITSemiBold";
        font-size: ${({ theme }) => theme.fontSize.h3};
    }

    .gray {
        font-family: "SUITMedium";
        font-size: ${({ theme }) => theme.fontSize.h4};
        color: ${({ theme }) => theme.color.gray.light};
    }
`;
