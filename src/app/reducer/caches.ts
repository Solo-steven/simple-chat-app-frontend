import { cache } from "../actions/type";

export interface CacheState {
    user: { name: string; email: string, imgUrl: string | null}
    friends: Array<{
        name: string, 
        email: string, 
        imgUrl: string | null
        message: Array<{ 
            sender: string,  
            reciver: string ,
            content: string, 
            timestamp: string
        }>
    }>
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
            newState.friends = [...action.payload.friends]
            break;
        case cache.fetchMessage:
            let i =0 ;
            for(i=0;i<newState.friends.length ; ++i) {
                if(newState.friends[i].email === action.payload.friend)
                    break;
            }
            if(i === newState.friends.length)
                break;
            newState.friends = [
                ...newState.friends.slice(0, i), 
                { ...newState.friends[i], message: action.payload.message}, 
                ...newState.friends.slice(i+1, newState.friends.length)
            ]
            break;
    }
    return newState;
}