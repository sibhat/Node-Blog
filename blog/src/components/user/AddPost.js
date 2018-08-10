import React from 'react';
import {connect} from 'react-redux';
import {addPost} from './actions'
class AddPost extends React.Component {
    constructor(){
        super();
        this.state = {
            note: ''
        }
    }
    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addPost = e =>{
        e.preventDefault();
        // if (e.key === 'enter'){
            this.props.dispatch( addPost({text: this.state.note, userId: this.props.id}) );
        // }
        this.setState({note: ''})
    }
    render(){
        // console.log("addpost props ",this.props)
        return(
            <div className="userRead__posts__form">
                <input type="text" name="note" id="note" 
                    placeholder={`what is in your mind ${this.props.name.split(' ')[0]}`}
                    value={this.state.note}
                    onChange={this.handleChange}
                    // onKeyPress={this.addPost}
                />
                <input type="submit" value="Post" className="userRead__posts__btn--submit" onClick={this.addPost}/>
            </div>
        )
    }
}
export default connect()(AddPost);
