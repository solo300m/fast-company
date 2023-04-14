import React, {useState} from 'react';
import API from "../api/API";
import {User} from './user'
import { SearchStatus } from './searchStatus';

export const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    
    const handleBookmarck = (userId) => {
        setUsers(users.map((user) => {
            if(user._id === userId){
                user.bookmark = !user.bookmark
            }
            return user
        }))
    }

    return (
        <>
            <SearchStatus
                users = {users.length}                
            />
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                           <User
                           key = {user._id}
                           {...user}
                           onBookmarck = {handleBookmarck}
                           onDelete = {handleDelete}
                           /> 
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};