import * as S from "./UserProfileLevel.styled";
import PropTypes from "prop-types";
import { level } from "../../../constants/level";

const CookingLevel = ({ score }) => {
    const maxScore = 100;
    const userLevel =
        score / maxScore >= level.length
            ? level.length - 1
            : Math.floor(score / maxScore);
    const remainingScore = score % maxScore;
    const progress = (remainingScore / maxScore) * 100;

    return (
        <S.Container>
            <S.Title>
                <S.CookingIcon>👨‍🍳</S.CookingIcon>
                요리 레벨
            </S.Title>
            <S.ProgressBarWrapper>
                <S.Text>{level[userLevel]}</S.Text>
                <S.ProgressBarContainer>
                    <S.ProgressBar progress={progress} />
                </S.ProgressBarContainer>
                <S.LevelInfo>
                    레벨업까지 {maxScore - remainingScore} 남았어요
                </S.LevelInfo>
            </S.ProgressBarWrapper>
        </S.Container>
    );
};

CookingLevel.propTypes = {
    score: PropTypes.number,
};

export default CookingLevel;
