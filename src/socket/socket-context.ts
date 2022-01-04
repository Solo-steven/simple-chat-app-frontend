import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const SocketClient = createContext<Socket>(io());

export default SocketClient;