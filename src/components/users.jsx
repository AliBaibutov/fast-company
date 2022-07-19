import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const renderPhrase = (number) => {
    if (number === 0) {
      return <h2>Никто с тобой не тусанет</h2>;
    }
    if (number % 10 >= 2 && number % 10 <= 4 && number !== 12) {
      return <h2>{number} человека тусанут с тобой сегодня</h2>;
    } else {
      return <h2>{number} человек тусанет с тобой сегодня</h2>;
    }
  };
  const renderTable = () => {
    if (users.length === 0) {
      return (
        <span className="badge bg-danger">{renderPhrase(users.length)}</span>
      );
    }
    return (
      <>
        <span className="badge bg-primary">{renderPhrase(users.length)}</span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
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
                      <span key={item._id} className={`badge bg-${item.color}`}>
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
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  return renderTable();
};

export default Users;
