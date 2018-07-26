import React, { Component } from 'react';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';

// components
import PostList from './components/PostList';
import UserList from './components/user/UserList';
import Header from './components/header/Header';
import TopBar from './components/topBar/TopBar';
import Tabs from './components/Tabs/Tabs';
import './App.css';
class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    axios('http://localhost:8000/posts')
    .then(result =>  this.setState({posts: result.data.posts}))
    .catch(error => console.log(error));
  }
  render() {
    // console.log('state from app: ',this.state)
    
    return (
      <dev className="blog">
      <TopBar />
      <Header />
      <Tabs />
      <Route exact path='/' component={()=> <Redirect to='/posts' />} />
      <Route path='/posts' component={
        (props) => <PostList {...props} posts={this.state.posts}/>
      }/>
      <Route path='/users' component={
        (props) => <UserList {...props} />
      }/>

      </dev>
    );
  }
}

export default App;
