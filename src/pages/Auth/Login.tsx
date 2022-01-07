import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/reducer";
import * as ActionCreators from "../../app/actions/creator";
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Button, Text } from "@chakra-ui/react";
import { MdEmail, MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorFlags, setErrorFlags] = useState([false, false]);
    const authForm = useSelector((root: RootState) => root.authForm);
    const authFlag = useSelector((root: RootState) => root.control.auth.flag);
    const dispatch = useDispatch();
    /** Clear form value when mount */
    useEffect(() => {
        dispatch(ActionCreators.authForm.clearForm())
    }, [dispatch]);
    if(authFlag) 
        return <Redirect to={{
            pathname: "/dashboard",
            state: { from: "login" },
        }} />
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
                {"Weclome Back"}
            </Text>
            <InputGroup marginBottom="30px">
                <InputLeftElement
                    color="#000000"
                    children={<Icon as={MdEmail}/>}
                />
                <Input 
                    _placeholder={{color: "#bbbbbb"}}
                    placeholder="信箱"
                    isInvalid={errorFlags[0]}
                    value={authForm.email}
                    color="#000000"
                    border="1px solid #000000" 
                    borderColor="#000000" 
                    _hover={{border: "1px solid #000000"}}
                    onChange={(e) => { 
                        if(errorFlags[0]) setErrorFlags(pre => [ false, pre[1]])
                        dispatch(ActionCreators.authForm.changeEmail(e.target.value)) 
                   } }
                />
            </InputGroup>
            <InputGroup marginBottom="10px">
                <InputLeftElement
                    color="#000000"
                    children={<Icon as={MdLock}/>}
                />
                <Input 
                    _placeholder={{color: "#bbbbbb"}}
                    placeholder="密碼"
                    type={showPassword ? "text" : "password"}
                    isInvalid={errorFlags[1]}
                    value={authForm.password}
                    color="#000000"
                    border="1px solid #000000" 
                    borderColor="#000000" 
                    _hover={{border: "1px solid #000000"}}
                    onChange={(e) => { 
                        if(errorFlags[1]) setErrorFlags(pre => [pre[0], false]);
                        dispatch(ActionCreators.authForm.changePassword(e.target.value))
                    }}
                />
                <InputRightElement
                    cursor="pointer"
                    onClick={() => setShowPassword(pre => !pre)}
                    color="#000000"
                    children={<Icon as={ showPassword ? AiFillEye: AiFillEyeInvisible }/>}
                />
            </InputGroup>
            <Text
                width="100%"
                color="#838383"
                fontSize="14px"
                textAlign="right"
                cursor="pointer"
                marginBottom="50px"
            >
                {"忘記密碼？"}
            </Text>
            <Button
                color="#FFFFFF"
                background="#146CF0"
                display="block"
                width="100%"
                _hover={{color:"#FFFFFF", background:"#146CF0"}}
                _active={{color:"#FFFFFF", background:"#146CF0"}}
                marginBottom="15px"
                onClick={() => {
                    if( !authForm.email ||  !authForm.password) {
                        setErrorFlags([!authForm.email, !authForm.password]);
                        return;
                    }
                    dispatch(ActionCreators.request.login())
                }}
            >
                {"登入"}
            </Button>
            <Text
                color="#838383"
                fontSize="14px"
                textAlign="center"
                cursor="pointer"
                marginBottom="70px"
                onClick={()=> dispatch(ActionCreators.control.switchLoginAndRegister())}
                userSelect="none"
            >
                {"還沒有帳號嗎？那來註冊吧！"}
            </Text>
        </Box>
    );
};

export default Login;
