// useState: tic tac toe
// 💯 (alternate) migrate from classes
// http://localhost:3000/isolated/exercise/04-classes.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

// If you'd rather practice refactoring a class component to a function
// component with hooks, then go ahead and do this exercise.

// 🦉 You've learned all the hooks you need to know to refactor this Board
// component to hooks. So, let's make it happen!

// class Board extends React.Component {
//   state = {
//     squares:
//       JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null),
//   }

//   selectSquare(square) {
//     const {squares} = this.state
//     const nextValue = calculateNextValue(squares)
//     if (calculateWinner(squares) || squares[square]) {
//       return
//     }
//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     this.setState({squares: squaresCopy})
//   }
//   renderSquare = i => (
//     <button className="square" onClick={() => this.selectSquare(i)}>
//       {this.state.squares[i]}
//     </button>
//   )

//   restart = () => {
//     this.setState({squares: Array(9).fill(null)})
//     this.updateLocalStorage()
//   }

//   componentDidMount() {
//     this.updateLocalStorage()
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.squares !== this.state.squares) {
//       this.updateLocalStorage()
//     }
//   }

//   updateLocalStorage() {
//     window.localStorage.setItem('squares', JSON.stringify(this.state.squares))
//   }

//   render() {
//     const {squares} = this.state
//     const nextValue = calculateNextValue(squares)
//     const winner = calculateWinner(squares)
//     let status = calculateStatus(winner, squares, nextValue)

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//         <button className="restart" onClick={this.restart}>
//           restart
//         </button>
//       </div>
//     )
//   }
// }

// function Game() {
//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board />
//       </div>
//     </div>
//   )
// }

// Note, this exercise ask to migrate a class component to a hook component, not to mix uses of different conponent types.
const initialSquares = Array(9).fill(null)

class Board extends React.Component {
  selectSquare(square) {
    const {onClick} = this.props
    onClick(square)
  }
  renderSquare = i => {
    const { squares } = this.props
    return (
      <button className="square" onClick={() => this.selectSquare(i)}>
        {squares[i]}
      </button>
    )
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
    )
  }
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [initialSquares])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) return false
    
    const currentSquaresCopy = [...currentSquares]
    currentSquaresCopy[square] = nextValue

    const newHistory = history.slice(0, currentStep + 1)

    setHistory([...newHistory, currentSquaresCopy])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([initialSquares])
    setCurrentStep(0)
  }

  const handleClickStep = index => {
    setCurrentStep(index)
  }

  const moves = history.map((h, index) => {
    const text = index === 0
      ? `Go to game start`
      : `Go to move #${index}`

    return (
      <li key={index}>
        <button 
          disabled={index === currentStep}
          onClick={() => handleClickStep(index)}>
          {text}{index === currentStep ? ' (current)' : ''}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
