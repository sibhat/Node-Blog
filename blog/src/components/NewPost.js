import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './posts.css'
class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            user: '',
        }
    }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addPost = e => {
        e.preventDefault();
        const newPost = {
            text: this.state.text,
            userId: this.state.user
        }
        axios.post(`http://localhost:8000/posts`, newPost)
        .then(result => {
                console.log('get user: ', result)
                this.props.history.push('/')
        })
        .catch(error => console.log(error));
    }
    render(){
        return(
            <form className="newPost">
                <Link to='/' > cancle </Link>
                <input type="text" name="text" id="text" placeholder='text' value={this.state.text} onChange={this.handleInput} required autoComplete='off'/>
                <input type="number" name="user" id="user" placeholder='userId' value={this.state.user} onChange={this.handleInput}  required/>
                <input type="submit" value="Add Post" onClick={this.addPost}/>
            </form>
        )
    }
    

}
export default NewPost;