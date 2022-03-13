// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/* 
// Exercise
function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}
 */


/* 
// Extra 1 & 2
function Greeting({initialName = ''}) {
  // const getInitialFromLocal = () => window.localStorage.getItem('name') ?? initialName

  // const [name, setName] = React.useState(getInitialFromLocal)
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') ?? initialName,
  )
  
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}
 */


/* 
// Extra 3
// I don't think the defaultValue needs to have a '' as the default value
// if I have set the default value for initialName.
// Solved:
// Since this is a generic function, 
// it doesn't have to be initialName but anything else.
// In this case, we give initialName a default value in the Greeting,
// but in other cases, nobody knows if all the parameters
// have default values.
const useLocalStorageState = (key, defaultValue = '') => {
  
  // Should define the initial function independently,
  // not as the tutorial directly putting the anonymous function inplementation
  // as the argument of useState function, which will lead to
  // printing the function out when refreshing the page
  // after modifying the code with the input value leaving blank.
  // Solved: 
  // The above problem only occurs in Firefox.
  // Looks like Firefox has some weird behaviors in local storage
  // that will lead to unexpected results.
  // It doesn't have to be like the example described above,
  // for example, the local storage value can be deleted after the code modified,
  // even only the modification is switching on/off console.log
  // which should not affect the local storage value.
  
  // const getInitial = () => window.localStorage.getItem(key) ?? defaultValue

  // const [state, setState] = React.useState(getInitial)
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue
  )
  
  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}
 */


// Extra 4
function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // The object created from useRef will never change 
  // since the component is initialied
  // regardless of rendering or re-rendering.
  // In this case, prevKeyRef is only decided by the initial key value.
  // After initialization, prevKeyRef won't change 
  // even if component re-rendering from the change of key.
  // That's why it can be used to keep the value of previous key.
  // https://reactjs.org/docs/hooks-reference.html#useref
  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
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


function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}


function App() {
  return <Greeting />
}

export default App
