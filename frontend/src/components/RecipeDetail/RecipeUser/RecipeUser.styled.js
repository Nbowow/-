import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const UserContainer = styled.div`
    ${flexCenterStyle}
`;

export const UserDetails = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const UserInfo = styled.div`
    ${flexCenterStyle}
    margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const UserFollowSection = styled.div`
    ${flexStartStyle}
    width: 100%;
`;

export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h6};
    font-family: ${({ theme }) => theme.fontWeight.medium};
`;

export const UserLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray.darker};
    margin-right: ${({ theme }) => theme.spacing.medium};
`;
