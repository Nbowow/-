import styled from "styled-components";
import UserSvg from "../../assets/icons/User.svg";
export const UserIcon = styled(UserSvg)`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`;
export const CommentsWrapper = styled.div``;
export const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 0.5rem;
`;
export const Info = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`;
export const UserName = styled.p`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-left: 0.5rem;
`;
export const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
`;

export const ReplyWrapper = styled.div`
    margin-left: 2rem;
`;

export const SubmitButton = styled.button`
    margin-top: 0.5rem;
    padding: 0.2rem 1rem;
    border: ${({ theme }) => theme.color.point.green};
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.color.point.lightGreen};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    background-color: ${({ theme }) => theme.color.point.green};
`;
export const TextAreaBox = styled.textarea`
    padding: 0.5rem;
    font-family: ${({ theme }) => theme.fontWeight.regular};
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border: 1px solid ${({ theme }) => theme.color.gray.lighter};
    border-radius: 0.3rem;
    width: 100%;
    outline: none;
    height: 4rem;
`;

export const TextAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;
