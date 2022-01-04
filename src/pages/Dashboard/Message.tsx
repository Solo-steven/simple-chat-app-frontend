import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { VStack, HStack, Flex , Icon, Text, Input, Avatar, IconButton } from "@chakra-ui/react";
import { MdAdsClick, MdSend } from "react-icons/md";


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
    if(currentFriend === "" )
        return (
            <Flex grow={1} height="full" justify="center">
                <HStack spacing={4}>
                    <Icon as={MdAdsClick} width="80px" height="80px" color="#146CF0" />
                    <Text color="#000000" fontSize="28px">{"選一位朋友開始聊天吧"}</Text>
                </HStack>
            </Flex>
        )
    return (
      <VStack flexGrow={1} height="full">
          <VStack flexGrow={1} color="#000000" width="full" overflow="auto">
                {message
                    .sort((frist, second) =>{
                        const fristDate = new Date(frist.timestamp);
                        const secondDate = new Date(second.timestamp)
                        if(fristDate > secondDate)
                            return 1;
                        return -1;
                    })
                    .map(message => (
                        <Flex
                            width="100%"
                            justify={message.sender === user.email ? "flex-end" : "flex-start"}
                            padding="1.2% 5%"
                            key={message.timestamp}
                        >
                            <Text 
                                borderRadius="10px"
                                backgroundColor="#838383" 
                                color="#FAFAFA" 
                                padding="15px 25px"
                            >
                                {message.content}
                            </Text>
                        </Flex>
                    ))
                }
          </VStack>
          <HStack  
            height="115px"
            width="100%"
            borderTop="1px solid #838383"
            borderColor="#838383"
            padding="3% 5%"
            spacing={3}
          >
                <Avatar name={user.name} width="60px" height="60px" backgroundColor="#838383" color="#FAFAFA"/>
                <Input 
                    color="#000000"
                    border="1px solid #000000" 
                    borderColor="#000000" 
                    _hover={{border: "1px solid #000000"}}
                />
                <IconButton
                    variant='outline'
                    fontSize='20px'
                    aria-label='send'
                    icon={<Icon color="#146CF0" as={MdSend}/>}
                />
          </HStack>
      </VStack>  
    );
};

export default Message