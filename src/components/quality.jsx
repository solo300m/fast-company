import React from 'react';

export const Quality = (props) => {
    const users = props
    return (
        <>
            {users.qualities.map((item) => (
                <span className={"badge m-1 bg-" + item.color} key={item._id}>
                    {item.name}
                </span>
            ))}
        </>
    )
}