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
