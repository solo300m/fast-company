import React from "react";
import PropTypes from "prop-types";
import "./cardUser.css";
import Qualities from "../../../ui/qualities";
const CardUser = ({ user, type }) => {
    if (type === "cardImg3Fields") {
        return (
            <div className="card mx-4 mb-4 mt-3">
                <div className="card-background-style card-img-top" alt="..." />
                <div className="card-body p-0">
                    <div className="col">
                        <h4 className="card-title mb-3 text-center">
                            {user.name}
                        </h4>
                        <h5 className="card-subtitle mb-2 text-center">
                            {[user.profession.name]}
                        </h5>
                        <p className="card-text mb-3 text-center">
                            {user.rate}
                        </p>
                    </div>
                </div>
            </div>
        );
    } else if (type === "cardQualities") {
        return (
            <div className="card mx-4 mb-4">
                <div className="card-body">
                    <h4 className="card-title mb-3 text-center">Qualities</h4>
                    <div className="text-center">
                        <Qualities qualities={user.qualities} />
                    </div>
                </div>
            </div>
        );
    } else if (type === "cardMeeting") {
        return (
            <div className="card mx-4 mb-3">
                <div className="card-body">
                    <h4 className="card-title mb-3 text-center">
                        Completed Meetings
                    </h4>
                    <h1 className="text-center">{user.completedMeetings}</h1>
                </div>
            </div>
        );
    }
};
CardUser.propTypes = {
    user: PropTypes.object,
    type: PropTypes.string
};
export default CardUser;
