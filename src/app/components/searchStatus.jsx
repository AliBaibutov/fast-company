import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number === 0) {
      return <h2>Никто с тобой не тусанет</h2>;
    }
    if (number % 10 >= 2 && number % 10 <= 4 && number !== 12) {
      return `${number} человека тусанут с тобой сегодня`;
    } else {
      return `${number} человек тусанет с тобой сегодня`;
    }
  };
  return (
    <>
      <h2>
        <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
          {renderPhrase(length)}
        </span>
      </h2>
    </>
  );
};

export default SearchStatus;
