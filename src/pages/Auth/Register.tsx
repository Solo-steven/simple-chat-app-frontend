import React from "react";
import { useDispatch } from "react-redux";
import * as ActionCreators from "../../app/actions/creator";
import { Box, Input, InputGroup, InputLeftElement, Icon, Button, Text, VStack } from "@chakra-ui/react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md"

const Register: React.FC = () => {
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
                {"Weclome You"}
            </Text>
            <VStack marginBottom="45px" spacing={7}>
                <InputGroup >
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdPerson}/>}
                    />
                    <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdEmail}/>}
                    />
                    <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdLock}/>}
                    />
                    <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
                </InputGroup>
                    <InputGroup >
                    <InputLeftElement
                        color="#000000"
                        children={<Icon as={MdLock}/>}
                    />
                    <Input border="1px solid #000000" borderColor="#000000" _hover={{border: "1px solid #000000"}}/>
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
