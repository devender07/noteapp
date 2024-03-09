import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import NotePage from './pages/NotePage';

const App = () => {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/note/:id' element ={<NotePage/>}/>
    </Routes>
    </>
  )
}

export default App