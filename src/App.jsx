import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mylist from './Components/Mylist'

function App() {
  const [count, setCount] = useState(0)

  return (
  
   <Mylist/>
   
  )
}

export default App
