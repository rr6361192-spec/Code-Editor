import React from 'react'
import Home from './component/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import Editor from './component/Editor.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/editor/:roomId" element={<Editor />} />
      </Routes>
    </>
  )
}

export default App