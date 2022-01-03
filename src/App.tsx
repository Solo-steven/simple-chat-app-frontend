import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "./app/store";
import Modal from "./components/Modal";
import Auth from "./pages/Auth";
import DashBoard from "./pages/Dashboard";
import "./asset/animation.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ChakraProvider>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="auth"/>
                        </Route>
                        <Route exact path="/auth">
                            <Auth />
                        </Route>
                        <Route exact path="/dashboard">
                            <DashBoard />
                        </Route>
                    </Switch>
                    <Modal />
                </ChakraProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default App;