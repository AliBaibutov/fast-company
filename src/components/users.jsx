import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

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
  const renderTable = () => {
    return (
      <>
        <h2>
          <span
            className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
          >
            {renderPhrase(users.length)}
          </span>
        </h2>
        {users.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th key={user._id} scope="row">
                    {user.name}
                  </th>
                  <td>
                    {user.qualities.map((item) => {
                      return (
                        <span
                          key={item._id}
                          className={`badge m-1 bg-${item.color}`}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };
  return renderTable();
};

export default Users;
