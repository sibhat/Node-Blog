import axios from 'axios';

export const ADD__POST = 'ADDPOST';
export const UPDATE__POST = 'UPDATEPOST';
export const DELETE__POST = 'DELETEPOST';

export const GET__USERS = 'GETUSERS';
export const READ__USER = 'READUSER';
export const UPDATE__USER = 'UPDATEUSER';
export const DELETE__USER = 'DELETEUSER';

const BASE__URL = 'http://localhost:8000/api';


const handleAddPost = data =>{
    return{
        type: ADD__POST,
        data
    }
}
const handleUserPost = data =>{
    return{
        type: READ__USER,
        data
    }
}

export const addPost = (data) =>{
    return function(dispatch){
        axios.post(`${BASE__URL}/posts`, data)
        .then(result => {
            dispatch(handleAddPost(result.data.PostID))
            console.log('add_post action index: ', result)
        })
        .catch(error => console.log("add_post action error", error.massage))        
    }
}

export const deletePost = id => {
    return{
        type: DELETE__POST,
        id
    }
}

export const readUserPost = id =>{
    return function(dispatch){
        axios
            .get(`${BASE__URL}/user/${id}/post`)
            .then(result => {
                console.log('readuserpost action result: ', result);
                dispatch(handleUserPost(result.data.Users))
            })
            .catch(error => console.log(`error on reading user id ${id}`, error))
    }
}