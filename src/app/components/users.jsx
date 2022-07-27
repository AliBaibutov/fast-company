import React from "react";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, onDelete, onBookmark }) => {
  const usersList = users.map((user) => (
    <User
      key={user._id}
      {...user}
      onDelete={onDelete}
      onBookmark={onBookmark}
    />
  ));
  return (
    <>
      <SearchStatus length={users.length} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
      )}
    </>
  );
};
export default Users;