import { combineReducers } from "redux";
import { ControlReducer, ControlState } from "./control";
import { CacheState, CacheReducer } from "./caches";
import { AuthFormState, AuthFormReducer } from "./authForm";

export interface RootState  {
    control : ControlState;
    cache: CacheState
    authForm: AuthFormState;
}

export const RootReducer = combineReducers({
    control: ControlReducer,
    cache: CacheReducer,
    authForm: AuthFormReducer,
})