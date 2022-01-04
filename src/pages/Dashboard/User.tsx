import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { VStack, Box, Avatar, Text, HStack , Divider, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const User: React.FC = () => {
    // ==== Other Hooks ==== //
    const dispatch = useDispatch();
    // ===== Data part ===== //
    const user = useSelector((root: RootState) => root.cache.user);
    const friends = useSelector((root: RootState) => root.cache.friends);
    // if data not exist, when and how to fetch.
    useEffect(()  => {
        if(user.name === "" || friends.length === 0)
             dispatch(ActionCreators.request.getUserInfo())
    }, [dispatch, user, friends]);
    // when to return a skeleton.
    if(user.name === "" || friends.length === 0)
        return (
            <VStack height="100vh" borderRight="1px solid #838383" px="45px">
                <HStack spacing={3} marginTop="85px" >
                    <SkeletonCircle width="100px" height="100px"/>
                    <VStack spacing={3}>
                        <Skeleton >
                            <Text color="#000000" fontSize="18px" textAlign="center">{"user name"}</Text>
                        </Skeleton>
                        <Skeleton >
                            <Text color="#000000" fontSize="14px" textAlign="center">{"exmaple@email.com"}</Text>    
                        </Skeleton>           
                    </VStack>
                </HStack>
                <Box py="25px" width="100%">
                    <Divider borderColor="#838383" />
                </Box>
                <VStack flexGrow={1} spacing={7}>
                    {
                        [1,2,3,4,5].map(index => (
                            <HStack spacing={2} cursor="pointer" key={index}>
                                <SkeletonCircle  width="50px" height="50px"  backgroundColor="#838383" color="#FAFAFA"/>
                                <VStack spacing={3}>
                                    <Skeleton >
                                        <Text color="#000000" fontSize="18px" textAlign="center">{"friend name"}</Text>
                                    </Skeleton>
                                    <Skeleton >
                                        <Text color="#000000" fontSize="14px" textAlign="center">{"exmaple@email.com"}</Text>    
                                    </Skeleton>           
                                </VStack>
                            </HStack>
                        ))
                    }
                </VStack>
            </VStack>
        )
    // render layout if data is exist.
    return (
        <VStack height="100vh" borderRight="1px solid #838383" px="45px">
            <HStack spacing={3} marginTop="85px" >
                <Avatar name={user.name} width="100px" height="100px"  backgroundColor="#838383" color="#FAFAFA"/>
                <Box>
                    <Text color="#000000" fontSize="26px" textAlign="center">{user.name}</Text>
                    <Text color="#000000" fontSize="18px" textAlign="center">{user.email}</Text>
                </Box>
            </HStack>
            <Box py="25px" width="100%">
                <Divider borderColor="#838383" />
            </Box>
            <VStack flexGrow={1} spacing={7}>
                {
                    friends.map(friend => (
                        <HStack 
                            spacing={2} 
                            cursor="pointer"
                            key={friend.email}
                            onClick={()=> { dispatch(ActionCreators.control.changeCurrentFriend(friend.email)) }}
                        >
                            <Avatar name={friend.name} width="50px" height="50px"  backgroundColor="#838383" color="#FAFAFA"/>
                            <Box>
                                <Text color="#000000" fontSize="18px" textAlign="center">{friend.name}</Text>
                                <Text color="#000000" fontSize="14px" textAlign="center">{friend.email}</Text>               
                            </Box>
                        </HStack>
                    ))
                }
            </VStack>
        </VStack>
    );
};

export default User;