import { useState } from 'react'
import './App.css'
import "twin.macro"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div tw='text-6xl'> TEST </div>
    </div>
  )
}

export default App
