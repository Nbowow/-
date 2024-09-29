import styled from "styled-components";

export const UserProfile = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
    width: 80%;
`;

export const ProfileImage = styled.div`
    width: fit-content;
`;

export const UserStat = styled.div`
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 60%;
    width: 600px;
    box-sizing: border-box;
    gap: 12px;

    padding-left: 46px;
    padding-right: 46px;
    padding-bottom: 46px;
    margin-bottom: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.light};
    font-size: ${({ theme }) => theme.fontSize.subText};

    .nickname {
        font-family: "SUITSemiBold";
        font-size: ${({ theme }) => theme.fontSize.h3};
    }

    .discription {
        font-family: "SUITRegular";
        font-size: ${({ theme }) => theme.fontSize.text};
        line-height: 19px;
    }
`;

export const StatWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

export const Stat = styled.div`
    display: flex;
    gap: 6px;

    .stat {
        font-family: "SUITSemiBold";
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: center;
`;
