import * as Type from "./type";

export const control = {
    switchLoginAndRegister: () => ({
        type: Type.control.switchLoginAndRegister
    })
}

export const authForm = {
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