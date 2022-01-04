import { control } from "../actions/type";

export interface ControlState  {
    switchLoginAndRegisterFlag: boolean;
    auth: {
        flag: boolean,
        token: string,
    },
    modal: {
        flag: boolean,
        type: string,
        title: string,
        body: string,
    }
};

const initialState: ControlState = {
    switchLoginAndRegisterFlag: false,
    auth: { 
        flag: false,
        token: "",
    },
    modal: {
        flag: false,
        type: "",
        title: "",
        body: "",
    },
}

export function ControlReducer(state: ControlState = initialState, action: any) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case  control.switchLoginAndRegister:
            newState.switchLoginAndRegisterFlag = !state.switchLoginAndRegisterFlag;
            break;
        case control.setAuth:
            newState.auth = {
                flag: true,
                token: action.payload,
            };
            break;
        case control.taggleModal:
            newState.modal = { ...action.payload};
            break;
    }
    return newState;
}