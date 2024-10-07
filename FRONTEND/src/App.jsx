import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import EmbedReactPlanner from './roommap';
import Register from './components/pages/Register'
import Planner from './components/pages/Planner'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/planner" element={< Planner/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;