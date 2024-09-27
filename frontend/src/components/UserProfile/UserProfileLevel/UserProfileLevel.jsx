import {
    Container,
    Title,
    CookingIcon,
    ProgressBarContainer,
    ProgressBar,
    LevelInfo,
    Text,
} from "./UserProfileLevel.styled";

const CookingLevel = () => {
    const level = 20;
    const maxLevel = 100;
    const progress = (level / maxLevel) * 100;
    const remainingLevels = maxLevel - level;

    return (
        <Container>
            <Title>
                <CookingIcon>👨‍🍳</CookingIcon>
                요리 레벨
            </Title>
            <Text>맛잘알 요리사</Text>
            <ProgressBarContainer>
                <ProgressBar progress={progress} />
            </ProgressBarContainer>
            <LevelInfo>레벨업까지 {remainingLevels} 남았어요</LevelInfo>
        </Container>
    );
};

export default CookingLevel;
