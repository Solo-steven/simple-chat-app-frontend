import { control } from "../actions/type";

export interface ControlState  {
    switchLoginAndRegisterFlag: boolean;
};

const initialState: ControlState = {
    switchLoginAndRegisterFlag: false,
}

export function ControlReducer(state: ControlState = initialState, action: any) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case  control.switchLoginAndRegister:
            newState.switchLoginAndRegisterFlag = !state.switchLoginAndRegisterFlag;
            break;
        default:
            break;
    }
    return newState;
}