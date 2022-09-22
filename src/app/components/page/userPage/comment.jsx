import React from "react";
import PropTypes from "prop-types";
// import api from "../../../api";

const Comment = ({ sortedComment, onDelete, users, userId, createdAt }) => {
    const time = Math.round((Date.now() - Number(createdAt)) / 60000);
    const messageTime = (time) => {
        if (time >= 0 && time < 1) {
            return "Только что";
        } else if (time >= 0 && time < 5) {
            return "1 минуту назад";
        } else if (time >= 5 && time < 10) {
            return "5 минут назад";
        } else if (time >= 10 && time < 30) {
            return "10 минут назад";
        } else if (time >= 30 && time < 60) {
            return "30 минут назад";
        } else if (time >= 60 && time < 1440) {
            return `${new Date(time).getHours()} ч ${new Date(
                time
            ).getMinutes()} м назад`;
        } else if (time >= 1440 && time < 525600) {
            return `${new Date(time).getDay()} ${new Date(time).toLocaleString(
                "en",
                { month: "long" }
            )} `;
        } else if (time >= 525600) {
            return [
                new Date(time).getDay(),
                new Date(time).getMonth() + 1,
                new Date(time).getFullYear()
            ].join(".");
        }
    };

    const filteredUsers = users.filter((user) => user.value === userId);
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    {filteredUsers.map((user) => (
                                        <p key={user.value} className="mb-1 ">
                                            {user.label + " - "}
                                            <span className="small">
                                                {messageTime(time)}
                                            </span>
                                        </p>
                                    ))}
                                    <button
                                        onClick={() =>
                                            onDelete(sortedComment._id)
                                        }
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>

                                <p className="small mb-0">
                                    {sortedComment.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    sortedComment: PropTypes.object,
    onDelete: PropTypes.func,
    users: PropTypes.array,
    userId: PropTypes.string,
    createdAt: PropTypes.string
};

export default Comment;
