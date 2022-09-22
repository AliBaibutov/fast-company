import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
// import CommentsListComponent from "./commentsListComponent";
import AddCommentForm from "./addCommentForm";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [users, setUsers] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList = data.map((user) => ({
                label: user.name,
                value: user._id
            }));
            setUsers(usersList);
        });
    }, []);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    // console.log(commentForUser);
    if (user && users) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard onClick={handleClick} user={user} />
                        <QualitiesCard user={user} />
                        <MeetingsCard user={user} />
                    </div>
                    <div className="col-md-8">
                        <AddCommentForm users={users} userId={userId} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
