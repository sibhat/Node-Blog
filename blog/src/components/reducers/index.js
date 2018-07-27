import { RECEIVE_POSTS, READ__POST } from '../actions/index'
const intialState = {
    posts: []
}
export default function rootReducer (state=intialState, action){
    // debugger;
    switch(action.type){
        case RECEIVE_POSTS:
            return {...state, posts: action.data}
        case READ__POST:
            return {...state, posts: action.data}
        default:
            return state;
    }

}