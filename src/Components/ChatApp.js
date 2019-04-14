import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';
import { instanceLocator, testToken, testRoomId } from './../config.js'
import UsersList from './UsersList';
import RoomList from './RoomList';
import '../styles/ChatApp.css'

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            currentRoom: { users: [] },
            messages: [],
            users: [],
            rooms: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.openPrivateChat = this.openPrivateChat.bind(this);
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: testToken
            })
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser: currentUser })
                return this.subscribeToRoom(currentUser);
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom,
                    users: currentRoom.users,
                    rooms: [...this.state.rooms, currentRoom]
                })
            })
            .catch((error) => {
            
            })
    }

    subscribeToRoom(currentUser) {
        this.setState({ messages: [] });
        return currentUser.subscribeToRoom({
            roomId: testRoomId,
            messageLimit: 100,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message],
                    })
                },
                onPresenceChanged: () => this.forceUpdate(),
                onUserJoinedRoom: () => this.forceUpdate(),
                onUserLeftRoom: () => this.forceUpdate()
            }
        })
    }

    openPrivateChat(userId) {
        this.setState({ messages: [] });
        this.props.createDirectMessageRoom(userId)
            .then((room) => {
                console.log(room);
                this.setState({ rooms: [...this.state.rooms, room]});
            });
    }

    addMessage(text) {
        console.log(this.state);
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        }).catch(error => console.error('error', error));
    }

    render() {

        return (
            <div className="chat-app-wrapper">
                <div className="room-wrapper">
                    <RoomList rooms={this.state.rooms} />
                </div>
                <div className="msg-wrapper">
                    <h2 className="header">Let's Talk</h2>
                    <MessageList messages={this.state.messages} />
                    <Input className="input-field" onSubmit={this.addMessage} />
                </div>
                <div className="list-wrapper">
                    <UsersList openPrivateChat={this.openPrivateChat} users={this.state.users} />
                </div>
            </div>
        )
    }
}

export default ChatApp;