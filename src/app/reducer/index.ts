import { combineReducers } from "redux";
import { ControlReducer, ControlState } from "./control";

export interface RootState  {
    control : ControlState;
}

export const RootReducer = combineReducers({
    control: ControlReducer
})