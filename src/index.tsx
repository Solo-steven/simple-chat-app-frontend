import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { createSocket, SocketProvider } from "./socket";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const io = createSocket("http://localhost:3300");

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ChakraProvider>
                <SocketProvider socket={io}>
                    <App />
                </SocketProvider>
            </ChakraProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);