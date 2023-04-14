import React from 'react';
import { Quality } from './quality';
import { Bookmark } from './bookmark';

export const User = (props) => {

    const users = props;

    return (
        <>        
        <tr key={users._id}>
            <td>{users.name}</td>
            <td>
                <Quality
                    {...users}
                />
            </td>
            <td>{users.profession.name}</td>
            <td>{users.completedMeetings}</td>
            <td>{users.rate} /5</td>
            <Bookmark
                {...users}
            />            
            <td>
                <button
                    onClick={() => props.onDelete(props._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
        
        </>
    )
}