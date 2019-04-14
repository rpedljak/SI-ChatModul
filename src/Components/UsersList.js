import React, { Component } from 'react';
import '../styles/UsersList.css'

class UsersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: this.props.users
        }
    }

    render(){
        if(this.props.users){
            return(
                <div style={{color: 'white'}}>
                <h1 style={{marginTop: '5rem', marginBottom: '1rem'}}>Users</h1>
                    <ul>
                        <h4>Online users:</h4>
                        {this.props.users.filter((user) => user.presence.state === 'online').map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)} 
                            className="user" key={index} style={{cursor: 'pointer'}}> {user.name} </li>
                        })}
                        <h4>Offline users:</h4>
                        {this.props.users.filter((user) => user.presence.state === 'offline').map((user, index) => {
                            return <li onClick={() => this.props.openPrivateChat(user.id)}
                            className="user" key={index} style={{cursor: 'pointer'}}> {user.name} </li>
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <p>Loading...</p>
            )
        }
    }
}

export default UsersList;