import React from "react";
import PropTypes from "prop-types";

export const SearchField = ({ id, name, value, onChange }) => {
    return (
        <div className="input-group">
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Search..."
                className="form-control"
            />
        </div>
    );
};
SearchField.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};
