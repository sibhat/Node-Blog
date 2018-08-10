import {combineReducers} from 'redux';
import user from '../components/user/reducers'
import { RECEIVE_POSTS, READ__POST } from '../actions'
const intialState = {
    posts: []
}
 function post (state=intialState, action){
    // debugger;
    switch(action.type){
        case RECEIVE_POSTS:
        return {...state, posts: action.data}
        case READ__POST:
            return {...state, post: action.data}
        default:
            return state;
    }

}
export default combineReducers({post, user})