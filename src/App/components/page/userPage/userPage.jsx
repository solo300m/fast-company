import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CardUser from "../../common/form/Card/cardUser";
import CommentsForm from "../../ui/commentsForm";
import CommentsList from "../../ui/commentsList";

// import RegisterForm from "../../ui/registerForm";
// import Edit from "../../../layouts/edit";

const UserPage = ({ userId }) => {
    const [dataUsers, setDataUsers] = useState();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState();
    const [comment, setComment] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comment) => setComment(comment));
    }, []);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        api.users.fetchAll().then((data) => setDataUsers(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    const handleChange = () => {
        console.log("linck: ", user);
        // <Link to={`${location.pathname}/${user._id}`} />;

        console.log("useLocation: ", location.pathname);
    };
    const handleReload = () => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((item) => setComment(item));
    };
    const handleDelete = (commentId) => {
        console.log("deletedID: ", commentId);
        api.comments.remove(commentId);
        setComment(comment.filter((comItem) => comItem._id !== commentId));
    };
    console.log("dateUsers: ", dataUsers);
    if (user && dataUsers) {
        return (
            <>
                <div>
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-4">
                                <CardUser user={user} type={"cardImg3Fields"} />
                                <CardUser user={user} type={"cardQualities"} />
                                <CardUser user={user} type={"cardMeeting"} />
                                <button
                                    className="btn btn-primary mx-2 ms-4"
                                    onClick={handleClick}
                                >
                                    {" "}
                                    Все Пользователи
                                </button>
                                <Link to={`/users/${user._id}/edit/`}>
                                    <button
                                        className="btn btn-primary mx-2"
                                        onClick={handleChange}
                                    >
                                        Изменить
                                    </button>
                                </Link>
                            </div>
                            <div className="col">
                                <CommentsForm
                                    data={dataUsers}
                                    onChange={handleReload}
                                    userId={userId}
                                />
                                <CommentsList
                                    comment={comment}
                                    data={dataUsers}
                                    handleDel={handleDelete}
                                    user={user}
                                    userId={userId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
