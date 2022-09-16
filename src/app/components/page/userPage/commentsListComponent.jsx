import React from "react";
import Comment from "./comment";

const CommentsListComponent = () => {
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <h2>New comment</h2>
                    add comment
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <Comment />
                </div>
            </div>
        </>
    );
};

export default CommentsListComponent;
