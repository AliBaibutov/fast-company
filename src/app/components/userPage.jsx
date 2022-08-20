import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const UserPage = () => {
    const params = useParams();
    const { userId } = params;
    const [userById, setUserById] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => setUserById(user));
    }, []);
    const userCard = (userById) => {
        return (
            <>
                <div>
                    <h1>{userById.name}</h1>
                </div>
                <div>
                    <h2>{`Профессия: ${userById.profession.name}`}</h2>
                </div>
                {userById.qualities.map((quality) => (
                    <span
                        key={quality._id}
                        className={`badge m-1 bg-${quality.color}`}
                    >
                        {quality.name}
                    </span>
                ))}
                <div>
                    <p>{`completedMeetings: ${userById.completedMeetings}`}</p>
                </div>
                <div>
                    <h2>{`Rate: ${userById.rate}`}</h2>
                </div>
                <div>
                    <Link to="/users">
                        <button>Все пользователи</button>
                    </Link>
                </div>
            </>
        );
    };

    return userById && userId ? userCard(userById) : <h1>Loading</h1>;
};
export default UserPage;
