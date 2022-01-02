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

                    }else if (err.response?.status === 402) {
                        
                    }
                }
            }
        }
    }
}