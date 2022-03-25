// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'

// // Exercise and extra 1
// function PokemonInfo({pokemonName}) {
//   // 🐨 Have state for the pokemon (null)
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)

//   // 🐨 use React.useEffect where the callback should be called whenever the
//   // pokemon name changes.
//   // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
//   React.useEffect(() => {
//     // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
//     if (!pokemonName) return

//     // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
//     // (This is to enable the loading state when switching between different pokemon.)
//     setPokemon(null)

//     // Extra 1: this is my way to handle error
//     setError(null)
    
//     // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
//     //   fetchPokemon('Pikachu').then(
//     //     pokemonData => {/* update all the state here */},
//     //   )
//     fetchPokemon(pokemonName)
//       .then(
//         pokemon => setPokemon(pokemon),
//         error => setError(error)
//       )
    
//   }, [pokemonName, setPokemon])
  
//   // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//     //   1. no pokemonName: 'Submit a pokemon'
//     //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//     //   3. pokemon: <PokemonDataView pokemon={pokemon} />

//   // Extra 1: this is my way to handle error,
//   // a little diffrent from the tutorial.
//   return ( 
//     <>
//       {!pokemonName
//         ? 'Submit a pokemon'
//         : !pokemon
//           ? <PokemonInfoFallback name={pokemonName} />
//           : <PokemonDataView pokemon={pokemon} />}
//       {error && 
//         <div role="alert">
//           There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//         </div>}
//     </>
//   )

//   // 💣 remove this
//   // return 'TODO'
// }


/* 
// Extra 2
function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  
  React.useEffect(() => {
    if (!pokemonName) return
    
    // When using status, the following two are not necessary
    // setPokemon(null)
    // setError(null)
    
    setStatus('pending')
    
    fetchPokemon(pokemonName)
      .then(
        pokemon => {
          setPokemon(pokemon)
          setStatus('resolved')
        },
        error => {
          setError(error)
          setStatus('rejected')
        }
      )
    
  }, [pokemonName])
  
  if (status === 'idle') return 'Submit a pokemon'

  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />

  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  // This throw is from tutorial
  throw new Error('This should be impossible')
}
 */


/* 
// Extra 3
const initialState = {
  pokemon: null,
  error: null,
  status: 'idle'
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState(initialState)
  console.log(state)

  React.useEffect(() => {
    if (!pokemonName) return
    
    // Note, I update all the state properties but tutorial not
    setState({...state, status: 'pending'})
    
    fetchPokemon(pokemonName)
      .then(
        pokemon => {
          setState({...state, status: 'resolved', pokemon})
        },
        error => {
          setState({...state, status: 'rejected', error})
        }
      )
    
  }, [pokemonName])

  const { status, pokemon, error } = state
  
  if (status === 'idle') return 'Submit a pokemon'

  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />

  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  throw new Error('This should be impossible')
}
 */


// Extra 4
function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle'
  })

  React.useEffect(() => {
    if (!pokemonName) return
    
    setState({...state, status: 'pending'})
    
    fetchPokemon(pokemonName)
      .then(
        pokemon => {
          setState({...state, status: 'resolved', pokemon})
        },
        error => {
          setState({...state, status: 'rejected', error})
        }
      )
    
  }, [pokemonName])

  const { status, pokemon, error } = state
  
  if (status === 'idle') return 'Submit a pokemon'

  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />

  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  if (status === 'rejected') throw error

  throw new Error('This should be impossible')
}

// Extra 4
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

// Extra 4
// This can solve all the errors from deliberately 
// thrown from the component or unexpected delivered 
// during runtime
class ErrorBoundary extends React.Component {
  state = {
    error: null,
    hasError: false
  }

  static getDerivedStateFromError(error) {    
    // Update state so the next render will show the fallback UI.  
    
    let hasError = false
    if (error) hasError = true

    return { 
      error,
      hasError 
    };    
  }

  render() {
    const { error } = this.state

    // FallbackComponent makes error boundary generic
    const { FallbackComponent } = this.props

    if (error) {      
      // You can render any custom fallback UI      
      return (
        <FallbackComponent error={error} />
      )    
    }
    
    return this.props.children; 
  }
}

export default App
