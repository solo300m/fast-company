import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Card = (user) => {
    const item = user.user;
    const history = useHistory();

    // console.log("user as param: ", item.name);

    const handleBackOut = () => {
        history.push("/users");
    };

    return (
        <>
            <h1> Полное имя: {item.name}</h1>
            <h3>Профессия: {item.profession.name}</h3>
            <h4>Качества: </h4>
            {item.qualities.map((value) => (
                <span
                    key={value._id}
                    className={`badge bg-${value.color} m-2 p-3 fs-5`}
                >
                    {value.name}
                </span>
            ))}
            <h4>Встречался, раз: {item.completedMeetings}</h4>
            <h4>Оценка (рейтинг): {item.rate}</h4>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleBackOut}
            >
                Вернуться к таблице
            </button>
        </>
    );
};
