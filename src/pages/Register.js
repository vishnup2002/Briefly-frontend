import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    console.log({name,email,password})

    await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

    setRedirect(true)
  }

  if(redirect){
    navigate('/');
  }

  return (
    <div className="d-flex justify-content-center pt-5  mt-5">
      <div className='border p-5 border-2 bg-light rounded'>
        <h5 className="display-6 fw-bold text-body-emphasis  text-center">Signup</h5>
        <form onSubmit={(e)=>submit(e)}>
          <div className="form-group">
            <label htmlFor="inputUsename">Username</label>
            <input type="username" className="form-control" id="inputUsername" placeholder="Username" onChange={e => setName(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email" onChange={e => setEmail(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
          </div>
          
          <div className="d-flex flex-wrap justify-content-evenly pt-3">
            <div>
              <button type="submit" className="btn btn-primary ">Sign in</button>
            </div>
          </div>  
        </form>
      </div>
    </div>
  )
}
