import styled from "styled-components";
import UserSvg from "../../../assets/icons/user.svg";

export const DefaultIcon = styled(UserSvg)`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    color: ${({ theme }) => theme.color.gray.darker};

    border-radius: 50%;
    fill: currentColor;
`;

export const ProfileImageIcon = styled.img`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
`;
