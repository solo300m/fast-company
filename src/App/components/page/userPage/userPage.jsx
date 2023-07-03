import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import RegisterForm from "../../ui/registerForm";
// import Edit from "../../../layouts/edit";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    const handleChange = () => {
        console.log("linck: ", user);
        // <Link to={`${location.pathname}/${user._id}`} />;

        console.log("useLocation: ", location.pathname);
    };
    if (user) {
        return (
            <>
                <div>
                    <h1> {user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <Qualities qualities={user.qualities} />
                    <p>completedMeetings: {user.completedMeetings}</p>
                    <h2>Rate: {user.rate}</h2>
                    <button
                        className="btn btn-primary mx-2"
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
                {/* <div>
                    <BrowserRouter>
                        <Switch>
                        </Switch>
                    </BrowserRouter>
                </div> */}
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
