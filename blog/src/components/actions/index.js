import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const READ__POST = 'READPOST';
export const UPDATE__POST = 'UPDATEPOST';
export const DELETE__POST = 'DELETEPOST';

export const GET__USERS = 'GETUSERS';
export const READ__USER = 'READUSER';
export const UPDATE__USER = 'UPDATEUSER';
export const DELETE__USER = 'DELETEUSER';
const BASE__URL = 'http://localhost:8000';

const handleGet = (data) => {
    return{
        type: RECEIVE_POSTS,
        data
    }
}
const handleReadPost = (data) => {
    return{
        type: READ__POST,
        data
    }
}
export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
  })
  
export const getPosts = e => {
    return function(dispatch){
        let posts = []
        dispatch({type: REQUEST_POSTS})
        axios.get(`${BASE__URL}/posts`)
        .then(result => {
            posts = result.data.posts;
            dispatch(handleGet(posts))
            posts = posts.map(e => {
                axios(`${BASE__URL}/posts/${e.id}`)
                .then(resultWithTag => {
                    e.tags = resultWithTag.data.posts.tags
                })
            });
        })
        .catch(error => console.log("get post error", error))
    }
}
export const readPost = id => {
    return function(dispatch){
        axios.get(`${BASE__URL}/posts/${id}`)
        .then(result => {
            dispatch(handleReadPost(result.data.posts))
            console.log('readpost action: ', result.data)
        })
        .catch(error => console.log("get post error", error))
        
    }
}
export const updatePost = id => {
    return{
        type: UPDATE__POST,
        id
    }
}
export const deletePost = id => {
    return{
        type: DELETE__POST,
        id
    }
}
