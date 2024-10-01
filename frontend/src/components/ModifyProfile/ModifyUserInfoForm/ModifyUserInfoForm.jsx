import Button from "../../Button/Button";
import * as S from "./ModifyUserInfoForm.styled";

const ModifyUserInfoForm = () => {
    return (
        <S.ModifyUserInfoForm>
            <S.InputForm>
                <S.Label>닉네임</S.Label>
                <S.Input />
            </S.InputForm>
            <S.InputForm height="150px">
                <S.Label>한 줄 소개</S.Label>
                <S.TextArea />
            </S.InputForm>
            <Button text="저장" type="small" width="140px" height="38px" />
        </S.ModifyUserInfoForm>
    );
};

export default ModifyUserInfoForm;
