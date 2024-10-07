import { PropTypes } from "prop-types";
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
} from "./RecipeForm.styled";

const CATEGORY_TYPES = {
    TYPE: "종류",
    SITUATION: "상황",
    INGREDIENT: "재료",
    METHOD: "방법",
};

const RecipeForm = ({ recipeData, setRecipeData, categories }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipeData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handleImageRemove = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        setRecipeData((prev) => ({
            ...prev,
            image: null,
        }));
    };

    const handleUploadClick = (e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        document.getElementById("imageInput").click(); // 파일 선택 창 열기
    };

    return (
        <Container>
            <Form>
                <Title>레시피 등록</Title>

                <InputGroup>
                    <Label>레시피명</Label>
                    <Input
                        type="text"
                        name="name"
                        value={recipeData.name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup3>
                    <ImageUploadButton onClick={handleUploadClick}>
                        {recipeData.image ? (
                            <>
                                <ImagePreview
                                    src={URL.createObjectURL(recipeData.image)}
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
                                    id="imageInput"
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

                <InputGroup2>
                    <Label>요리소개</Label>
                    <TextArea
                        name="intro"
                        value={recipeData.intro}
                        onChange={handleChange}
                    />
                </InputGroup2>

                <InputGroup4>
                    <Label>카테고리</Label>
                    <CategoryGroup>
                        <Select
                            name="type"
                            value={recipeData.type}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.TYPE}</option>
                            {categories[CATEGORY_TYPES.TYPE].map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="ingredients"
                            value={recipeData.ingredients}
                            onChange={handleChange}
                        >
                            <option value="">
                                {CATEGORY_TYPES.INGREDIENT}
                            </option>
                            {categories[CATEGORY_TYPES.INGREDIENT].map(
                                (category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ),
                            )}
                        </Select>
                        <Select
                            name="situation"
                            value={recipeData.situation}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.SITUATION}</option>
                            {categories[CATEGORY_TYPES.SITUATION].map(
                                (category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ),
                            )}
                        </Select>
                        <Select
                            name="method"
                            value={recipeData.method}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.METHOD}</option>
                            {categories[CATEGORY_TYPES.METHOD].map(
                                (category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ),
                            )}
                        </Select>
                    </CategoryGroup>
                </InputGroup4>

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
                            <option value="4">4인분</option>
                            <option value="5">5인분</option>
                            <option value="6">6인분</option>
                        </Select>
                    </InputGroup5>

                    <InputGroup5>
                        <Label>난이도</Label>
                        <Select
                            name="level"
                            value={recipeData.level}
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
                            <option value="15">15분</option>
                            <option value="30">30분</option>
                            <option value="45">45분</option>
                            <option value="60">1시간</option>
                            <option value="90">1시간 30분</option>
                            <option value="120">2시간</option>
                        </Select>
                    </InputGroup5>
                </BottomRow>
            </Form>
        </Container>
    );
};

RecipeForm.propTypes = {
    recipeData: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(File),
        ]),
        intro: PropTypes.string,
        type: PropTypes.string,
        ingredients: PropTypes.string,
        situation: PropTypes.string,
        method: PropTypes.string,
        servings: PropTypes.string,
        level: PropTypes.string,
        time: PropTypes.string,
    }).isRequired,
    setRecipeData: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
};

export default RecipeForm;
