import { authForm } from "../actions/type";

export interface AuthFormState  {
    email: string;
    name: string;
    password: string;
    passwordCheck: string;
}

const initialState: AuthFormState = {
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
};

export function AuthFormReducer(state: AuthFormState = initialState, action: any) {
    let newState = Object.assign({},state);
    switch (action.type) {
        case authForm.clearForm:
            newState = {...initialState};
            break;
        case authForm.changeEmail:
            newState.email = action.payload;
            break;
        case authForm.changeName:
            newState.name = action.payload;
            break;
        case authForm.changePassword:
            newState.password = action.payload;
            break;
        case authForm.changePasswordCheck:
            newState.passwordCheck = action.payload;
            break;
    }
    return newState;
}