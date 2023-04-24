import React, { Component } from 'react';
import Board from './Board';
import Player from "./Player";



export default class Register extends Component {
    constructor(props) {
        super();
        this.numOfPlayers = props.numOfPlayers;
        this.state = {
            players: [],
            bestPlayers: []
        }
    }

    endOfTurn = (index) => {
        let temp = [...this.state.players]
        temp[(index + 1) % this.state.players.length] = React.cloneElement(temp[(index + 1) % this.state.players.length], { isEnable: true });
        this.setState({ players: [...temp] })

        // this.updateBestScores();
    }

    // updateBestScores(){
    //     let counter = 0;
    //     let scores = [];
    //     console.log(this.state.players)




    //     for (const player in this.state.players) {
    //         for (const score in player.score) {
    //             counter += score;
    //         }
    //         const name = player.name;
    //         scores.push({ name : counter});
    //     }

    //     scores.sort();
    //     console.log(scores);
    // }

    addPlayer(userName) {
        this.setState({
            players: [...this.state.players,
            <Board func={this.quitGame} name={userName} bid={this.state.players.length} isEnable={false} endOfTurn={this.endOfTurn} />]
        });
        document.getElementById("IuserName").value = "";
    }

    quitGame = (index) => {
        let temp = [...this.state.players]


        temp[(index + 1) % this.state.players.length] = React.cloneElement(temp[(index + 1) % this.state.players.length], { isEnable: true });


        delete temp[index];
        this.setState({ players: [...temp] })

    }

    startGame = () => {
        let temp = [...this.state.players]
        temp[0] = React.cloneElement(temp[0], { isEnable: true });
        document.getElementById("addPlayerDiv").className = "hidden";
        this.setState({ players: [...temp] });
    }

    render() {
        return (
            <>
                <div id="addPlayerDiv">
                    <Player />
                    <button id='addPlayer' onClick={() => { this.addPlayer(document.getElementById("IuserName").value) }}>Add player</button>
                    <br /><br />
                    <button onClick={() => { this.startGame() }}>Start game</button>
                    <hr size="2" width="100%" color="gray"></hr>
                    <br /><br />
                </div>
                {this.state.players}
            </>);
    }
}