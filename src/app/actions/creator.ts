import axios from "axios";
import * as Type from "./type";
import { RootState } from "../reducer";
import * as API from "../../api";

export const control = {
    switchLoginAndRegister: () => ({
        type: Type.control.switchLoginAndRegister
    }),
    setAuth: (token: string) => ({
        type: Type.control.setAuth,
        payload: token
    }),
    taggleModal: (flag: boolean = true, type: string ="success", title: string = "", body: string="")  => ({
        type: Type.control.taggleModal,
        payload: { flag, type, title, body }
    }),
    changeCurrentFriend: (friend: string) => ({
        type: Type.control.changeCurrentFriend,
        payload: friend,
    })
}
export const cache = {
    fetchUserInfo: (
        user: {name: string, email: string, imgUrl: string | null}, 
        friends: Array<{name: string, email: string, imgUrl: string | null, message: Array<string>}>
    ) => ({
        type: Type.cache.fetchUserInfo,
        payload: {user, friends}  
    }),
    fetchMessage: (friend: string, message: Array<string>) => ({
        type: Type.cache.fetchMessage,
        payload: { friend, message }
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
                const { token } = await API.login(authForm.email, authForm.password);
                dispatch(control.setAuth(token));
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
    },
    getUserInfo: () => {
        return async (getState:() => RootState, dispatch: Function) => {
            try{
                const token = getState().control.auth.token;
                const data =  await API.getUserInfo(token);
                dispatch( cache.fetchUserInfo(
                    { name: data.name, email: data.email, imgUrl: data.imgUrl}, 
                    data.friends.map((friend: any) =>({...friend, message: []})))
                )
            }catch(err: any){
                console.log(err)
                dispatch(control.taggleModal(
                    true, "error", "發生未知的錯誤，請再試一次"
                ))
            }
        }
    },
    getMessage: () => {
        return async (getState: () => RootState, dispatch: Function) => {
            try {
                const token = getState().control.auth.token;
                const user = getState().cache.user.email;
                const friend = getState().control.currentFriend;
                const data = await API.getMessage(token, user, friend);
                dispatch(cache.fetchMessage(friend,data))
            }catch (err: any) {

            }
        }
    }
}
