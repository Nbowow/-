import { useState } from "react";
import styled from "styled-components";

// 아이콘 스타일
const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    width: 1440px;
`;

const IconButton = styled.button`
    background-color: ${(props) => (props.selected ? "#4caf50" : "#e0e0e0")};
    border: none;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #b0e57c;
    }

    svg {
        fill: ${(props) => (props.selected ? "#fff" : "#000")};
        width: 24px;
        height: 24px;
    }
`;

const AllIcon = () => (
    <img src="/src/components/Category/icon/all.png" alt="All" />
);
const MeatIcon = () => (
    <img src="/src/components/Category/icon/meat.png" alt="Meat" />
);
const SeafoodIcon = () => (
    <img src="/src/components/Category/icon/seafood.png" alt="Seafood" />
);
const DietIcon = () => (
    <img src="/src/components/Category/icon/diet.png" alt="Diet" />
);
const VegetableIcon = () => (
    <img src="/src/components/Category/icon/vegetable.png" alt="Vegetable" />
);
const AlcoholIcon = () => (
    <img src="/src/components/Category/icon/alcohol.png" alt="Alcohol" />
);
const SoupIcon = () => (
    <img src="/src/components/Category/icon/soup.png" alt="Soup" />
);
const NoodleIcon = () => (
    <img src="/src/components/Category/icon/noodle.png" alt="Noodle" />
);

// 아이콘 목록을 정의
const icons = [
    { id: 1, component: <AllIcon /> },
    { id: 2, component: <MeatIcon /> },
    { id: 3, component: <SeafoodIcon /> },
    { id: 4, component: <DietIcon /> },
    { id: 5, component: <VegetableIcon /> },
    { id: 6, component: <AlcoholIcon /> },
    { id: 7, component: <SoupIcon /> },
    { id: 8, component: <NoodleIcon /> },
];

const IconSelector = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (id) => {
        setSelectedIcon(id);
    };

    return (
        <IconContainer>
            {icons.map((icon) => (
                <IconButton
                    key={icon.id}
                    selected={selectedIcon === icon.id}
                    onClick={() => handleIconClick(icon.id)}
                >
                    {icon.component}
                </IconButton>
            ))}
        </IconContainer>
    );
};

export default IconSelector;
