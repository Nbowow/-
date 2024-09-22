import styled from "styled-components";

import InactiveHeartIcon from "../assets/toggleIcon/heart_inactive.svg";
import ActiveHeartIcon from "../assets/toggleIcon/heart_active.svg";
import InactiveBookmarkIcon from "../assets/toggleIcon/bookmark_inactive.svg";
import ActiveBookmarkIcon from "../assets/toggleIcon/bookmark_active.svg";
import CommentIcon from "../assets/toggleIcon/comment.svg";

const Icon = styled(({ icon: IconComponent, size, ...props }) => (
    <IconComponent {...props} />
))`
    width: ${({ size }) => size || "24px"};
    height: ${({ size }) => size || "24px"};
`;

export const ActiveHeartToggle = (props) => (
    <Icon icon={ActiveHeartIcon} {...props} />
);
export const InactiveHeartToggle = (props) => (
    <Icon icon={InactiveHeartIcon} {...props} />
);
export const ActiveBookmarkToggle = (props) => (
    <Icon icon={ActiveBookmarkIcon} {...props} />
);
export const InactiveBookmarkToggle = (props) => (
    <Icon icon={InactiveBookmarkIcon} {...props} />
);
export const CommentButton = (props) => <Icon icon={CommentIcon} {...props} />;
