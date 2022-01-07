import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Button, Text, VStack } from "@chakra-ui/react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState([false, false]);
    const [errorFlags, setErrorFlags] = useState([false, false, false, false]);
    const authForm = useSelector((root: RootState) => root.authForm);
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
                        _placeholder={{color: "#bbbbbb"}}
                        placeholder="使用者名稱"
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
                        _placeholder={{color: "#bbbbbb"}}
                        placeholder="信箱"
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
                        _placeholder={{color: "#bbbbbb"}}
                        placeholder="密碼"
                        type={showPassword[0] ? "text" : "password"}
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
                    <InputRightElement
                        cursor="pointer"
                        onClick={() => setShowPassword(pre => [!pre[0], pre[1]])}
                        color="#000000"
                        children={<Icon as={ showPassword[0] ? AiFillEye: AiFillEyeInvisible }/>}
                    />
                </InputGroup>
                    <InputGroup >
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdLock}/>}
                    />
                    <Input 
                        _placeholder={{color: "#bbbbbb"}}
                        placeholder="再輸入一次密碼"
                        type={showPassword[1] ? "text" : "password"}
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
                    <InputRightElement
                        cursor="pointer"
                        onClick={() => setShowPassword(pre => [pre[0], !pre[1]])}
                        color="#000000"
                        children={<Icon as={ showPassword[1] ? AiFillEye: AiFillEyeInvisible }/>}
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
                    if(authForm.password !== authForm.passwordCheck) {
                        setErrorFlags((pre) => {
                            const newFlags = [...pre];
                            newFlags[2] = true;
                            newFlags[3] = true;
                            return newFlags
                        })
                        return;
                    }
                    dispatch(ActionCreators.request.register());
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
                userSelect="none"
            >
                {"已經有帳號了？那去登入吧！"}
            </Text>
        </Box>
    );
};

export default Register;
