import { combineReducers } from "redux";
import { ControlReducer, ControlState } from "./control";
import { AuthFormState, AuthFormReducer } from "./authForm";

export interface RootState  {
    control : ControlState;
    authForm: AuthFormState;
}

export const RootReducer = combineReducers({
    control: ControlReducer,
    authForm: AuthFormReducer,
})