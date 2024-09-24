import styled from "styled-components";

export const UserProfile = styled.div`
    width: 100%;
    height: fit-content;
    margin: 0 auto;
    border-radius: 0.75rem;
    overflow: hidden;
`;

export const BackgroundImage = styled.div`
    width: 100%;
    height: 18.05rem;
    background-image: url(${({ $backgroundImgUrl }) => $backgroundImgUrl});
    background-size: cover;
    background-position: center;
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.1);
`;

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: -11.25rem;
    padding: 7.5rem;
`;

export const ProfileImage = styled.div`
    margin: 0 auto;
`;

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
