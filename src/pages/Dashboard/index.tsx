import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { HStack } from "@chakra-ui/react";

const DashBoard = () => {
    const { state } = useLocation<{from: string}>();
    const dispatch = useDispatch();
    if(state.from === "login") {
        dispatch(ActionCreators.authForm.clearForm());
    }else {

    }
     return (
        <HStack
            backgroundColor="#ffffff"
        >

        </HStack>
    );
};

export default DashBoard;