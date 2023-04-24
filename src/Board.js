import React, { Component } from 'react'
import "./App.css"

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bid: props.bid,
            name: props.name,
            moves: 0,
            number: this.rand(),
            isWin: false,
            scores: [],
            isEnable: props.isEnable
            // isEnable: props.bid===0? true :props.isEnable
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isEnable !== this.props.isEnable) {
            this.setState({ isEnable: this.props.isEnable });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isEnable !== this.state.isEnable) {
            this.setState({ isEnable: this.props.isEnable });
        }
    }

    rand() {
        return Math.floor(Math.random() * 99);
    }

    updateNumber = (sign) => {
        let newNumber = this.state.number;
        switch (sign) {
            case '+':
                newNumber = newNumber + 1;
                //this.setState({ number: this.state.number + 1 });
                break;
            case '-':
                newNumber = newNumber - 1;
                // this.setState({ number: this.state.number - 1 });
                break;
            case '*':
                newNumber = newNumber * 2;
                // this.setState({ number: this.state.number * 2 });
                break;
            case '/':
                newNumber = newNumber / 2;
                // this.setState({ number: Math.floor(this.state.number / 2) });
                newNumber = Math.floor(newNumber);

                break;

            default:
                console.log("An error occur, operation " + sign + "not valid");
                break;
        }
        this.setState({
            moves: this.state.moves + 1,
            number: newNumber,
            isEnable: false
        });
        this.checkIfWin(newNumber);
        this.props.endOfTurn(this.state.bid);
    }

    checkIfWin(number) {
        if (number === 100) {
            this.setState({ isWin: true });
        }
    }

    resetBoard() {
        this.setState({
            bid: this.props.bid,
            number: this.rand(),
            moves: 0,
            isWin: false,
            scores: [...this.state.scores, this.state.moves]
        })
    }

    quitFunc = () => {
        this.props.func(this.state.bid);
    }

    render() {
        return (
            <div className={this.state.isEnable ? "enabled" : "disabled"}>
                <label style={{ color: "red" }} className={this.state.isEnable ? "visible" : "hidden"}>your turn  </label>
                <br />
                <label>Player name: {this.state.name} </label>
                <br />
                <label>Number: {this.state.number} </label>
                <br />
                <label>moves: {this.state.moves} </label>
                <br />

                <button id="+" onClick={() => this.updateNumber('+')} className={this.state.isWin ? 'hidden' : 'visible'} >+1</button>
                <button id="-" onClick={() => this.updateNumber('-')} className={this.state.isWin ? 'hidden' : 'visible'} >-1</button>
                <button id="*" onClick={() => this.updateNumber('*')} className={this.state.isWin ? 'hidden' : 'visible'} >*2</button>
                <button id="/" onClick={() => this.updateNumber('/')} className={this.state.isWin ? 'hidden' : 'visible'} >/2</button>


                <button id="newGame" onClick={() => this.resetBoard()} className={this.state.isWin ? 'visible' : 'hidden'}>New game</button>
                <button id='Quit' onClick={() => { this.quitFunc() }} className={this.state.isWin ? 'visible' : 'hidden'}>Quit</button>

                <br />
                <label>Scores: {this.state.scores.map((x)=>{return x +" "})} </label>
                <hr size="2" width="100%" color="gray"></hr>
                <br /><br />
            </div>
        );
    }

}