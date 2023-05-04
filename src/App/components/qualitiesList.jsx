import React from "react";
import { Qualitie } from "./quality";
import PropType from "prop-types";

export const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Qualitie key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropType.array.isRequired
};
