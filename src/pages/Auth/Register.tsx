import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { Box, Input, InputGroup, InputLeftElement, Icon, Button, Text, VStack } from "@chakra-ui/react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md"

const Register: React.FC = () => {
    const [errorFlags, setErrorFlags] = useState([false, false, false, false]);
    const authForm = useSelector((root: RootState) => root.authForm)
    const dispatch = useDispatch();
    /** Clear form value when mount */
    useEffect(() => {
        dispatch(ActionCreators.authForm.clearForm())
    }, [dispatch]);
    return (
        <Box
            borderRadius="30px"
            background="#FAFAFA"
            width="455px"
            padding="30px 60px"
        >
            <Text
                fontFamily="Rubik"
                fontWeight={900}
                fontSize="36px"
                color= "#000000"
                marginBottom="45px"
                textAlign="center"
            >
                {"Weclome You"}
            </Text>
            <VStack marginBottom="45px" spacing={7}>
                <InputGroup >
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdPerson}/>}
                    />
                    <Input 
                        isInvalid={errorFlags[0]}
                        value={authForm.name}
                        color="#000000"
                        border="1px solid #000000" 
                        borderColor="#000000" 
                        _hover={{border: "1px solid #000000"}}
                        onChange={(e) => { 
                            if(errorFlags[0]) {
                                setErrorFlags(pre => { 
                                    const newFlags = [...pre]; 
                                    newFlags[0] = false;
                                    return newFlags
                                })
                            }
                            dispatch(ActionCreators.authForm.changeName(e.target.value)) 
                        }}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdEmail}/>}
                    />
                    <Input 
                        isInvalid={errorFlags[1]}
                        value={authForm.email}
                        color="#000000"
                        border="1px solid #000000" 
                        borderColor="#000000" 
                        _hover={{border: "1px solid #000000"}}
                        onChange={(e) => { 
                            if(errorFlags[1]) {
                                setErrorFlags(pre => { 
                                    const newFlags = [...pre]; 
                                    newFlags[1] = false;
                                    return newFlags
                                })
                            }
                            dispatch(ActionCreators.authForm.changeEmail(e.target.value)) 
                        }}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdLock}/>}
                    />
                    <Input 
                        isInvalid={errorFlags[2]}
                        value={authForm.password}
                        color="#000000"
                        border="1px solid #000000" 
                        borderColor="#000000" 
                        _hover={{border: "1px solid #000000"}}
                        onChange={(e) => { 
                            if(errorFlags[2]) {
                                setErrorFlags(pre => { 
                                    const newFlags = [...pre]; 
                                    newFlags[2] = false;
                                    return newFlags
                                })
                            }
                            dispatch(ActionCreators.authForm.changePassword(e.target.value)) 
                        }}
                    />
                </InputGroup>
                    <InputGroup >
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdLock}/>}
                    />
                    <Input 
                        isInvalid={errorFlags[3]}
                        value={authForm.passwordCheck}
                        color="#000000"
                        border="1px solid #000000" 
                        borderColor="#000000" 
                        _hover={{border: "1px solid #000000"}}
                        onChange={(e) => { 
                            if(errorFlags[3]) {
                                setErrorFlags(pre => { 
                                    const newFlags = [...pre]; 
                                    newFlags[3] = false;
                                    return newFlags
                                })
                            }
                            dispatch(ActionCreators.authForm.changePasswordCheck(e.target.value))
                        }}
                    />
                </InputGroup>
            </VStack>
            <Button
                color="#FFFFFF"
                background="#146CF0"
                display="block"
                width="100%"
                _hover={{color:"#FFFFFF", background:"#146CF0"}}
                _active={{color:"#FFFFFF", background:"#146CF0"}}
                marginBottom="15px"
                onClick={()=> {
                    if(!authForm.name || !authForm.email || !authForm.password || !authForm.passwordCheck) {
                        setErrorFlags([!authForm.name ,!authForm.email , !authForm.password , !authForm.passwordCheck])
                        return;
                    }
                }}
            >
                {"註冊"}
            </Button>
            <Text
                color="#838383"
                fontSize="14px"
                textAlign="center"
                cursor="pointer"
                marginBottom="10px"
                onClick={()=> dispatch(ActionCreators.control.switchLoginAndRegister())}
            >
                {"已經有帳號了？那去登入吧！"}
            </Text>
        </Box>
    );
};

export default Register;
