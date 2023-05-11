import React from 'react'
import image from '../img2.jpg'
import { useNavigate } from 'react-router-dom';


export default function Home(props) {

  const navigate = useNavigate();

  const gotofunction = () => {
    props.name ? navigate('/create'):navigate('/login');
  };

  const gotoabout = () => {
    navigate('/about');
  };

  return (
    <div>

    <div className="container col-xxl-8 px-4 py-5" >
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src = {image} className="d-block mx-lg-auto img-fluid" alt="meetingImage" width="700" height="500" loading="lazy"></img>
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
          <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={gotofunction} >{props.name ? 'Get Started ':'Login to Continue'}</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={gotoabout}>More...</button>
          </div>
        </div>
      </div>
    </div>

    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Columns with icons</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          
          <h3 className="fs-2">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="https://www.google.com" target="_blank" className="icon-link">
            Call to action
          </a>
        </div>
        <div className="feature col">
          
          <h3 className="fs-2">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="https://www.google.com" target="_blank" className="icon-link">
            Call to action
          </a>
        </div>
        <div className="feature col">
          
          <h3 className="fs-2">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="https://www.google.com" target="_blank" className="icon-link">
            Call to action
          </a>
        </div>
      </div>
    </div>


  <div className="container">
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="mailto:pioustony44733@gmail.com" className="nav-link px-2 text-body-secondary">Gmail</a></li>
        <li className="nav-item"><p className="nav-link px-2 text-body-secondary">Ph no:9072272724</p></li>
        <li className="nav-item"><a href="htpps://twitter.com" className="nav-link px-2 text-body-secondary">Twitter</a></li>
        <li className="nav-item"><a href="htpps://instagram.com" className="nav-link px-2 text-body-secondary">Instagram</a></li>
        <li className="nav-item"><a href="htpps://facebook.com" className="nav-link px-2 text-body-secondary">Facebook</a></li>
      </ul>
      <p className="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
    </footer>
  </div>
    
    </div>
  )
}

