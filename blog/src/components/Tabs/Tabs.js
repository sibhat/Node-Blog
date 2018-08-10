import React from 'react';
import axios from 'axios';
import './tabs.css';
import Tab from './Tab';
export default class Tabs extends React.Component{
  constructor(props){
    super(props);
        
    this.state={
      tags: [{id: 0, tag: 'all'}]
    }
  }
  componentDidMount(){
    axios('http://localhost:8000/api/tags')
    .then(result => {
      // console.log({"result": result})
      this.setState({
         tags: [...this.state.tags, ...result.data.tags]
      })
      
    })
    .catch(error => console.log({"error": error}))
    // this.props.activeTab = this.state.activeTab ? this.state.activeTab : {};
  }
  
  render(){

    return(
        <div className="tabs">
          <div className="topics">
          {this.state.tags.map((e,index) => 
            <Tab key={e.id} onClick={this.props.onClick} active={this.props.activeTab} tab={e} index={index}/>
            )}
          </div>
        </div>
    )
  }
  
}

