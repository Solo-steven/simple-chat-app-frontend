import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../app/actions/creator";
import { HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import User from "./User";
import Message from "./Message";

const DashBoard: React.FC = () => {
    const { state } = useLocation<{from: string}>();
    const dispatch = useDispatch();
    if(state.from === "login") {
        dispatch(ActionCreators.authForm.clearForm());
    }
     return (
        <HStack
            backgroundColor="#ffffff"
            width="100vw"
            height="100vh"
        >
            <Sidebar />
            <User />
            <Message/>
        </HStack>
    );
};

export default DashBoard;