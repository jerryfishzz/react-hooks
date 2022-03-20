// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils' // Extra 2

/* 
// Extra 1
function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}
 */

// Exercise, extra 1, and extra 2
// function Board() {
//   // 🐨 squares is the state for this component. Add useState for squares
//   // const squares = Array(9).fill(null)
//   // const [squares, setSquares] = React.useState(Array(9).fill(null))

//   // Extra 1
//   const getSquares = () => Array(9).fill(null)
//   const [squares, setSquares] = useLocalStorageState('squares', getSquares)

//   // 🐨 We'll need the following bits of derived state:
//   // - nextValue ('X' or 'O')
//   // - winner ('X', 'O', or null)
//   // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
//   // 💰 I've written the calculations for you! So you can use my utilities
//   // below to create these variables
//   const nextValue = calculateNextValue(squares)
//   const winner = calculateWinner(squares)
//   const status = calculateStatus(winner, squares, nextValue)

//   // This is the function your square click handler will call. `square` should
//   // be an index. So if they click the center square, this will be `4`.
//   function selectSquare(square) {
//     // 🐨 first, if there's already winner or there's already a value at the
//     // given square index (like someone clicked a square that's already been
//     // clicked), then return early so we don't make any state changes
//     if (winner || squares[square]) return false // Can return without a value

//     //
//     // 🦉 It's typically a bad idea to mutate or directly change state in React.
//     // Doing so can lead to subtle bugs that can easily slip into production.
//     //
//     // 🐨 make a copy of the squares array
//     // 💰 `[...squares]` will do it!)
//     const squaresCopy = [...squares]

//     //
//     // 🐨 set the value of the square that was selected
//     // 💰 `squaresCopy[square] = nextValue`
//     squaresCopy[square] = nextValue

//     //
//     // 🐨 set the squares to your copy
//     setSquares(squaresCopy)
//   }

//   function restart() {
//     // 🐨 reset the squares
//     // 💰 `Array(9).fill(null)` will do it!
//     // setSquares(Array(9).fill(null))

//     // Extra 1
//     setSquares(getSquares())
//   }

//   function renderSquare(i) {
//     return (
//       <button className="square" onClick={() => selectSquare(i)}>
//         {squares[i]}
//       </button>
//     )
//   }

//   return (
//     <div>
//       {/* 🐨 put the status in the div below */}
//       {/* <div className="status">STATUS</div> */}
//       <div className="status">{status}</div>
//       <div className="board-row">
//         {renderSquare(0)}
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//       <button className="restart" onClick={restart}>
//         restart
//       </button>
//     </div>
//   )
// }

/* 
// Exercise, extra 1, and extra 2
function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}
 */


// Extra3
function Board({ squares, onClick }) {
  const selectSquare = index => {
    onClick(index)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
  )
}

function Game() {
  // In tutorial, it uses Array(9).fill(null) directly.
  // It also talk about using a variable out of the component
  // to get the value, but not using a function like this.
  // Guess Array(9).fill(null) is not a cost one,
  // compared to creating a function.
  const getSquares = () => Array(9).fill(null)

  const [history, setHistory] = useLocalStorageState('history', [getSquares()])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) return false
    
    const currentSquaresCopy = [...currentSquares]
    currentSquaresCopy[square] = nextValue

    // Note, once the history is traced back to a step
    // and begin to play from that step,
    // all the previous history records after this step
    // will be abandoned. That quite makes sense.
    // The future steps from the previous history
    // just make people confused.
    // So here should only copy the history of current step 
    // and steps before current step, but not the whole history.
    const newHistory = history.slice(0, currentStep + 1)
    const nextStep = currentStep + 1

    setHistory([...newHistory, currentSquaresCopy])
    setCurrentStep(nextStep)
  }

  function restart() {
    setHistory([getSquares()])
    setCurrentStep(0)
  }

  const handleClickStep = index => {
    setCurrentStep(index)
  }

  const moves = history.map((h, index) => {
    const current = index === currentStep ? ' (current)' : ''

    const text = index === 0
      ? `Go to game start${current}`
      : `Go to move #${index}${current}`

    return (
      <li key={index}>
        <button 
          disabled={index === currentStep}
          onClick={() => handleClickStep(index)}>
          {text}
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

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
