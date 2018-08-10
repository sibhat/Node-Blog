import React from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// components
import NewUser from './NewUser';
import ReadUser from './ReadUser';
import './users.css';

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
const UsersLink = styled(Link)`
display: block;
text-decoration: none;
color: #333;
font-size: 12px;
letter-spacing: 2px;
cursor: pointer;
font-weight: bold;
&:hover{
    text-decoration: underline;
}
`;
class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            users: [],
        }
    }
    componentDidMount(){
        axios(`http://localhost:8000/api/user`)
        .then(result => this.setState({
            users: result.data.Users
        }))
       
        
    }
    render() {
        // console.log('userlist state: ', this.state.users)
        
        return(
            <div className="users">
                <Route exact path='/users' component={() => {
                    return (
                        <React.Fragment>
                            <h1>Users list</h1>
                            <NavLink to='users/new' > add new User </NavLink>
                            <NavLink to='/posts' > Read Posts </NavLink>
                            <div className="users__list">
                                {this.state.users.map(element => <UsersLink to={`/users/read/${element.id}`} key={element.id}> <p > {element.name} {element.userId}</p> </UsersLink>)}
                            </div>
                        </React.Fragment>)
                    }} />

                <Route exact path='/users/new' component={NewUser} />
                <Route exact path='/users/read/:id' component={ReadUser} />
            </div>

    )
    }
}
export default UserList;