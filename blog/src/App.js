import React, { Component } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { getPosts } from './components/actions';

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
      activeTab: 'all'
    }
  }
  componentDidMount(){
    this.props.getPosts();
  }
  activate = e => {
    this.setState({activeTab: e});
  }
  render() {
    return (
      <div className="blog">
        <TopBar />
        <Header />
        <Tabs activeTab={this.state.activeTab} onClick={this.activate}/>
        <Route exact path='/' component={()=> <Redirect to='/posts' />} />

        <Route path='/posts' component={
          (props) => <PostList {...props} filter={this.state.activeTab}/>
        }/> 
        <Route path='/users' component={UserList} />
      </div>
    );
  }
}
const mapStatetoProps = state=>{
  return{
  }
}
export default withRouter(connect(mapStatetoProps, { getPosts })(App));
