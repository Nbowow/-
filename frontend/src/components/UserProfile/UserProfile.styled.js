import styled from "styled-components";

export const UserProfile = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 50%;
`;

export const ProfileImage = styled.div``;

export const UserStat = styled.div`
    display: flex;
    justify-content: space-between;

    width: 40%;
`;

export const TextWrapper = styled.div`
    .nickname {
        font-family: "SUITSemiBold";
        font-size: ${({ theme }) => theme.fontSize.h3};
    }

    .discription {
        font-family: "SUITRegular";
        font-size: ${({ theme }) => theme.fontSize.text};
    }
`;
