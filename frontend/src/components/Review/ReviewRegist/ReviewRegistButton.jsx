import { useState } from "react";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import ReviewRegist from "./ReviewRegist";
import PropTypes from "prop-types";

const ReviewRegistButton = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                width="6rem"
                height="2rem"
                type="small"
                onClick={onClick}
                text="리뷰 등록하기"
            />

            {isModalOpen && (
                <Modal
                    context={<ReviewRegist id={id} onClose={closeModal} />}
                    onClose={closeModal}
                />
            )}
        </>
    );
};
ReviewRegistButton.propTypes = {
    id: PropTypes.string.isRequired,
};
export default ReviewRegistButton;
