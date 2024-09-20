import * as S from "./IntroCard.styled";

// TODO: 테스트용 이미지 삭제
const testImageURL =
    "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/841/5f8e4c9d182e64548f58cc628427754b_res.jpeg";

const IntroCard = () => {
    return (
        <S.IntroCard>
            <S.Thumnail src={testImageURL}></S.Thumnail>
        </S.IntroCard>
    );
};

export default IntroCard;
