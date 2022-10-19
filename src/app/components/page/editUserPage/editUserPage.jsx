import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualities";

const EditUserPage = () => {
    const history = useHistory();
    const { currentUser, createUser } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const qualitiesList = qualities.map((q) => ({
        value: q._id,
        label: q.name,
        color: q.color
    }));
    const newQualities = curUserQualities(qualitiesList);
    const newCurrentUser = {
        ...currentUser,
        qualities: newQualities
    };
    const [data, setData] = useState(newCurrentUser);
    const [errors, setErrors] = useState({});

    function curUserQualities(elements) {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of currentUser.qualities) {
                if (elem.value === (quality.value || quality)) {
                    qualitiesArray.push(elem);
                }
            }
        }
        return qualitiesArray;
    }

    const handleClick = () => {
        history.push(`/users/${data._id}`);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(data);
        const isValid = validate();
        if (!isValid) return;
        history.push(`/users/${data._id}`);
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={handleClick}>
                <i className="bi bi-caret-left"></i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            options={professionsList}
                            name="profession"
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
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
                        <MultiSelectField
                            defaultValue={data.qualities}
                            options={qualitiesList}
                            onChange={handleChange}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
