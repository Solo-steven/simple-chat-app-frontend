import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);