import PropTypes from "prop-types";

const FollowingModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
            <button onClick={onClose}>close</button>
        </div>
    );
};

FollowingModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
};

export default FollowingModal;
