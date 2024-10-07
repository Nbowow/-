import CardToggleList from "../../CardList/CardToggleList";
import * as S from "./AllergyListForm.styled";
import { fetchAllergyList } from "../../../api/userApi";
import { useQuery } from "@tanstack/react-query";

const AllergyListForm = () => {
    const { data: allergyList, isLoading } = useQuery({
        queryKey: ["allergyList"],
        queryFn: fetchAllergyList,
        staleTime: 1000 * 60 * 60 * 3,
    });

    if (isLoading) return <div></div>;

    return (
        <S.AllergyListForm>
            <CardToggleList data={allergyList} />
        </S.AllergyListForm>
    );
};

export default AllergyListForm;
