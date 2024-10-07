import { useState } from "react";
import PropTypes from "prop-types";
import { Rating } from "react-simple-star-rating";
import * as S from "./ReviewRegisterModal.styled";

const ReviewRegisterModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [image, setImage] = useState(null);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        // 리뷰 제출 로직을 여기에 추가
        // eslint-disable-next-line no-console
        console.log("리뷰 제출:", { rating, reviewContent, image });
        // 모달 닫기
        onClose();
    };

    return (
        isOpen && (
            <S.ModalOverlay>
                <S.ModalContainer>
                    <S.ModalTitle>리뷰 등록</S.ModalTitle>
                    <S.ImageUploadContainer>
                        {image ? (
                            <S.ImagePreview src={image} alt="preview" />
                        ) : (
                            <S.ImageUploadArea>
                                <S.UploadIcon>+</S.UploadIcon>
                                <S.UploadText>
                                    조리한 사진을 등록해 주세요
                                </S.UploadText>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                    id="imageInput"
                                />
                                <S.UploadButton
                                    onClick={() =>
                                        document
                                            .getElementById("imageInput")
                                            .click()
                                    }
                                >
                                    사진 선택
                                </S.UploadButton>
                            </S.ImageUploadArea>
                        )}
                    </S.ImageUploadContainer>

                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        size={25}
                        allowFraction
                    />

                    <S.ReviewInput
                        placeholder="리뷰를 입력해 주세요"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />

                    <S.ButtonContainer>
                        <S.SubmitButton onClick={handleSubmit}>
                            등록
                        </S.SubmitButton>
                        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
                    </S.ButtonContainer>
                </S.ModalContainer>
            </S.ModalOverlay>
        )
    );
};

ReviewRegisterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ReviewRegisterModal;
