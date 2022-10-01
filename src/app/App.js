import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfessions";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" component={Main} />
                    <Redirect to="/" />
                </Switch>
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
}

export default App;
