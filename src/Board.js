import React, {useState} from 'react';
import Square from './Square';
import './index.css';

function Board() {
    let [squares, setSquares] = useState(Array(9).fill(null));
    let [xIsNext, setNext] = useState(true);
    /*constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, //the value of this boolean will be flipped by handleClick method
        }
    }*/

    function handleClick(i) {
        let newSquares = [...squares];
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares( (squares) => squares = newSquares );
        setNext ( (prevState) => !prevState );
        /*const squares = squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; //sets the square i on 'X' or 'O' depending on the value of xIsNext (I am writing on the copy of the array squares)
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, 
        }) //replaces the array squares with the copy in the state and flips the value of xIsNext*/
    }

    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
            />
        );
    }

    const status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    /*const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status = 'The winner is: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }*/

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}


/*function calculateWinner(squares) {
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
}*/

export default Board;