import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import SelectField from "../common/form/selectField";
import API from "../../api";
const CommentsForm = ({ data, onChange, userId }) => {
    console.log("data: ", data);
    console.log("userId: ", userId);
    const [value, setValue] = useState({
        name: "",
        comment: ""
    });
    const [saveData, setSaveData] = useState({
        pageId: "",
        userId: "",
        content: ""
    });
    const handleChange = ({ target }) => {
        console.log("target: ", target);
        const temp = target.value;
        console.log("temp: ", temp);
        setValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        setSaveData((prevState) => ({
            ...prevState,
            pageId: userId,
            userId: value.name,
            content: value.comment
        }));
    }, [value]);
    console.log("value: ", value);
    console.log("dataSaved : ", saveData);
    const handleSand = () => {
        API.comments.add(saveData);
        setValue((prevState) => ({
            ...prevState,
            name: "",
            comment: ""
        }));
        onChange();
    };
    return (
        // <h1>Hy!</h1>
        <>
            <div className="card mt-3">
                <div className="card-body">
                    <h1 className="card-title text-centre">New Comment</h1>
                    <select
                        className="form-select"
                        name="name"
                        aria-label="Default select example"
                        value={value.name}
                        onChange={handleChange}
                    >
                        <option selected={value.name === ""} disabled value="">
                            Выберите пользователя
                        </option>
                        {data &&
                            Object.values(data).map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                    selected={item._id === value._id}
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-floating mx-3">
                    <h2 className="card-title">Comment</h2>
                    <textarea
                        style={{ height: "150px" }}
                        className="form-control"
                        placeholder="Напишите здесь свой комментарий..."
                        id="comment"
                        name="comment"
                        value={value.comment}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="row justify-content-end m-3">
                    <button
                        onClick={handleSand}
                        className="btn btn-primary col-4 align-items-end"
                    >
                        Опубликовать
                    </button>
                </div>
            </div>
        </>
    );
};
CommentsForm.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    userId: PropTypes.string
};

export default CommentsForm;
