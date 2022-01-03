import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/reducer";
import { Switch, Route, Redirect } from "react-router-dom";
import Modal from "./components/Modal";
import Auth from "./pages/Auth";
import DashBoard from "./pages/Dashboard";
import "./asset/animation.css";

const App: React.FC = () => {
    const authFlag = useSelector((root: RootState) => root.control.auth.flag);
    return (
        <>
            <Switch>
                <Route exact path="/">
                    {authFlag ? <Redirect to="/dashboard"/> : <Redirect to="auth"/>}
                </Route>
                <Route exact path="/auth">
                    <Auth />
                </Route>
                <Route exact path="/dashboard">
                    {authFlag ? <DashBoard /> : <Redirect to="auth"/>}
                </Route>
            </Switch>
            <Modal />
        </>
    );
};

export default App;