import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import {useEffect} from 'react';
import React, {useState} from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details'

function App() {

  const [name, setName] = useState('');

  console.log(name)

  useEffect(() => {
    (
        async () => {
            const response = await fetch('http://localhost:8000/user/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            const content = await response.json();

            if (content.hasOwnProperty("name")) {
              setName(content.name);
            }
            
        }
    )();
});

  return (
    <div>
      <BrowserRouter>
        <Navbar name={name} setName={setName}/>
        <Routes>
          <Route path="/" element = {<Home name={name}/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/login" element = {<Login setName={setName}/>}/>
          <Route path="/register" element = {<Register/>}/>
          {name.length ? (
          <>
            <Route path="/dashboard" element = {<Dashboard name={name}/>}/>
            <Route path="/create" element = {<Create name={name}/>}/>
            <Route path="/meetings/:id" element={<Details name={name}/>}/>
          </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
      </Routes>
    </BrowserRouter>
    </div>

  );
} 

export default App;
