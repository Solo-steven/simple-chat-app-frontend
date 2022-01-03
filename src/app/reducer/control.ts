import { control } from "../actions/type";

export interface ControlState  {
    switchLoginAndRegisterFlag: boolean;
    authFlag: boolean,
    modal: {
        flag: boolean,
        type: string,
        title: string,
        body: string,
    }
};

const initialState: ControlState = {
    switchLoginAndRegisterFlag: false,
    authFlag: false,
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
        case control.taggleAuth:
            newState.authFlag = action.payload;
            break;
        case control.taggleModal:
            newState.modal = { ...action.payload};
            break;
        default:
            break;
    }
    return newState;
}