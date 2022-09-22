import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import api from "../../../api";
import _ from "lodash";

const CommentsListComponent = ({ users, userId, updateComments }) => {
    const [commentForUser, setCommentForUser] = useState();
    const [delCommentId, setDelCommentId] = useState();
    const handleDelete = (id) => {
        setDelCommentId(api.comments.remove(id).then());
    };
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setCommentForUser(data));
    }, [delCommentId, updateComments]);

    const sortedComment = _.sortBy(commentForUser, function (comment) {
        return -comment.created_at;
    });

    return (
        <>
            {sortedComment && sortedComment.length > 0 ? (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {sortedComment.map((comment) => (
                            <Comment
                                key={comment._id}
                                userId={comment.userId}
                                createdAt={comment.created_at}
                                sortedComment={comment}
                                onDelete={handleDelete}
                                users={users}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    );
};

CommentsListComponent.propTypes = {
    commentForUser: PropTypes.array,
    onDelete: PropTypes.func,
    users: PropTypes.array,
    userId: PropTypes.string,
    updateComments: PropTypes.array
};

export default CommentsListComponent;
