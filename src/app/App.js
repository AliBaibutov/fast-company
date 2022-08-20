import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import UserPage from "./components/userPage";
// import UserPage from "./components/userPage";
// import UsersList from "./components/usersList";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    // const handleNavBar = () => {
    //     return false && <UsersList />;
    // };
    return (
        <>
            <NavBar />
            <Switch>
                {/* <Route path="/users/:userId" component={UserPage} /> */}
                <Route path="/users/:userId" exact component={UserPage} />
                <Route path="/login" component={Login} />
                <Route path="/users" component={Users} />
                <Route path="/" component={Main} />
            </Switch>
        </>
    );
}

export default App;
