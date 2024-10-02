import { useMemo } from "react";
import PropTypes from "prop-types";
import { useIngredientColumn } from "../../Table/TableColumn";
import Table from "../../Table/Table";
import * as S from "./LikeIngredient.styled";
const IngredientLike = ({ ingredients, onClick }) => {
    const columns = useIngredientColumn();
    const tableData = useMemo(() => ingredients, [ingredients]);

    return (
        <S.TableWrapper>
            <Table data={tableData} columns={columns} onClick={onClick} />
        </S.TableWrapper>
    );
};

IngredientLike.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default IngredientLike;
