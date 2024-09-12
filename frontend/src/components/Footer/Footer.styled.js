import styled from "styled-components";

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 20px;
    padding: 50px;
    height: fit-content;
    background-color: ${({ theme }) => theme.color.gray.darker};
`;

export const FooterLogo = styled.img`
    width: 101px;
`;

export const Info = styled.div`
    font-family: "SUITRegular";
    color: ${({ theme }) => theme.color.gray.light};
    font-size: ${({ theme }) => theme.fontSize.text};
    padding: 0.17rem;
    line-height: 1.7;
    text-align: center;
`;
