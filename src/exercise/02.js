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
  const getInitialFromLocal = () => window.localStorage.getItem('name') ?? initialName

  const [name, setName] = React.useState(getInitialFromLocal)

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

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


// I don't think the defaultValue needs to have a '' as the default value
// if I have set the default value for initialName.
const useLocalStorageState = (key, defaultValue) => {
  
  // Should define the initial function independently,
  // not as the tutorial directly putting the anonymous function inplementation
  // as the argument of useState function, which will lead to
  // printing the function sometimes when refreshing the page
  // after modifying the code with the input value is empty.
  const getInitial = () => window.localStorage.getItem(key) ?? defaultValue

  const [state, setState] = React.useState(getInitial)

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  console.log(initialName)
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
