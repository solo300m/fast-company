
import React from "react";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";
import PropType from "prop-types";

export const Table = ({ onSort, selectedSort, columns, data }) => {
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data }} />
        </table>
    );
};
Table.propTypes = {
    onSort: PropType.func.isRequired,
    selectedSort: PropType.object.isRequired,
    columns: PropType.object.isRequired,
    data: PropType.array.isRequired
    // children: PropType.array
};
