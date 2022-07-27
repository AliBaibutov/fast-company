import React from "react";

const BookMark = ({ status, onBookmark }) => {
  if (!status) {
    return (
      <button className="btn btn-light btn-sm" onClick={onBookmark}>
        <i className="bi bi-tags"></i>
      </button>
    );
  } else {
    return (
      <button className="btn btn-light btn-sm" onClick={onBookmark}>
        <i className="bi bi-tags-fill"></i>
      </button>
    );
  }
};

export default BookMark;
