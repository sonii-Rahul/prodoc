import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx'
import './App.css'
import {Signup} from './components/Signup.jsx'
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route  path="/" element={<Login/>}  />
      <Route  path="/login" element={<Login/>}  />
      <Route  path="/signup" element={<Signup/>}  />
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    
    
    </BrowserRouter>
   
    

    </>
  )
}

export default App
