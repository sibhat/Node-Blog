import React, { Component } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// components
import PostList from './components/posts/PostList';
import UserList from './components/user/UserList';
import Header from './components/header/Header';
import TopBar from './components/topBar/TopBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="blog">
        <TopBar />
        <Header />
        <Route exact path='/' component={()=> <Redirect to='/posts'   />} />
        <Route path='/posts' component={PostList}/> 
        <Route path='/users' component={UserList} />
      </div>
    );
  }
}
export default withRouter(connect()(App));
