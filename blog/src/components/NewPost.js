import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import './posts.css'
const NavLink = styled(Link)`
display: inline-block;
text-decoration: none;
color: #fff;
background-color: #333;
margin: 5px 5px;
padding: 2px 10px;
font-size: 12px;
letter-spacing: 2px;
cursor: pointer;
font-weight: bold;
&:hover{
    text-decoration: underline;
}
`;
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
                <input type="text" name="text" id="text" placeholder='text' value={this.state.text} onChange={this.handleInput} required autoComplete='off'/>
                <input type="number" name="user" id="user" placeholder='userId' value={this.state.user} onChange={this.handleInput}  required/>
                <input type="submit" value="Add Post" onClick={this.addPost} className="newPost__submit"/>
                <NavLink to='/' > cancle </NavLink>
            </form>
        )
    }
    

}
export default NewPost;