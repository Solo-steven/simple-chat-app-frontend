import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { Box } from "@chakra-ui/react";


const Message = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(ActionCreators.request.getMessage());
    },[dispatch])
    return (
      <Box>

      </Box>  
    );
};

export default Message