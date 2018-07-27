import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

// import './posts.css'

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

class NewUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
            name: this.state.text,
        }
        axios.post(`http://localhost:8000/user`, newPost)
        .then(result => {
                this.props.history.push('/users')
        })
        .catch(error => console.log(error));
    }
    render(){
        return(
            <form className="newUser">
                <input type="text" name="text" id="text" placeholder='Add User' value={this.state.text} onChange={this.handleInput} required autoComplete='off'/>
                <input type="submit" value="Add User" onClick={this.addPost} className='newUser__submit' />
                <NavLink to='/users' > Cancle </NavLink>
            </form>
        )
    }
    

}
export default NewUser;