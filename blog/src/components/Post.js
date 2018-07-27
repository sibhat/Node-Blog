import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import './posts.css'

const UserLink = styled(Link)`
    padding-left: 10px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    &:hover{
        padding-bottom: 5px;
        border-bottom: 1px solid black;
    }
`;
const PostLink = styled(Link)`
    padding-left: 10px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    margin-top: 20px;
    transition: all .3s;
    &:hover{
        padding-bottom: 2px;
        border-bottom: 1px solid black;
        width: 80px;
    }
`;
class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            user: ''
        }
    }
    componentDidMount(){
        axios(`http://localhost:8000/user/${this.props.post.userId}`)
        .then(result => {
                // console.log('get user: ', result.data.Users)
                this.setState({
                    text: this.props.text,
                    user: "By " + result.data.Users.name
                })
        })
    }
    render(){
        return(
            <div className="card">
                <div className="headline">{this.props.post.text} </div>
                <PostLink to={`posts/${this.props.post.id}`}> Read more </PostLink>              
                <div className="author">
                    <div className="img-container">
                        <img src="./assets/fido.jpg" alt=""/>
                    </div>
                    <span> <UserLink to={`users/read/${this.props.post.userId}`}> {this.state.user} </UserLink> </span>
                </div>
            </div>
        )
    }
    

}
export default Post;