import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./app/store";
import Auth from "./pages/Auth";
import "./asset/animation.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Auth />
            </ChakraProvider>
        </Provider>
    );
};

export default App;