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
            newState.friends = newState.friends.map((friend) =>{
                if(friend.email === action.payload.friend) {
                    return {
                        ...friend, message: action.payload.message,
                    }
                }
                return friend;
            })
            break;
        case cache.receiveMessage:
            newState.friends = newState.friends.map((friend) => {
                if(friend.email === action.payload.sender) {
                    return {
                        ...friend,
                        message: [...friend.message, {
                            sender: action.payload.sender, 
                            reciver: newState.user.email,
                            content: action.payload.message,
                            timestamp: action.payload.timestamp
                        }]
                    }
                }
                return friend;
            })
            break;
        case cache.sendMessage:
            newState.friends = newState.friends.map((friend) => {
                if(friend.email === action.payload.reciver) {
                    return {
                        ...friend,
                        message: [...friend.message, {
                            sender: newState.user.email, 
                            reciver: action.payload.reciver,
                            content: action.payload.message,
                            timestamp: action.payload.timestamp
                        }]
                    }
                }
                return friend;
            })
            break;
    }
    return newState;
}