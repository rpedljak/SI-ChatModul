import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-field">
                <input className="input-group mb-3 message-input" type="text" style={inputStyle}
                placeholder="Write something..." onChange={this.handleChange} value={this.state.message} />
                <input className="btn btn-outline-primary" style={buttonStyle} type="submit" value="Send" />
            </form>
        )
    }
} 

const buttonStyle = {
    height: '40%',
    marginLeft: '10px'
}

const inputStyle = {
    width: '100%',
    padding: '0'
}

export default Input;