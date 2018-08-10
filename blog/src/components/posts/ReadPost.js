import React from 'react';
import {Link} from 'react-router-dom';

import './posts.css';
import {connect} from 'react-redux';
import { readPost } from '../../actions';

class ReadPost extends React.Component{

    componentDidMount(){
        this.props.readPost(this.props.match.params.id)
    }
    render(){        
        return(
            this.props.post ?
                <div className="readPost">
                    <Link to="/posts" >Back</Link>
                    <p>{this.props.post.text}</p>
                    <p> {this.props.post.postedBy} </p>
                    {this.props.post ? this.props.post.tags.map((i, index) => <li key={index}>#{i} </li>) : null}
                </div>
            : <div className="readPost"> loading </div>
        )
    }
}
const mapStatetoProps = state=>{
    return{
        post: state.post
    }
  }
export default connect(mapStatetoProps, { readPost })(ReadPost);
  