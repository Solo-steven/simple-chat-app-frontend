import React, { useContext, useRef } from "react";
import  SocketClient  from "./socket-context";
import { io, Socket } from "socket.io-client";

export function useSocketEmit() {
    const socket: Socket = useContext(SocketClient);
    const emitRef = useRef(socket.emit.bind(socket));
    return emitRef.current;
}
export function useSocketOn() {
    const socket: Socket = useContext(SocketClient);
    const onRef = useRef(socket.on.bind(socket));
    return onRef.current;
}
export function useSocketOff() {
    const socket: Socket = useContext(SocketClient);
    const offRef = useRef(socket.off.bind(socket));
    return offRef.current;
}

export function createSocket(url: string) {
    const socket: Socket = io(url);
    return socket;
}

export const  SocketProvider = ({ children, socket }: {children: React.ReactNode, socket: Socket})  => {
    return (
        <SocketClient.Provider value={socket}>
            { children } 
        </SocketClient.Provider>
    )
};