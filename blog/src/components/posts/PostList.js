import React from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {getPosts} from '../../actions';

// components
import Post from './Post';
import NewPost from './NewPost';
import ReadPost from './ReadPost';
import Tabs from '../Tabs/Tabs';

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
class PostList extends React.Component {

    constructor(){
        super();
        this.state = {
          activeTab: 'all'
        }
      }
      componentDidMount(){
          this.props.getPosts();
      }
      activate = e => {
        this.setState({activeTab: e});
      }
      render(){
        let {posts} = this.props
        posts = this.state.activeTab !== 'all' ? posts.filter(post => post.tags.includes(this.state.activeTab)) : posts;
        return(
            <React.Fragment>
                <Tabs onClick={this.activate} activeTab={this.state.activeTab}/>
                <Route exact path='/posts' component={() => {
                    return (
                        <div className='posts'>
                        <NavLink to='posts/new' > Post new Note </NavLink>
                        <NavLink to='Users' > See all users </NavLink>
                        <div className="cards-container">
                            {posts.map(post =>  <Post key={post.id} post={post} />)}
                        </div>
                    </div>)
                }} />
                <Route exact path='/posts/new' component={NewPost}/>
                <Route exact path='/posts/:id' component={ReadPost}/>
            </React.Fragment>
        )
    }
}

const mapStatetoProps = state=>{
    console.log('post list state is: ', state)
    return{
      posts: state.post.posts
    }
  }
export default connect(mapStatetoProps, {getPosts})(PostList);

