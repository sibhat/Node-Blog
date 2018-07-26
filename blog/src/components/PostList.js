import React from 'react';
import {Route, Link} from 'react-router-dom';

// components
import Post from './Post';
import NewPost from './NewPost';
import ReadPost from './ReadPost';

import './posts.css'
const PostList = ({posts}) => {
    return(
        <React.Fragment>
        
            <Route exact path='/posts' component={() => {
                return (<React.Fragment>
                    <h1>Post list</h1>
                    <Link to='posts/new' > Post new Note </Link>
                    <Link to='Users' > See all users </Link>
                    <div className="cards-container">
                        {posts.map(element =>  <Post key={element.id} text={element.text} id={element.userId} postId={element.id}/> )}
                    </div>
                </React.Fragment>)
            }} />

            <Route exact path='/posts/new' render={(props) => (<NewPost {...props}/>)} />
            <Route exact path='/posts/:id' render={(props) => (<ReadPost {...props}/>)} />

        </React.Fragment>
        
    )
}
export default PostList;