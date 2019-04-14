import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rooms: this.props.rooms
        }
    }

    render(){
        if(this.props.rooms){
            return(
                <div style={{color: 'white'}}>
                <h1 style={{marginTop: '5rem', marginBottom: '1rem', float: 'left'}}>Rooms</h1>
                    <ul style={listStyle}>
                        {this.props.rooms.map((room, index) => {
                            return <li style={{float: 'left'}} key={index}><h4> #{room.name}</h4> </li>
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

const listStyle = {
    listStyleType: 'none',
    float: 'left'
}

export default RoomList;