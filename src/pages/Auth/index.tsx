import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/reducer";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Box, VStack, Text } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC = () => {
    const switchLoginAndRegisterFlag = useSelector((root: RootState) => root.control.switchLoginAndRegisterFlag);
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            background="
            conic-gradient(from 
                41.52deg at 50% 124.73%,
                #1EB8F4 -30.95deg, 
                #15D9F3 30.19deg,
                #146CF0 199.03deg, 
                #1EB8F4 329.05deg,
                #15D9F3 390.19deg)
            "
        >
            <VStack>
                <Text
                  fontFamily="Rubik"
                  fontStyle="normal"
                  fontWeight="500"
                  fontSize="36px"
                  marginBottom="30px"
                >
                    {"Free Chat"}
                </Text>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={switchLoginAndRegisterFlag as any}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade"
                    >
                        { 
                           switchLoginAndRegisterFlag ?   <Register/>: <Login/>
                        }
                    </CSSTransition>
                </SwitchTransition>
            </VStack>
        </Box>
    );
};

export default Auth;