import React, { useEffect, useState } from "react";
import { TextField } from "../components/common/form/textField";
import { validator } from "../utils/validator";

export const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно!"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен содержать хотябы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотябы одну цифру"
            },
            min: {
                message: "Минимальное количество символов 8",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // for (const fildName in data) {
        //     if (data[fildName].trim() === "") {
        //         errors[fildName] = `${fildName} обязательное для заполнения`;
        //     }
        // }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    console.log(errors);
    // const [password, setPassword] = useState("");
    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    // const handlePasword = (e) => {
    //     setPassword(e.target.value);
    // };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmint = (e) => {
        e.preventDefault();

        const isValidate = validate();

        if (!isValidate) return;
        console.log(data);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-3">Login</h3>
                    <form onSubmit={handleSubmint}>
                        <TextField
                            label="Электронная почта  "
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль  "
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                            Submint
                        </button>
                        {/* <button type="button">Кнопка не Submit</button> */}
                    </form>
                </div>
            </div>
        </div>
    );
};
