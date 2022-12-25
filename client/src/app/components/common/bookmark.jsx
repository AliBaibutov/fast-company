import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onClick }) => {
    return (
        <button className="btn btn-light btn-sm" onClick={onClick}>
            <i className={"bi bi-tags" + (status ? "-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default BookMark;
