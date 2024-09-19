import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 40px auto;
    padding: 30px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
`;

const UploadSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    text-align: left;
    margin-bottom: 20px;
    font-size: 24px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
`;

const SelectField = styled.select`
    width: 48%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImageUploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    background-color: #fafafa;
    width: 300px;
    height: 300px;
    cursor: pointer;
    position: relative;
    margin: 20px 0;
`;

const ImagePreview = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
    font-size: 16px;
`;

const RecipeForm = () => {
    const [recipeName, setRecipeName] = useState("");
    const [recipeIntro, setRecipeIntro] = useState("");
    const [recipeImage, setRecipeImage] = useState("");
    const [recipeCategory, setRecipeCategory] = useState("");
    const [recipeServings, setRecipeServings] = useState("");
    const [recipeTime, setRecipeTime] = useState("");
    const [recipeLevel, setRecipeLevel] = useState("");

    const handleNameChange = (e) => setRecipeName(e.target.value);
    const handleIntroChange = (e) => setRecipeIntro(e.target.value);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setRecipeImage(file);
    };
    const handleCategoryChange = (e) => setRecipeCategory(e.target.value);
    const handleServingsChange = (e) => setRecipeServings(e.target.value);
    const handleTimeChange = (e) => setRecipeTime(e.target.value);
    const handleLevelChange = (e) => setRecipeLevel(e.target.value);
    const handleImageRemove = () => setRecipeImage(null);

    return (
        <Container>
            <FormSection>
                <Title>레시피 등록</Title>
                <p>레시피명</p>
                <InputField
                    type="text"
                    placeholder="레시피명"
                    value={recipeName}
                    onChange={handleNameChange}
                />
                <p>요리소개</p>
                <TextArea
                    placeholder="요리소개"
                    value={recipeIntro}
                    onChange={handleIntroChange}
                />
                <Row>
                    <SelectField
                        value={recipeCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">종류</option>
                        <option value="양식">양식</option>
                        <option value="한식">한식</option>
                        {/* Additional options */}
                    </SelectField>
                    <SelectField
                        value={recipeCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">재료</option>
                        <option value="고기">고기</option>
                        <option value="채소">채소</option>
                        {/* Additional options */}
                    </SelectField>
                </Row>
                <Row>
                    <SelectField
                        value={recipeCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">상황</option>
                        <option value="간식">간식</option>
                        <option value="식사">식사</option>
                        {/* Additional options */}
                    </SelectField>
                    <SelectField
                        value={recipeCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">방법</option>
                        <option value="볶기">볶기</option>
                        <option value="굽기">굽기</option>
                        {/* Additional options */}
                    </SelectField>
                </Row>
                <Row>
                    <SelectField
                        value={recipeServings}
                        onChange={handleServingsChange}
                    >
                        <option value="">인분</option>
                        {/* Add servings options */}
                    </SelectField>
                    <SelectField
                        value={recipeLevel}
                        onChange={handleLevelChange}
                    >
                        <option value="">난이도</option>
                        {/* Add difficulty options */}
                    </SelectField>
                </Row>
                <SelectField value={recipeTime} onChange={handleTimeChange}>
                    <option value="">시간</option>
                    {/* Add time options */}
                </SelectField>
            </FormSection>
            <UploadSection>
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
                            <span>대표사진 등록</span>
                        </>
                    )}
                </ImageUploadButton>
            </UploadSection>
        </Container>
    );
};

export default RecipeForm;
