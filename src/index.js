import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return(
        <button
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]} //props passed down from Game. State is lifted up to <Game />
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history : [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true, //the value of this boolean will be flipped by handleClick method
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); //creates a copy of history, in case we want to go back to a certain step number, not considering all the moves after that step
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //creates a copy of the array squares
        if (calculateWinner(squares) || squares[i]){
            return;
        } //returns early when there is a winner or the square is already clicked preventing further clicks
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //sets the square i on 'X' or 'O' depending on the value of xIsNext (I am writing on the copy of the array squares)
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext, 
        }) //replaces the array squares with the copy in the state, updates stepNumber and flips the value of xIsNext
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        }) //given a step, updates stepNumber and sets xIsNext to true when step is even
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'The winner is: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} 
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [ //possible combinations to win the game
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){ //given the array squares, checks if there is a winning combination; until found, returns null
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );