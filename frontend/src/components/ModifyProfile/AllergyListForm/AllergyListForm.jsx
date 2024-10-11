import CardToggleList from "../../CardList/CardToggleList";
import * as S from "./AllergyListForm.styled";
import { useAllergyList, useUserAllergyList } from "../../../hooks/useAllergy";
import { useAuthStore } from "../../../store/userStore";

const AllergyListForm = () => {
    const { isLoggedIn } = useAuthStore();
    const { data: allergyList, isLoading } = useAllergyList(isLoggedIn);
    const { data: userAllergyList, isLoading: userListIsLoading } =
        useUserAllergyList(isLoggedIn);
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
