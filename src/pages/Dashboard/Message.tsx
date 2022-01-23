import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { Box, VStack, HStack, Flex, Icon, Text, Input, Avatar, IconButton, Skeleton } from "@chakra-ui/react";
import { MdAdsClick, MdSend } from "react-icons/md";
import { useSocketEmit } from "../../socket";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const messageSelector = createSelector(
    (root: RootState) => root.control.currentFriend, 
    (root: RootState) => root.cache.friends,
    (currentFriend, friends) => {
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].email === currentFriend) return friends[i].message;
        }
        return [];
    }
);

const Message: React.FC = () => {
    //  ===== Input ===== //
    // don't need to put in redux, because if not using on middleware for request 
    const [messageInput, setMessageInput] = useState("");
    // ===== Other Hooks ===== //
    const emit = useSocketEmit();
    const dispatch = useDispatch();
    // ===== Data Part ===== //
    const currentFriend = useSelector((root: RootState) => root.control.currentFriend);
    const user = useSelector((root: RootState) => root.cache.user);
    const isMessageEnd = useSelector((root: RootState) => {
        const currentFriend= root.control.currentFriend;
        const friends = root.cache.friends;
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].email === currentFriend) return friends[i].isMessageEnd;
        }
        return false;
    })
    const messages = useSelector(messageSelector);
    // if data not exist, when and how to fetch data.
    useEffect(() => {
        // currentFriend data is control by User.tsx component.
        if (currentFriend !== "" && messages.length === 0) {
            dispatch(ActionCreators.request.getMessage());
            return;
        }
    }, [dispatch, currentFriend, messages]);
    // when message change, scroll to button(exist some bug)
    const scrollRef = useRef<any>(null);
    useEffect(() => {
        if(scrollRef.current !== null ) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages.length]);
    // === IntersectionObserver ==== //
    const topRef = useRef<any>(null);
    useEffect(() => {
        let observer: IntersectionObserver | null = null ;
        if(topRef.current !== null) {
            observer = new IntersectionObserver(()=> {
                setTimeout(() => {
                    dispatch(ActionCreators.request.getMessage());
                }, 3000)
            }, {threshold: 0.5});
            observer.observe(topRef.current);
        }
        return () => {
            if(observer !== null) {
                if(topRef.current !== null) observer.unobserve(topRef.current);
                observer.disconnect();
            }
        }
    }, [messages.length, dispatch]);
    // when to return a skeleton.
    if (currentFriend === "")
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
            <Box flexGrow={1} color="#000000" width="full" overflow="auto">
                <AutoSizer style={{height: "100%", width: "100%"}}>
                    {({height, width}) => (
                        <List
                            width={width}
                            height={height}
                            itemData={
                                messages.sort((frist, second) => {
                                    const fristDate = new Date(frist.timestamp);
                                    const secondDate = new Date(second.timestamp)
                                    if (fristDate >= secondDate)
                                        return 1;
                                    return -1;
                            })}
                            itemCount={isMessageEnd ? messages.length : messages.length+2 }
                            itemSize={80}
                            ref={scrollRef} 
                        >
                        { (({index, style, data}) => {
                            if(!isMessageEnd && index < 2 ) {
                                return (
                                    <Flex ref={index ===0 ? topRef : null} width="100%" justify="flex-start" padding="1.2% 5%">
                                        <Skeleton width="30%" height='50px' borderRadius="10px" />
                                    </Flex>
                                )
                            }
                            return (
                                <Flex
                                    width="100%"
                                    justify={data[isMessageEnd ? index : index-2].sender === user.email ? "flex-end" : "flex-start"}
                                    padding="1.2% 5%"
                                    key={index}
                                    style={style}
                                >
                                    <Text
                                        borderRadius="10px"
                                        backgroundColor="#838383"
                                        color="#FAFAFA"
                                        padding="15px 25px"
                                    >
                                        {data[isMessageEnd ? index : index-2].content}
                                    </Text>
                                </Flex>
                            )})
                        }
                        </List>
                    )}
                </AutoSizer>
            </Box>
            <HStack
                height="115px"
                width="100%"
                borderTop="1px solid #838383"
                borderColor="#838383"
                padding="3% 5%"
                spacing={3}
            >
                <Avatar name={user.name} width="60px" height="60px" backgroundColor="#838383" color="#FAFAFA" />
                <Input
                    value={messageInput}
                    color="#000000"
                    border="1px solid #000000"
                    borderColor="#000000"
                    _hover={{ border: "1px solid #000000" }}
                    onChange={(e)=> {setMessageInput(e.target.value)}}
                />
                <IconButton
                    variant='outline'
                    fontSize='20px'
                    aria-label='send'
                    icon={<Icon color="#146CF0" as={MdSend} />}
                    onClick={()=> { 
                        dispatch(ActionCreators.cache.sendMessage(currentFriend, messageInput));
                        emit("message/input",{ sender: user.email, reciver: currentFriend, message: messageInput }) 
                        setMessageInput("");
                    }}
                />
            </HStack>
        </VStack>
    );
};

export default Message