import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number === 0) {
            return <h2>Никто с тобой не встретится</h2>;
        }
        if (number % 10 >= 2 && number % 10 <= 4 && number !== 12) {
            return `${number} человека встретятся с тобой сегодня`;
        } else {
            return `${number} человек встретится с тобой сегодня`;
        }
    };
    return (
        <>
            <h2>
                <span
                    className={
                        "badge bg-" + (length > 0 ? "primary" : "danger")
                    }
                >
                    {renderPhrase(length)}
                </span>
            </h2>
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
