import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import CommentsListComponent from "./commentsListComponent";

const AddCommentForm = ({ users, userId }) => {
    const [data, setData] = useState({
        name: "",
        comment: ""
    });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        comment: {
            isRequired: {
                message: "Введите ваш комментарий"
            }
        }
    };
    const getInputClasses = () => {
        return "form-control" + (errors.comment ? " is-invalid" : "");
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const [UpdateCommentForUser, setUpdateCommentForUser] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setUpdateCommentForUser(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeArea = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        const { name, comment } = data;
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.comments
            .add({ userId: name, pageId: userId, content: comment })
            .then((data) =>
                setUpdateCommentForUser((prevState) => [...prevState, data])
            );
        setData({ name: "", comment: "" });
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            defaultOption="Выберите пользователя"
                            name="name"
                            options={users}
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Сообщение
                        </label>
                        <textarea
                            onChange={handleChangeArea}
                            className={getInputClasses()}
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="comment"
                            value={data.comment}
                        ></textarea>
                        {errors.comment && (
                            <div className="invalid-feedback">
                                {errors.comment}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="float-end mt-3 btn btn-primary"
                            disabled={!isValid}
                        >
                            Опубликовать
                        </button>
                    </form>
                </div>
            </div>
            <CommentsListComponent
                updateComments={UpdateCommentForUser}
                userId={userId}
                users={users}
            />
        </>
    );
};

AddCommentForm.propTypes = {
    users: PropTypes.array,
    commentForUser: PropTypes.array,
    userId: PropTypes.string
};

export default AddCommentForm;
