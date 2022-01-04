import React from "react";
import { Icon, VStack } from "@chakra-ui/react";
import { MdPersonAddAlt1, MdPerson } from "react-icons/md";

const Sidebar: React.FC = () => {
    return (
        <VStack
            height="100%"
            width="90px"
            background="linear-gradient(180deg, #1EB8F4 0%, #15D9F3 49.48%, #146CF0 100%)"
            spacing={5}
            padding="30px"
        >
            <Icon as={MdPerson} width="35px" height="35px"/>
            <Icon as={MdPersonAddAlt1}  width="35px" height="35px"/>
        </VStack>
    );
};

export default Sidebar;