import React from "react";
import PropTypes from "prop-types";
import "./commentsList.css";
// import API from "../../api";
const CommentsList = ({ comment, data, handleDel, user, userId }) => {
    let commentFormat = [];
    const arrUserId = [];
    Object.values(comment).forEach((item) => {
        Object.values(data).forEach((filtet) => {
            if (filtet._id === item.userId) {
                arrUserId.push(filtet);
            }
        });
    });
    // const handleDelete = (event) => {
    //     console.log("comment_id: ", event.target.dataset.values);
    // };

    let text = "";
    if (comment) {
        console.log("comments: ", comment);
        // console.log("convert: ", comment["0"].content);
        const tempComment = Object.values(comment).map((item) => {
            let elemTemp = {};
            arrUserId.forEach((elem) => {
                if (elem._id === item.userId) {
                    elemTemp = elem;
                }
            });
            console.log("elemTemp: ", elemTemp.name);
            if (typeof item.created_at === "string") {
                const temp = Number.parseInt(item.created_at);
                return {
                    ...item,
                    date: new Date(temp),
                    userName: elemTemp.name
                };
            } else {
                return {
                    ...item,
                    date: new Date(item.created_at),
                    userName: elemTemp.name
                };
            }
        });
        const tempComment2 = Object.values(tempComment).map((item) => {
            let formatDay = "";
            let formatMonth = "";
            if (item.date.getDate() < 10) {
                formatDay = `0${item.date.getDate()}`;
            } else {
                formatDay = `${item.date.getDate()}`;
            }
            if (item.date.getMonth() + 1 < 10) {
                formatMonth = `0${item.date.getMonth() + 1}`;
            } else {
                formatMonth = `${item.date.getMonth() + 1}`;
            }
            return {
                ...item,
                format: `${formatDay}-${formatMonth}-${item.date.getFullYear()}`
            };
        });

       commentFormat = tempComment2;

        console.log("tempComment: ", tempComment);
        console.log("tempComment2", tempComment2);
        console.log("commentFormat", commentFormat);
    }
    if (comment && comment.length > 0) {
        text = comment["0"].content;
        console.log("text: ", text);
        const arr = Object.values(comment).map((str) => str.content);
        console.log("arr: ", arr);
        return (
            <div className="card mt-3 ">
                {commentFormat && Object.keys(commentFormat).length > 1 ? (
                    <>
                        <h3 className="card-title ms-3">Comments</h3>

                        {Object.values(commentFormat).map((str) => (
                            <div key={str._id} className="row m-4 bg-light">
                                <div className="col-1 background_style m-3"></div>
                                <div className="col-1 card-body">
                                    <div className="row">
                                        <span className="col-3">
                                            {str.userName}
                                        </span>
                                        <span className="col-3 small">
                                            {str.format}
                                        </span>
                                        <button className="btn col-1 p-0 border-0 btn-custom-x">
                                            <div
                                                type="button"
                                                className="ikon-custom-x"
                                                onClick={() => handleDel(str._id)}
                                                data-values={str._id}
                                            ></div>
                                        </button>
                                    </div>
                                    <span>{str.content}</span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className="card-title ms-3">Comments</h3>
                        <div className="card-body">
                            <div
                                key={commentFormat["0"]._id}
                                className="row m-4 bg-light"
                            >
                                <div className="col-1 background_style m-3"></div>
                                <div className="col-1 card-body">
                                    <div className="row">
                                        <span className="col-3">
                                            {commentFormat["0"].userName}
                                        </span>
                                        <span className="col-3 small me-5">
                                            {commentFormat["0"].format}
                                        </span>
                                        <button
                                            className="btn col-1 p-0 border-0 btn-custom-x"
                                            onClick={() => handleDel(
                                                commentFormat["0"]._id
                                            )}
                                        >
                                            <div
                                                type="button"
                                                className="ikon-custom-x"
                                            ></div>
                                        </button>
                                    </div>
                                    <span>{commentFormat["0"].content}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    } else {
        return null;
        // return (
        //     <div className="card mt-3">
        //         <div className="card-body">No comments</div>
        //     </div>
        // );
    }
};
CommentsList.propTypes = {
    comment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    handleDel: PropTypes.func,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    userId: PropTypes.string
};
export default CommentsList;
