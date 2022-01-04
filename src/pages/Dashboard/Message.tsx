import React, { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { HStack, Box, Flex , Icon, Text } from "@chakra-ui/react";
import { MdAdsClick } from "react-icons/md";


const Message: React.FC = () => {
    const dispatch = useDispatch();
    // ===== Data Part ===== //
    const currentFriend = useSelector((root: RootState) => root.control.currentFriend);
    const user = useSelector((root: RootState) => root.cache.user);
    const message = useSelector((root: RootState) => {
        const currentFriend = root.control.currentFriend;
        for(let i = 0 ; i < root.cache.friends.length; i ++) {
            if(root.cache.friends[i].email === currentFriend)
                return root.cache.friends[i].message;
        }
        return [];
    });
    // if data not exist, when and how to fetch data.
    useEffect(() => {
        // user-email and currentFriend data is control by User.tsx component.
        if(user.email !== "" && currentFriend !== "" && message.length === 0) {
            dispatch(ActionCreators.request.getMessage());
            return;
        }
    }, [dispatch, user, currentFriend, message]);
    // when to return a skeleton.
    if(message.length ===0 )
        return (
            <Flex grow={1} height="full" justify="center">
                <HStack spacing={4}>
                    <Icon as={MdAdsClick} width="80px" height="80px" color="#146CF0" />
                    <Text color="#000000" fontSize="28px">{"選一位朋友開始聊天吧"}</Text>
                </HStack>
            </Flex>
        )
    return (
      <Box>

      </Box>  
    );
};

export default Message