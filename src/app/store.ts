import { createStore, applyMiddleware, Middleware } from "redux";
import { RootReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
 
const middleware: Middleware =  store => next => action => {
    if(typeof action === "function") {
        const { getState, dispatch } = store;
        action(getState, dispatch)
    }else {
        next(action);
    }
}

const store = createStore(RootReducer,  composeWithDevTools(applyMiddleware(middleware)));

export default store;