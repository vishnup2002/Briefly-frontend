import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar(props) {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  const logout = async () => {
    await fetch('http://localhost:8000/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    props.setName('');
    navigate('/');
}

let menu;

console.log("from nav bar")
console.log(props.name)

if (props.name === '') {
  menu = (
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href='/' className="navbar-brand text-primary"><h1 className='pe-5'>Briefly</h1></a>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
          <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        <div className="text-end">
          <button type="button" className="btn btn-outline-primary text-light border-dark me-2" onClick={navigateToLogin}>Login</button>
          <button type="button" className="btn btn-outline-primary text-light border-dark me-2" onClick={navigateToRegister}>Sign-up</button>
        </div>
      </div>
  )
} else {
  menu = (
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href='/' className="navbar-brand text-primary"><h1 className='pe-5'>Briefly</h1></a>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
          <li><Link to="/create" className="nav-link px-2 text-white">Create Summary</Link></li>
          <li><Link to="/dashboard" className="nav-link px-2 text-white">Dashboard</Link></li>
          <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        <div className="d-flex text-end">
          <button type="button" className="btn text-light border-dark me-2"><b>{props.name}</b></button>
          <button type="button" className="btn btn-outline-primary text-light border-dark me-2" onClick={logout}>Logout</button>
        </div>
      </div>
  )
}

  

  return (
    <header className="p-3 text-bg-dark">
    <div className="container">
        {menu}
    </div>
  </header>
  )
}



