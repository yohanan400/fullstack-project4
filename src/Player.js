import React, { Component } from 'react';

export default class Player extends Component {

    render() {
        return (
            <div className='container'>
                <label id="LuserName">Player name:</label>
                <input type="text" id="IuserName" ></input>
                <br />
            </div>
        );
    }
}