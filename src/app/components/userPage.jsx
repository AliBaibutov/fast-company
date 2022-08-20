import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    const handleClick = () => {
        history.push("/users");
    };
    // const userCard = (userById) => {
    //     return (
    //         <>
    //             <div>
    //                 <h1>{userById.name}</h1>
    //             </div>
    //             <div>
    //                 <h2>{`Профессия: ${userById.profession.name}`}</h2>
    //             </div>
    //             {userById.qualities.map((quality) => (
    //                 <span
    //                     key={quality._id}
    //                     className={`badge m-1 bg-${quality.color}`}
    //                 >
    //                     {quality.name}
    //                 </span>
    //             ))}
    //             <div>
    //                 <p>{`completedMeetings: ${userById.completedMeetings}`}</p>
    //             </div>
    //             <div>
    //                 <h2>{`Rate: ${userById.rate}`}</h2>
    //             </div>
    //             <div>
    //                 <Link to="/users">
    //                     <button>Все пользователи</button>
    //                 </Link>
    //             </div>
    //         </>
    //     );
    // };
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}>Все пользователи</button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
