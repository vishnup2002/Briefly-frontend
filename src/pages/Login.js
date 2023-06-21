import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate('/register');
  };

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault();
    console.log({email,password})

    const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        if(content.hasOwnProperty('name')){
          props.setName(content.name);
          setRedirect(true);
        }
        if(content.hasOwnProperty('detail')){
          setErrorMessage(content.detail);
        }
        
  }

  if(redirect){
    navigate('/');
  }

  return (

    <div className="d-flex justify-content-center pt-5  mt-5">
      <div className='border p-4 border-2 bg-light rounded'>
        <h5 className="display-6 fw-bold text-body-emphasis  text-center">Login</h5>
        <form onSubmit={(e)=>submit(e)}>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="text" className="form-control" id="inputEmail"  placeholder="Enter email" onChange={e => setEmail(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
          </div>
          <div className="d-flex flex-wrap justify-content-evenly pt-3">
            <div>
              <button type="submit" className="btn btn-primary ">Login in</button>
            </div>
            <div>
              <button type="button" onClick={navigateToRegister} className="btn btn btn-outline-primary ">Sign in</button>
            </div>
          </div>
          {errorMessage && <div className="alert alert-danger text-center mt-3" role="alert">{errorMessage}</div>}
        </form>
      </div>
    </div>
  )
}
