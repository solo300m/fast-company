import PropTypes from "prop-types";
import React from "react";

// import { TableHeader } from "./tableHeader";
// import { TableBody } from "./tableBody";
import { BookMark } from "./bookmark";
import { QualitiesList } from "./qualitiesList";
import { Table } from "./table";

export const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя", order: "asc" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: "profession.name",
            name: "Профессия",
            order: "asc"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз",
            order: "asc"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            order: "asc",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };

    return (
        // <Table>
        //     <TableHeader {...{ onSort, selectedSort, columns }} />
        //     <TableBody {...{ columns, data: users }} />
        // </Table>
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
