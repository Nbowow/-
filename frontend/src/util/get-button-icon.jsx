import styled from "styled-components";

import InactiveHeartIcon from "../assets/toggleIcon/heart_inactive.svg";
import ActiveHeartIcon from "../assets/toggleIcon/heart_active.svg";
import InactiveBookmarkIcon from "../assets/toggleIcon/bookmark_inactive.svg";
import ActiveBookmarkIcon from "../assets/toggleIcon/bookmark_active.svg";

const IconToggle = styled(({ icon: IconComponent, size, ...props }) => (
    <IconComponent {...props} />
))`
    width: ${({ size }) => size || "24px"};
    height: ${({ size }) => size || "24px"};
`;

export const ActiveHeartToggle = (props) => (
    <IconToggle icon={ActiveHeartIcon} {...props} />
);
export const InactiveHeartToggle = (props) => (
    <IconToggle icon={InactiveHeartIcon} {...props} />
);
export const ActiveBookmarkToggle = (props) => (
    <IconToggle icon={ActiveBookmarkIcon} {...props} />
);
export const InactiveBookmarkToggle = (props) => (
    <IconToggle icon={InactiveBookmarkIcon} {...props} />
);
