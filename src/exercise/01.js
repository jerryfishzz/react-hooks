// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// The tutorial set the default value for initialName to avoid the warning
// in case of no initialName prop available.
// But in the practice of my setup, there is no such a warning .
// I guess the latest React probably do some tweaks here.
// Anyway, this kind of warning can be solved by Typescript or other means.
function Greeting({ initialName = '' }) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  // const name = ''

  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  // Don't forget set the input value as name in extra
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
