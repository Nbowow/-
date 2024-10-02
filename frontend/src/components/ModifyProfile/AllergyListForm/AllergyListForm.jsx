import CardToggleList from "../../CardList/CardToggleList";
import * as S from "./AllergyListForm.styled";

const AllergyListForm = () => {
    const allergyList = [
        { code: "A_0001", text: "알류" },
        { code: "A_0002", text: "우유" },
        { code: "A_0003", text: "메밀" },
        { code: "A_0004", text: "땅콩" },
        { code: "A_0005", text: "대두" },
        { code: "A_0006", text: "밀" },
        { code: "A_0007", text: "잣" },
        { code: "A_0008", text: "호두" },
        { code: "A_0009", text: "게" },
        { code: "A_0010", text: "새우" },
        { code: "A_0011", text: "오징어" },
        { code: "A_0012", text: "고등어" },
        { code: "A_0013", text: "조개류" },
        { code: "A_0014", text: "복숭아" },
        { code: "A_0015", text: "토마토" },
        { code: "A_0016", text: "닭고기" },
        { code: "A_0017", text: "돼지고기" },
        { code: "A_0018", text: "쇠고기" },
        { code: "A_0019", text: "아황산류" },
    ];

    return (
        <S.AllergyListForm>
            <CardToggleList data={allergyList} />
        </S.AllergyListForm>
    );
};

export default AllergyListForm;
