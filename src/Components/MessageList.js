import React, { Component } from 'react';
import '../styles/MessageList.css';

class MessageList extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <ul style={listStyle} className="list-group message-list">
                {this.props.messages.map((message, index) => (
                    <li className="list-group-item" style={messageStyle} key={index}>
                        <h4 className="message-sender" onClick={this.props.openPrivateChat}>{message.senderId}</h4>
                        <p style={messageTextStyle} className="message-text">{message.text}</p>
                    </li>
                ))}
                <li></li>
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </ul>
        )
    }
}

const messageTextStyle = {
    color: 'black',
    border: "1px solid #7856AD",
    padding: '10px',
    width: 'auto'
}

const listStyle = {
    overflowX: 'hidden',
    height: '100%',
    textAlign: 'left'
}

const messageStyle = {
    alignContent: 'center'
}
export default MessageList;