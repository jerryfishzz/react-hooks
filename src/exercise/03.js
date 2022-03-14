// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

/* 
// Exercise
function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}
 */

// Extra 1
function Name() {
  const [name, setName] = React.useState('')

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}


// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({ animal, onAnimalChange }) {
  // 💣 delete this, it's now managed by the App
  // const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        // onChange={event => setAnimal(event.target.value)}
        onChange={onAnimalChange}
      />
    </div>
  )
}


/* 
// 🐨 uncomment this
// Excercise
function Display({name, animal}) {
  // Excercise
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}
 */

// Extra 1
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}


// 💣 remove this component in favor of the new one
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }


// Exercise
// function App() {
//   // 🐨 add a useState for the animal
//   const [name, setName] = React.useState('')
//   const [animal, setAnimal] = React.useState('')

//   return (
//     <form>
//       <Name name={name} onNameChange={event => setName(event.target.value)} />
//       {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
//       <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
//       {/* 🐨 pass the animal prop here */}
//       <Display name={name} animal={animal} />
//     </form>
//   )
// }

// Extra 1
function App() {
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      <Display animal={animal} />
    </form>
  )
}

export default App
