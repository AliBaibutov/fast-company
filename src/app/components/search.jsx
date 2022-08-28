import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onChange }) => {
    return (
        <form>
            <input
                className="w-100 mx-auto"
                name="search"
                placeholder="Search..."
                type="search"
                value={value}
                onChange={onChange}
            />
        </form>
    );
};
Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default Search;
