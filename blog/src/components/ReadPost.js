import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

import './posts.css';
import {connect} from 'react-redux';
import { readPost } from './actions';

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
        // axios(`http://localhost:8000/posts/${this.props.match.params.id}`)
        // .then(result => {
        //         // console.log('get user: ', result)
        //         this.setState({
        //             text: result.data.posts.text,
        //             user: "By " + result.data.posts.postedBy,
        //             tags: result.data.posts.tags
        //         })
        // })
        this.props.readPost(this.props.match.params.id)
    }
    render(){
        console.log('readpost props: ', this.props);
        
    const tags = this.state.tags ? this.state.tags.map((i, index) => <li key={index}>#{i} </li>) : null;
        return(
            <div className="readPost">
                <Link to="/posts" > back</Link>
                <p>{this.state.text}</p>
                <p> {this.state.user} </p>
                {this.state.tags ? 'tags' : null}
                {tags}
            </div>
        )
    }
    

}
const mapStatetoProps = state=>{
    return{
        posts: state.posts
    }
  }
export default connect(mapStatetoProps, { readPost })(ReadPost);
  