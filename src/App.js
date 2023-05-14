import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
// import {useEffect} from 'react';
import React, {useState} from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details'
// import axios from 'axios';


function App() {

  const [name, setName] = useState('');

//   useEffect(() => {
//     (
//         async () => {
//             const response = await fetch('http://localhost:8000/user/user', {
//                 headers: {'Content-Type': 'application/json'},
//                 credentials: 'include',
//             });

//             const content = await response.json();
//             console.log(content);

//             if (content.hasOwnProperty("name")) {
//               setName(content.name);
//             }
//             else{
//               console.log("name not present")
//             }
            
//         }
//     )();
// });

//   useEffect(() => {
//   (
//     async () => {
//       try{
//       const response = await axios.get('http://localhost:8000/user/user',{withCredentials: true})
//       console.log(response.data)
//       if(response){
//         console.log('response present')
//       }
//       else{
//         console.log('not present')
//       }
//       }catch (error) {
//         console.error(error.message);
//         console.log('hello form error !')
//       }
//     }
//   )();
// });

  return (
    <div>
      <BrowserRouter>
        <Navbar name={name} setName={setName}/>
        <Routes>
          <Route path="/" element = {<Home name={name}/>}/>
          <Route path="/create" element = {<Create name={name}/>}/>
          <Route path="/dashboard" element = {<Dashboard name={name}/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/login" element = {<Login setName={setName}/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/meetings/:id" element={<Details name={name}/>}/>
      </Routes>
    </BrowserRouter>
    </div>

  );
} 

export default App;
