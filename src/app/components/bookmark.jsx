import React from "react";

const BookMark = ({ status, onClick }) => {
    return (
        <button className="btn btn-light btn-sm" onClick={onClick}>
            <i className={"bi bi-tags" + (status ? "-fill" : "")}></i>
        </button>
    );
};

export default BookMark;
