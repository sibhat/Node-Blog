import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// import './posts.css'
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
                console.log('get user: ', result)
                this.props.history.push('/users')
        })
        .catch(error => console.log(error));
    }
    render(){
        return(
            <form className="newUser">
                <Link to='/users' > cancle </Link>
                <input type="text" name="text" id="text" placeholder='text' value={this.state.text} onChange={this.handleInput} required autoComplete='off'/>
                <input type="submit" value="Add Post" onClick={this.addPost}/>
            </form>
        )
    }
    

}
export default NewUser;