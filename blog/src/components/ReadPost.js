import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

import './posts.css'
class ReadPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            user: '',
            tags: []
        }
    }
    componentDidMount(){
        axios(`http://localhost:8000/posts/${this.props.match.params.id}`)
        .then(result => {
                // console.log('get user: ', result)
                this.setState({
                    text: result.data.posts.text,
                    user: "By " + result.data.posts.postedBy,
                    tags: result.data.posts.tags
                })
        })
    }
    render(){
        console.log('readpost state tags: ', this.state.tags)
    const tags = this.state.tags ? this.state.tags.map((i, index) => <li key={index}> {i} </li>) : null;
        return(
            <div className="post">
                <Link to="/posts" > back</Link>
                <p>{this.state.text} {this.state.user}</p>
                {tags}
            </div>
        )
    }
    

}
export default ReadPost;