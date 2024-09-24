import { useMemo } from "react";
import PropTypes from "prop-types";
import { useIngredientColumn } from "../../Table/TableColumn";
import Table from "../../Table/Table";

const IngredientLike = ({ ingredients }) => {
    const columns = useIngredientColumn();
    const tableData = useMemo(() => ingredients, [ingredients]);

    return (
        <>
            <Table data={tableData} columns={columns} />
        </>
    );
};

IngredientLike.propTypes = {
    ingredients: PropTypes.array.isRequired,
};

export default IngredientLike;
