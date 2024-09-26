import { useState } from "react";
import {
    Container,
    Title,
    Form,
    InputGroup,
    InputGroup2,
    InputGroup3,
    InputGroup4,
    InputGroup5,
    Label,
    Input,
    TextArea,
    Select,
    CategoryGroup,
    ImageUploadButton,
    ImagePreview,
    BottomRow,
    CloseButton,
    ButtonContainer,
    Text,
} from "./RecipeForm.styeld"; // 스타일드 컴포넌트 임포트

const RecipeForm = () => {
    const [recipeData, setRecipeData] = useState({
        name: "",
        description: "",
        category1: "",
        category2: "",
        category3: "",
        category4: "",
        servings: "",
        difficulty: "",
        time: "",
    });
    const [recipeImage, setRecipeImage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setRecipeImage(file);
    };

    const handleImageRemove = () => setRecipeImage(null);

    return (
        <Container>
            <Form>
                <Title>레시피 등록</Title>

                {/* 레시피명 입력 필드 */}
                <InputGroup>
                    <Label>레시피명</Label>
                    <Input
                        type="text"
                        name="name"
                        value={recipeData.name}
                        onChange={handleChange}
                    />
                </InputGroup>

                {/* 대표사진 등록 섹션 */}
                <InputGroup3>
                    <ImageUploadButton>
                        {recipeImage ? (
                            <>
                                <ImagePreview
                                    src={URL.createObjectURL(recipeImage)}
                                    alt="preview"
                                />
                                <CloseButton onClick={handleImageRemove}>
                                    X
                                </CloseButton>
                            </>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                                <ButtonContainer>
                                    <img src="/src/img/Vector.png" alt="" />
                                    <Text>대표사진 등록</Text>
                                </ButtonContainer>
                            </>
                        )}
                    </ImageUploadButton>
                </InputGroup3>

                {/* 요리소개 입력 필드 */}
                <InputGroup2>
                    <Label>요리소개</Label>
                    <TextArea
                        name="description"
                        value={recipeData.description}
                        onChange={handleChange}
                    />
                </InputGroup2>

                {/* 카테고리 선택 필드 */}
                <InputGroup4>
                    <Label>카테고리</Label>
                    <CategoryGroup>
                        <Select
                            name="category1"
                            value={recipeData.category1}
                            onChange={handleChange}
                        >
                            <option value="">종류</option>
                            <option value="양식">양식</option>
                            <option value="한식">한식</option>
                        </Select>
                        <Select
                            name="category2"
                            value={recipeData.category2}
                            onChange={handleChange}
                        >
                            <option value="">재료</option>
                            <option value="고기">고기</option>
                            <option value="채소">채소</option>
                        </Select>
                        <Select
                            name="category3"
                            value={recipeData.category3}
                            onChange={handleChange}
                        >
                            <option value="">상황</option>
                            <option value="간식">간식</option>
                            <option value="식사">식사</option>
                        </Select>
                        <Select
                            name="category4"
                            value={recipeData.category4}
                            onChange={handleChange}
                        >
                            <option value="">방법</option>
                            <option value="볶기">볶기</option>
                            <option value="굽기">굽기</option>
                        </Select>
                    </CategoryGroup>
                </InputGroup4>

                {/* 인분, 난이도, 시간 선택 필드 */}
                <BottomRow>
                    <InputGroup5>
                        <Label>인분</Label>
                        <Select
                            name="servings"
                            value={recipeData.servings}
                            onChange={handleChange}
                        >
                            <option value="">인분</option>
                            <option value="1">1인분</option>
                            <option value="2">2인분</option>
                            <option value="3">3인분</option>
                        </Select>
                    </InputGroup5>

                    <InputGroup5>
                        <Label>난이도</Label>
                        <Select
                            name="difficulty"
                            value={recipeData.difficulty}
                            onChange={handleChange}
                        >
                            <option value="">난이도</option>
                            <option value="쉬움">쉬움</option>
                            <option value="보통">보통</option>
                            <option value="어려움">어려움</option>
                        </Select>
                    </InputGroup5>

                    <InputGroup5>
                        <Label>시간</Label>
                        <Select
                            name="time"
                            value={recipeData.time}
                            onChange={handleChange}
                        >
                            <option value="">시간</option>
                            <option value="30분">30분</option>
                            <option value="1시간">1시간</option>
                            <option value="1시간 30분">1시간 30분</option>
                        </Select>
                    </InputGroup5>
                </BottomRow>
            </Form>
        </Container>
    );
};

export default RecipeForm;
