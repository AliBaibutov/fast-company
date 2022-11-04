import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Apploader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import { ProfessionProvider } from "./hooks/useProfessions";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <>
            <Apploader>
                <NavBar />
                <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
                <ToastContainer />
            </Apploader>
        </>
    );
}

export default App;
