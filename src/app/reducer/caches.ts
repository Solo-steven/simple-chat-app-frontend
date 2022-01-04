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
    let newState= Object.assign({},state), index = 0;
    switch(action.type) {
        case cache.fetchUserInfo:
            newState.user = action.payload.user;
            newState.friends = [...action.payload.friends]
            break;
        case cache.fetchMessage:
            for(index=0;index<newState.friends.length ; ++index) {
                if(newState.friends[index].email === action.payload.friend)
                    break;
            }
            if(index === newState.friends.length) break;
            newState.friends = [
                ...newState.friends.slice(0, index), 
                { ...newState.friends[index], message: action.payload.message}, 
                ...newState.friends.slice(index+1, newState.friends.length)
            ]
            break;
        case cache.receiveMessage:
            for(index=0;index<newState.friends.length ; ++index) {
                if(newState.friends[index].email === action.payload.sender)
                    break;
            }
            if(index === newState.friends.length) break;
            newState.friends[index] = {
                ...newState.friends[index],
                message: [
                    ...newState.friends[index].message, 
                    {  
                       sender: action.payload.sender, 
                       reciver: newState.user.email,
                       content: action.payload.message,
                       timestamp: action.payload.timestamp
                    }
                ]
            }
            break;
        case cache.sendMessage:
            for(index=0;index<newState.friends.length ; ++index) {
                if(newState.friends[index].email === action.payload.reciver)
                    break;
            }
            if(index === newState.friends.length) break;
            newState.friends[index] = {
                ...newState.friends[index],
                message: [
                    ...newState.friends[index].message, 
                    {  
                       sender: newState.user.email, 
                       reciver: action.payload.reciver,
                       content: action.payload.message,
                       timestamp: action.payload.timestamp
                    }
                ]
            }
    }
    return newState;
}