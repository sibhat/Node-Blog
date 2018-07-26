import React from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components';

// components
import Post from './Post';
import NewPost from './NewPost';
import ReadPost from './ReadPost';

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
const PostList = ({posts, filter}) => {
    // console.log("new posts with tag", posts)
    let posts1;
    if(filter !== 'all'){
        posts1 = posts.filter(post => (post.tags.includes(filter)))
    }else{
        posts1 = posts;
    }
    return(
        <React.Fragment>
        
            <Route exact path='/posts' component={() => {
                return (
                <div className='posts'>
                    <NavLink to='posts/new' > Post new Note </NavLink>
                    <NavLink to='Users' > See all users </NavLink>
                    <div className="cards-container">
                        {posts1.map(post =>  <Post key={post.id} post={post} />)}
                    </div>
                </div>)
            }} />

            <Route exact path='/posts/new' render={(props) => (<NewPost {...props}/>)} />
            <Route exact path='/posts/:id' render={(props) => (<ReadPost {...props}/>)} />

        </React.Fragment>
        
    )
}
export default PostList;