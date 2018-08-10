import React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {readUserPost} from './actions';

import UserProfile from './userProfile';
import AddPost from './AddPost';

import './users.css';

const ReadUser = ({user, match}) => (
    user?
    <div className="user">
        <div className="userRead">
            <div className="userRead__profile">
                <UserProfile data={user[0].postedBy}/>
                {/* <p>Posts by {this.state.user} </p> */}
            </div>
            <div className="userRead__posts">
                <AddPost name={user[0].postedBy} id={match.params.id}/>
                {  user ? user.map((e, i) => (
                    <div key={i} className="card"> "{e.text}"  </div>
                )) : <div> loadding </div>
                }
            </div>
            <div className="userRead__info">
                <Link to="/users" > back</Link>
            </div>
        </div>
    </div>
    : <div> Loading user </div> 
)
const mapStatetoProps = (state, ownProps) =>{    
    // readUserPost(ownProps.match.params.id);
    console.log('state is: ', state)
    return{
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) =>{
    return ({
        getUser: dispatch(readUserPost(ownProps.match.params.id))
    })
}
export default connect(mapStatetoProps, mapDispatchToProps)(ReadUser);