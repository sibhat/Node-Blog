import React from 'react';
import axios from 'axios';
import './tabs.css';
import Tab from './Tab';
export default class Tabs extends React.Component{
  constructor(props){
    super(props);
        
    this.state={
      tags: [],
      activeTab: null
    }
  }
  componentDidMount(){
    axios('http://localhost:8000/tags')
    .then(result => {
      console.log({"result": result})
      this.setState({
         tags: result.data.tags, activeTab: result.data.tags[0]
      })
    })
    .catch(error => console.log({"error": error}))
  }
  activate = e => {
    console.log({"clicked id": e})
    this.setState({activeTab: this.state.tags[e - 1]});
  }
  render(){
    return(
        <div className="tabs">
          <div className="topics">
          {this.state.tags.map(e => 
            <Tab key={e.id} onClick={this.activate} active={this.state.activeTab} tab={e} />
            )}
          </div>
        </div>
    )
  }
  
}

