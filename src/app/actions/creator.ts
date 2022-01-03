import axios from "axios";
import * as Type from "./type";
import { RootState } from "../reducer";
import * as API from "../../api";

export const control = {
    switchLoginAndRegister: () => ({
        type: Type.control.switchLoginAndRegister
    }),
    taggleAuth: (flag: boolean = true) => ({
        type: Type.control.taggleAuth,
        payload: flag
    }),
    taggleModal: (flag: boolean = true, type: string ="success", title: string = "", body: string="")  => ({
        type: Type.control.taggleModal,
        payload: { flag, type, title, body }
    })
}

export const authForm = {
    clearForm: () => ({
        type: Type.authForm.clearForm
    }),
    changeEmail: (email: string) => ({
        type: Type.authForm.changeEmail,
        payload: email
    }),
    changeName: (name: string) => ({
        type: Type.authForm.changeName,
        payload: name
    }),
    changePassword: (password: string) => ({
        type: Type.authForm.changePassword,
        payload: password
    }),
    changePasswordCheck: (passwordCheck: string) => ({
        type: Type.authForm.changePasswordCheck,
        payload: passwordCheck
    })
}

export const request = {
    login: () => {
        return async (getState: () => RootState, dispatch: Function) => {
            try{
                const authForm = getState().authForm;
                await API.login(authForm.email, authForm.password);
                dispatch(control.taggleAuth());
            }catch(err: any){
                if(axios.isAxiosError(err)) {
                    if(err.response?.status === 404) {
                        dispatch(control.taggleModal(
                            true,"error", "使用者名稱錯誤"
                        ))
                        return;
                    }else if (err.response?.status === 402) {
                        dispatch(control.taggleModal(
                            true, "error", "使用者密碼錯誤"
                        ))
                        return;
                    }
                }
                dispatch(control.taggleModal(
                    true, "error", "發生未知的錯誤，請再試一次"
                ))
            }
        }
    },
    register: () => {
        return async (getState: ()=> RootState, dispatch: Function) => {
            try{
                const authForm = getState().authForm;
                await API.register(authForm.email, authForm.name, authForm.password);
                dispatch(control.switchLoginAndRegister());
            }catch (err: any) {
                if(axios.isAxiosError(err)) {
                    if(err.response?.status === 400) {
                        dispatch(control.taggleModal(
                            true, "error", "信箱已經被使用"
                        ))
                        return;
                    }
                }
                dispatch(control.taggleModal(
                    true, "error", "發生未知的錯誤，請再試一次"
                ))
            }
        }
    }
}