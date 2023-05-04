import React, { useState, useEffect } from "react";
import { Pagination } from "./pagination";
import { GroupList } from "./groupList";
import { SearchStatus } from "./searchStatus";
import PropTypes from "prop-types";
import API from "../api/API";
import { UsersTable } from "./usersTable";
import _ from "lodash";

export const Users = ({ users, ...rest }) => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(); // (API.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [usersCut, setUsersCut] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    useEffect(() => {
        /* API.professions.fetchAll().then((data) =>
            setProfessions(
                Object.assign(data, {
                    allProfession: { name: "Все пофессии" }
                })
            )
        ); */
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []); // для единичного вызова useEffect вторым параметром нужно поставить пустой массив [], если массив не пустой, тогда useEffect наблюдает за параметром из данного массива

    useEffect(() => {
        setCurrentPage(1);

        API.users
            .fetchUsersByProfession(selectedProf)
            .then((data) => setUsersCut(data));
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const paginate = (items, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize;
        return [...items].splice(startIndex, pageSize);
    };

    /* const filteredUsers = selectedProf // && selectedProf._id
        ? users.filter((user) => user.profession === selectedProf)
        : users; */
    const filteredUsers = selectedProf ? usersCut : users;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const handleProfessionSelect = (items) => {
        setSelectedProf(items);
    };
    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty="_id"
                        contentProperty="name"
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={filteredUsers.length} />
                {users.length > 0 && (
                    <UsersTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        {...rest}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={filteredUsers.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType(PropTypes.object, PropTypes.array)
};
