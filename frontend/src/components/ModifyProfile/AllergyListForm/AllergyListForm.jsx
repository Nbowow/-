import CardToggleList from "../../CardList/CardToggleList";
import * as S from "./AllergyListForm.styled";
import { fetchAllergyList } from "../../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import { fetchUserAllergyList } from "../../../api/userApi";

const AllergyListForm = () => {
    const { data: allergyList, isLoading } = useQuery({
        queryKey: ["allergyList"],
        queryFn: fetchAllergyList,
        staleTime: 1000 * 60 * 60 * 3,
    });

    const { data: userAllergyList, isLoading: userListIsLoading } = useQuery({
        queryKey: ["userAllergyList"],
        queryFn: fetchUserAllergyList,
    });

    if (isLoading || userListIsLoading) return <div></div>;

    return (
        <S.AllergyListForm>
            <CardToggleList
                data={allergyList}
                userAllergyList={userAllergyList.map(
                    (item) => item.commonCodeNum,
                )}
            />
        </S.AllergyListForm>
    );
};

export default AllergyListForm;
