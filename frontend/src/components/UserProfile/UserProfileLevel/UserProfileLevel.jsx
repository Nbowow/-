import * as S from "./UserProfileLevel.styled";

const CookingLevel = () => {
    const level = 20;
    const maxLevel = 100;
    const progress = (level / maxLevel) * 100;
    const remainingLevels = maxLevel - level;

    return (
        <S.Container>
            <S.Title>
                <S.CookingIcon>👨‍🍳</S.CookingIcon>
                요리 레벨
            </S.Title>
            <S.ProgressBarWrapper>
                <S.Text>맛잘알 요리사</S.Text>
                <S.ProgressBarContainer>
                    <S.ProgressBar progress={progress} />
                </S.ProgressBarContainer>
                <S.LevelInfo>레벨업까지 {remainingLevels} 남았어요</S.LevelInfo>
            </S.ProgressBarWrapper>
        </S.Container>
    );
};

export default CookingLevel;
