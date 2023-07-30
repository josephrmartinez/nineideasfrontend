import { useState } from 'react'
import './App.css'
import Topic from './components/Topic'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-sm font-bold'>nineideas</h1>
        <Topic />
      </div>
    </>
  )
}

export default App
