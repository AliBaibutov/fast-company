import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onBookmark,
}) => {
  console.log(onBookmark);
  return (
    <tr key={_id}>
      <th key={_id} scope="row">
        {name}
      </th>
      <td>
        {qualities.map((qualitie) => {
          return <Qualitie key={qualitie._id} {...qualitie} />;
        })}
      </td>

      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark status={bookmark} onBookmark={() => onBookmark(_id)} />
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

export default User;
