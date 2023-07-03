import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import API from "../api";
import TextField from "../components/common/form/textField";
import SelectField from "../components/common/form/selectField";
import RadioField from "../components/common/form/radioField";
import MultiSelectField from "../components/common/form/multiSelectField";

// import { validator } from "../utils/validator";

const Edit = () => {
    const history = useHistory();
    const param = useParams();
    console.log("param: ", param);
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(param.userId).then((user) => setUser(user));
    }, []);
    // const [data, setData] = useState({});
    // let nameTemp = "";
    if (user) {
        console.log("user: ", user);
    }
    //     useEffect(() => {
    //         setData(user);
    //     }, []);
    // }
    // copy registerForm()
    // nameTemp = user.name;

    const [data, setData] = useState({});
    useEffect(() => {
        API.users.getById(param.userId).then((user) => setData(user));
    }, []);
    // const [data, setData] = useState({
    //     name: nameTemp,
    //     email: "",
    //     profession: "",
    //     sex: "",
    //     qualities: []
    // });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    // const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        console.log("target: ", target);
        if (target.name === "profession") {
            setData((prevState) => ({
                ...prevState,
                [target.name]: getProfessionById(target.value)
            }));
        } else if (target.name === "qualities") {
            setData((prevState) => ({
                ...prevState,
                [target.name]: getQualities(target.value)
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Email введен некорректно"
    //         }
    //     },
    //     profession: {
    //         isRequired: {
    //             message: "Обязательно выберите вашу профессию"
    //         }
    //     }
    // };

    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    // const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        // const { profession, qualities } = data;
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });
        // console.log({ ...data, profession, qualities });
        API.users.update(data._id, data);
        history.push("/users");
    };
    // console.log("errors: ", errors);
    // console.log("isValide: ", isValid);
    // console.log("lengthErrors: ", Object.keys(errors).length);

    // console.log("nameTemp: ", nameTemp);
    let profession = {};
    let qualitie = [];
    const qua = [];
    if (data) {
        console.log("data: ", data);
        profession = data.profession;
        qualitie = [data.qualities];
        console.log("prof: ", profession);
        if ([data.qualities].length <= 1) {
            console.log("qualities: ", typeof data.qualities);
        } else {
            console.log(
                "qualities: ",
                typeof data.qualities.map((qual) => qual.name)
            );
        }
        for (const item of qualitie) {
            console.log("qualitiesUno: ", item);
            qua.push(item);
        }

        console.log("qua: ", typeof qua);
    }
    useEffect(() => {
        console.log("changed data: ", data);
        // validate();
    }, [data]);
    // if (professions) console.log("profession: ", data.profession.name);

    // console.log("profList: ", professions);
    // const handleSubmit = () => {};
    // const handleChange = () => {};
    if (data && professions && qualities) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>EDIT</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Полное имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={profession}
                                // error={errors.profession}
                                // suggested="current-password"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                // disabled={!isValid}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            // <form onSubmit={handleSubmit}>
            //     <TextField
            //         label="Электронная почта"
            //         name="email"
            //         value={user.email}
            //         onChange={handleChange}
            //         // error={errors.email}
            //     />
            //     <TextField
            //         label="Пароль"
            //         type="password"
            //         name="password"
            //         value={user.password}
            //         onChange={handleChange}
            //         // error={errors.password}
            //     />
            //     <SelectField
            //         label="Выбери свою профессию"
            //         defaultOption="Choose..."
            //         options={professions.name}
            //         name="profession"
            //         onChange={handleChange}
            //         value={user.profession}
            //         // error={errors.profession}
            //         suggested="current-password"
            //     />
            //     <RadioField
            //         options={[
            //             { name: "Male", value: "male" },
            //             { name: "Female", value: "female" },
            //             { name: "Other", value: "other" }
            //         ]}
            //         value={user.sex}
            //         name="sex"
            //         onChange={handleChange}
            //         label="Выберите ваш пол"
            //     />
            //     <MultiSelectField
            //         options={qualities}
            //         onChange={handleChange}
            //         defaultValue={user.qualities}
            //         name="qualities"
            //         label="Выберите ваши качества"
            //     />
            //     <button
            //         className="btn btn-primary w-100 mx-auto"
            //         type="submit"
            //         // disabled={!isValid}
            //     >
            //         Submit
            //     </button>
            // </form>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default Edit;
