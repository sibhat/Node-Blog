import { UPDATE__USER, ADD__POST, READ__USER } from '../actions'
const intialState = {
    posts: []
}
export default function userReducer (state=intialState, action){
    // debugger;
    console.log("action dispatched like: ", action)
    switch(action.type){
        case ADD__POST:
            return{...state, user: [...state.user, action.data]}
        case UPDATE__USER:
            return {...state, post: action.data}
        case READ__USER:
            return{...state, user: action.data}
        default:
            return state;
    }

}