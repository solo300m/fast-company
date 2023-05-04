import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [status, setStatus] = useState();
    useEffect(() => {
        setStatus(selectedSort);
    }, [selectedSort]);

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            // setStatus(item);
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {status && columns[column].path === status.path ? (status.order === "asc" ? <span><i className="bi bi-caret-down-fill"></i></span> : <span><i className="bi bi-caret-up-fill"></i></span>) : <span></span>}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
