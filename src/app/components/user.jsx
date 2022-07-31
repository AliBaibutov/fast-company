import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qualitie) => {
                    return <Qualitie key={qualitie._id} {...qualitie} />;
                })}
            </td>

            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark status={bookmark} onClick={() => onBookmark(_id)} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default User;
