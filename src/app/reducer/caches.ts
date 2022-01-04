import { cache } from "../actions/type";

export interface CacheState {
    user: { name: string; email: string, imgUrl: string | null}
    friends: Array<{name: string, email: string, imgUrl: string | null}>
}

const initialState: CacheState={
    user: { name: "", email: "", imgUrl: null},
    friends: [],
}
export function CacheReducer(state: CacheState = initialState, action: any) {
    let newState= Object.assign({},state);
    switch(action.type) {
        case cache.fetchUserInfo:
            newState.user = action.payload.user;
            newState.friends = [...newState.friends, ...action.payload.friends]
            break;
    }
    return newState;
}