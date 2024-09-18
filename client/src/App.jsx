import React from 'react'
import "./App.css"
import {Routes ,Route }from "react-router-dom"
import Home from './components/Home'
import SingleUser from './components/SingleUser'
import UpdateUser from './components/UpdateUser'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/readSingleUser/:id" element={<SingleUser/>}/>
      <Route path="/updateUser/:id" element={<UpdateUser/>}/>


    </Routes>
  )
}

export default App