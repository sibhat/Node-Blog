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
      posts: [],
      activeTab: 'all'
    }
  }
  componentDidMount(){
    let posts = [];
    axios('http://localhost:8000/posts')
    .then(result =>  {
      posts = result.data.posts;
      this.setState({posts: posts})
      posts = posts.map(element => {
        axios(`http://localhost:8000/posts/${element.id}`)
        .then(resultWithTags => {
          // console.log("resutl with tags: ", resultWithTags);
          element.tags = resultWithTags.data.posts.tags
        })
      });
    })
    .catch(error => console.log(error));
  }
  activate = e => {
    // console.log({"clicked id": e})
    this.setState({activeTab: e});
  }
  render() {
    // console.log("resutl without tag: ", this.state.posts);      
    return (
      <div className="blog">
        <TopBar />
        <Header />
        <Tabs activeTab={this.state.activeTab} onClick={this.activate}/>
        <Route exact path='/' component={()=> <Redirect to='/posts' />} />
        <Route path='/posts' component={
          (props) => <PostList {...props} posts={this.state.posts} filter={this.state.activeTab}/>
        }/>
        <Route path='/users' component={
          (props) => <UserList {...props} />
        }/>
      </div>
    );
  }
}

export default App;
