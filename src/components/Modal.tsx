import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/reducer";
import * as ActionCreators from "../app/actions/creator";
import { Modal, ModalOverlay,  ModalContent, ModalHeader, ModalBody, ModalFooter, Icon, Button } from "@chakra-ui/react";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoMdAlert } from "react-icons/io"

const ModelDialog: React.FC = () => {
    const dispatch = useDispatch();
    const modal = useSelector((root: RootState) => root.control.modal);
    return (
        <Modal isOpen={modal.flag} onClose={() => { dispatch(ActionCreators.control.taggleModal(false)) }}>
            <ModalOverlay/>
            <ModalContent
                backgroundColor="#FAFAFA"
            >
                <ModalHeader color="#000000" display="flex" justifyContent="center" alignItems="center">
                    {
                        modal.type === "error" 
                        ? <Icon color="#ff3a3a" as={IoMdAlert}  width="50px" height="50px" marginRight="25px"/>
                        : <Icon color="#146CF0" as={MdCheckCircleOutline} width="50px" height="50px" marginRight="25px"/>
                    }
                    {modal.title}
                </ModalHeader>
                {modal.body 
                    ? (
                        <ModalBody color="#000000">
                            {modal.body}
                        </ModalBody>
                    ) : null
                }
                <ModalFooter color="#000000">
                    <Button 
                        backgroundColor="#1EB8F4"
                        color="#FFFFFF"
                        _active={{color:"#FFFFFF", background:"#1EB8F4"}}
                        _hover={{color:"#FFFFFF", background:"#1EB8F4"}}
                        onClick={() => { dispatch(ActionCreators.control.taggleModal(false)) }}
                    >
                        {"確定"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModelDialog;