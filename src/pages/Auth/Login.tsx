import React from "react";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../app/actions/creator";
import { Box, Input, InputGroup, InputLeftElement, Icon, Button, Text } from "@chakra-ui/react";
import { MdEmail, MdLock } from "react-icons/md"

const Login: React.FC = () => {
    const dispatch = useDispatch();
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
                <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
            </InputGroup>
            <InputGroup marginBottom="10px">
                <InputLeftElement
                    color="#000000"
                    children={<Icon as={MdLock}/>}
                />
                <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
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
            >
                {"還沒有帳號嗎？那來註冊吧！"}
            </Text>
        </Box>
    );
};

export default Login;
