import React from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';

// components
import NewUser from './NewUser';
import ReadUser from './ReadUser';

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            users: [],
        }
    }
    componentDidMount(){
        axios(`http://localhost:8000/user`)
        .then(result => this.setState({
            users: result.data.Users
        }))
       
        
    }
    render() {
        // console.log('userlist state: ', this.state.users)
        
        return(
            <React.Fragment>
                <Route exact path='/users' component={() => {
                    return (
                        <React.Fragment>
                            <h1>Users list</h1>
                            <Link to='users/new' > add new User </Link>
                            <Link to='/posts' > Read Posts </Link>
                            <div className="users">
                                {this.state.users.map(element => <Link to={`/users/${element.id}`}> <p key={element.id}> {element.name} {element.userId}</p> </Link>)}
                            </div>
                        </React.Fragment>)
                    }} />

                <Route exact path='/users/new' component={NewUser} />
                <Route exact path='/users/:id' component={ReadUser} />
            </React.Fragment>

    )
    }
}
export default UserList;