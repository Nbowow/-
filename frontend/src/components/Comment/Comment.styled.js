import styled from "styled-components";
import UserSvg from "../../assets/icons/User.svg";
import {
    IconStyle,
    flexAlignEndStyle,
    flexAlignStartStyle,
    flexStartStyle,
} from "../../styles/common";
export const UserIcon = styled(UserSvg)`
    ${IconStyle}
`;
export const CommentsWrapper = styled.div``;
export const CommentWrapper = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    margin-bottom: 0.5rem;
`;
export const Info = styled.div`
    ${flexStartStyle}
    margin-bottom: 0.5rem;
`;
export const Text = styled.div`
    margin: 0.7rem 0rem;
`;
export const Date = styled.p`
    color: ${({ theme }) => theme.color.gray.dark};
`;
export const ReplyButton = styled.button`
    margin-left: 0.5rem;
    border: none;
    background-color: white;
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const UserImg = styled.img`
    ${IconStyle}
`;
export const UserName = styled.p`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-left: 0.5rem;
`;
export const User = styled.div`
    ${flexStartStyle}
`;

export const ReplyWrapper = styled.div`
    margin-left: 2rem;
`;

export const SubmitButton = styled.button`
    border: ${({ theme }) => theme.color.point.green};
    color: ${({ theme }) => theme.color.point.lightGreen};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    background-color: ${({ theme }) => theme.color.point.green};

    margin-top: 0.5rem;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
`;
export const TextAreaBox = styled.textarea`
    font-family: ${({ theme }) => theme.fontWeight.regular};
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border: 1px solid ${({ theme }) => theme.color.gray.lighter};

    width: 100%;
    height: 4rem;

    padding: 0.5rem;
    border-radius: 0.3rem;
    outline: none;
`;

export const TextAreaWrapper = styled.div`
    ${flexAlignEndStyle}
    flex-direction: column;
`;
