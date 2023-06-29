import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
const MultiSelect = ({ options, onChange, name, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                value: options[optionName]._id,
                label: options[optionName].name
            }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <Select
            isMulti
            options={optionsArray}
            className="basic-multi-select"
            classNamePrefix="select"
            closeMenuOnSelect={false}
            defaultValue={defaultValue}
            name={name}
            onChange={handleChange}
        />
    );
};

MultiSelect.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelect;
