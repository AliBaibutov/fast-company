import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const ChangeUserForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [data, setData] = useState(null);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
    }, []);

    const defaultQualities = data
        ? data.qualities.map((option) => ({
              label: option.name,
              value: option._id,
              color: option.color
          }))
        : null;
    // const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

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

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        console.log(qualities);
        const getProfArg =
            typeof profession === "string" ? profession : profession._id;
        const getQualArg = qualities[0]._id ? defaultQualities : qualities;
        const newData = {
            ...data,
            profession: getProfessionById(getProfArg),
            qualities: getQualities(getQualArg)
        };
        api.users.update(userId, newData).then((data) => setData(data));
        history.push(`/users/${userId}`);
    };

    if (data) {
        return (
            <form onSubmit={handleUpdateSubmit}>
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    // error={errors.email}
                />
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    // error={errors.email}
                />
                <SelectField
                    label="Выберите вашу профессию"
                    defaultOption="Choose..."
                    name="profession"
                    options={professions}
                    onChange={handleChange}
                    value={data.profession._id}
                    // error={errors.profession}
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
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={defaultQualities}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <button
                    type="submit"
                    // disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Обновить
                </button>
            </form>
        );
    } else {
        return "Loading...";
    }
};

export default ChangeUserForm;
