import React from "react";
import { useParams } from "react-router-dom";
import * as api from "../api/fake.api/user.api";
import { Card } from "./card";

export const CardUser = () => {
    const params = useParams();

    const user = api.getUserById(params.userId);
    // console.log("filtered user:", user);
    return (
        <div>
            <Card user={user} />
        </div>
    );
};
