import React from "react";
import ChangeUserForm from "../components/ui/changeUserForm";

const Edit = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <ChangeUserForm />
                </div>
            </div>
        </div>
    );
};

export default Edit;
