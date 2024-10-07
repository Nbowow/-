/* eslint-disable react/prop-types */
import {
    Container,
    Title,
    GroupContainer,
    InputField,
    GroupLabel,
    AddButton,
    TitleContainer,
    SubTitle,
    InputContainer,
    AddGroupButton,
    ButtonContainer,
} from "./MaterialForm.styled";

const MaterialForm = ({ materialGroups, setMaterialGroups }) => {
    const handleChange = (groupIndex, materialIndex, field, value) => {
        const newMaterialGroups = [...materialGroups];
        if (field === "groupName") {
            newMaterialGroups[groupIndex].name = value;
        } else {
            newMaterialGroups[groupIndex].materials[materialIndex][field] =
                value;
        }
        setMaterialGroups(newMaterialGroups);
    };

    const handleAddMaterial = (groupIndex) => {
        const newMaterialGroups = [...materialGroups];
        newMaterialGroups[groupIndex].materials.push({
            name: "",
            amount: "",
            unit: "",
        });
        setMaterialGroups(newMaterialGroups);
    };

    const handleAddGroup = () => {
        setMaterialGroups([
            ...materialGroups,
            { name: "재료", materials: [{ name: "", amount: "", unit: "" }] },
        ]);
    };

    return (
        <Container>
            <TitleContainer>
                <Title>재료 정보</Title>
                <SubTitle>레시피에 필요한 재료들을 입력해주세요</SubTitle>
            </TitleContainer>
            <form>
                {materialGroups.map((group, groupIndex) => (
                    <GroupContainer key={groupIndex}>
                        <GroupLabel
                            type="text"
                            placeholder="재료"
                            value={group.name}
                            onChange={(e) =>
                                handleChange(
                                    groupIndex,
                                    null,
                                    "groupName",
                                    e.target.value,
                                )
                            }
                        />
                        {group.materials.map((material, materialIndex) => (
                            <InputContainer key={materialIndex}>
                                <InputField
                                    type="text"
                                    placeholder="재료명"
                                    value={material.name}
                                    onChange={(e) =>
                                        handleChange(
                                            groupIndex,
                                            materialIndex,
                                            "name",
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputField
                                    type="text"
                                    placeholder="수량"
                                    value={material.amount}
                                    onChange={(e) =>
                                        handleChange(
                                            groupIndex,
                                            materialIndex,
                                            "amount",
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputField
                                    type="text"
                                    placeholder="단위"
                                    value={material.unit}
                                    onChange={(e) =>
                                        handleChange(
                                            groupIndex,
                                            materialIndex,
                                            "unit",
                                            e.target.value,
                                        )
                                    }
                                />
                            </InputContainer>
                        ))}
                        <ButtonContainer>
                            <AddButton
                                type="button"
                                onClick={() => handleAddMaterial(groupIndex)}
                            >
                                재료 추가
                            </AddButton>
                        </ButtonContainer>
                    </GroupContainer>
                ))}
                <ButtonContainer>
                    <AddGroupButton type="button" onClick={handleAddGroup}>
                        묶음 추가
                    </AddGroupButton>
                </ButtonContainer>
            </form>
        </Container>
    );
};

export default MaterialForm;
