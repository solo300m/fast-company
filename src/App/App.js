import React, { useEffect, useState } from "react";
import { Users } from "./components/Users";

import API from "./api/API";

export function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.users.fetchAll().then((value) => setUsers(value));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };
    return (
        <div>
            <Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
            />
        </div>
    );
}
