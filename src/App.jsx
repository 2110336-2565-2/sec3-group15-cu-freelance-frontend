import { useState } from 'react'
import './App.css'
import "twin.macro"
import { Routes,Route } from 'react-router-dom'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'

function App() {

  return <Routes>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
  </Routes>
}

export default App
