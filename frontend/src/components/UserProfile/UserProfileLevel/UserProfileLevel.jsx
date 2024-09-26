import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 15px;
`;

const CookingIcon = styled.span`
    font-size: 24px;
    margin-right: 10px;
`;

const ProgressBarContainer = styled.div`
    background-color: #f0f0f0;
    border-radius: 10px;
    height: 10px;
    width: 100%;
`;

const ProgressBar = styled.div`
    background-color: #ffd700;
    border-radius: 10px;
    height: 100%;
    width: ${(props) => props.progress}%;
`;

const LevelInfo = styled.p`
    text-align: right;
    font-size: 12px;
    color: #888;
    margin-top: 5px;
`;

const Text = styled.div`
    font-size: 18px;
    color: #333;
    padding: 8px;
`;

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
