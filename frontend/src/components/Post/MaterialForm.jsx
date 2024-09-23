import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const GroupContainer = styled.div`
    margin-bottom: 20px;
`;

const InputField = styled.input`
    width: calc(33.33% - 10px);
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const GroupLabel = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const AddButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background-color: #45a049;
    }
`;

const MaterialForm = () => {
    const [materialGroups, setMaterialGroups] = useState([
        { materials: [{ name: "", amount: "", unit: "" }] },
    ]);

    const handleChange = (groupIndex, materialIndex, field, value) => {
        const newMaterialGroups = [...materialGroups];
        newMaterialGroups[groupIndex].materials[materialIndex][field] = value;
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
            { materials: [{ name: "", amount: "", unit: "" }] },
        ]);
    };

    return (
        <Container>
            <Title>재료 정보</Title>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                레시피에 필요한 재료들을 입력해주세요
            </p>
            <form>
                {materialGroups.map((group, groupIndex) => (
                    <GroupContainer key={groupIndex}>
                        <GroupLabel type="text" placeholder="음식" />
                        {group.materials.map((material, materialIndex) => (
                            <div
                                key={materialIndex}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                }}
                            >
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
                            </div>
                        ))}
                        <AddButton
                            type="button"
                            onClick={() => handleAddMaterial(groupIndex)}
                        >
                            재료 추가
                        </AddButton>
                    </GroupContainer>
                ))}
                <AddButton type="button" onClick={handleAddGroup}>
                    묶음 추가
                </AddButton>
            </form>
        </Container>
    );
};

export default MaterialForm;
