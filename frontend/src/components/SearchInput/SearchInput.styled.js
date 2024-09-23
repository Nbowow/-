import styled from "styled-components";

const ContainerBase = styled.div`
    position: relative;
    width: 78.125rem;
    gap: 1.5rem;
    border: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
    border-radius: 6.25rem;
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

export const SearchInput = styled.section`
    width: fit-content;
`;

export const SearchContainer = styled(ContainerBase)`
    height: 6.875rem;
    padding-left: 4.375rem;
    padding-right: 5.25rem;
`;

export const SearchFocusContainer = styled(ContainerBase)`
    height: auto;
    padding: 2rem 4.375rem;
    border-radius: 3.125rem;

    .input {
        display: flex;
        align-items: center;
        flex: 1;
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        font-family: "SUITMedium";
        font-size: ${({ theme }) => theme.fontSize.h3};
        padding: 0.875rem 0 0.875rem 1.5rem;
    }
`;

export const SearchInputForm = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Line = styled.hr`
    width: 71.25rem;
    border: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
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
    pointer-events: none;
    width: 100%;

    .plain {
        font-family: "SUITMedium";
        font-size: ${({ theme }) => theme.fontSize.h3};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

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
