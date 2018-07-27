import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

// import './posts.css'
class ReadUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: ' {author name} ',
            texts: []
        }
    }
    componentDidMount(){
        axios(`http://localhost:8000/user/${this.props.match.params.id}`)
        .then(result => (
            axios(`http://localhost:8000/user/${result.data.Users.id}/post/`)
            .then(resultWithPosts => (
                this.setState({
                    user: result.data.Users.name,
                    texts: resultWithPosts.data.Users
                })
            ))
            
        ))
        
    }
    render(){
        const posts = this.state.texts.map((e, i) => {
            return <p key={i}> {e.text} </p>
        })
        return(
            <div className="user">
                <Link to="/users" > back</Link>
                <p>Posts by {this.state.user} are </p>
                {posts}
            </div>
        )
    }
    

}
export default ReadUser;