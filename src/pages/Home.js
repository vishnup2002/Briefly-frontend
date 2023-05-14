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

    <div className="container col-xxl-8 px-4 py-5 " >
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src = {image} className="d-block mx-lg-auto img-fluid" alt="meetingImage" width="700" height="500" loading="lazy"></img>
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Minutes made simple. Meetings made easy.</h1>
          <p className="lead">Effortlessly organize your meetings with accurate minutes - all in one place!Revolutionize your meeting notes with our simple, yet powerful tool.The ultimate solution for stress-free meeting minutes...</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={gotofunction} >{props.name ? 'Get Started ':'Login to Continue'}</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={gotoabout}>More...</button>
          </div>
        </div>
      </div>
    </div>

    <div className="container px-4 " id="featured-3">
      <h2 className="pb-2 border-bottom">Features:</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          
          <h4 className="fs-4">Automated Minute-Taking</h4>
          <p>Our platform makes minute-taking a breeze. Simply start the meeting, and our software will automatically record and transcribe everything said, allowing you to focus on the discussion instead of note-taking.</p>
        </div>
        <div className="feature col">
          
          <h4 className="fs-4">Easy Organization</h4>
          <p>With our platform, all your minutes are organized and easily accessible in one place. You can sort them by date, project, or any other criteria, and quickly search through them using keywords.</p>
        </div>
        <div className="feature col">
          
          <h4 className="fs-4">Secure Storage</h4>
          <p>We understand the importance of confidentiality and security, which is why we provide secure storage for all your meeting minutes. You can access your minutes anywhere, anytime, and from any device, without worrying about data breaches.</p>
        </div>
        <div className="feature col">
          
          <h4 className="fs-4">Analytics and Insights</h4>
          <p>Our platform provides analytics and insights on meeting minutes, such as attendance, action items, and discussion topics, helping you to identify trends, measure progress, and make data-driven decisions.</p>
        </div>
        <div className="feature col">
          
          <h4 className="fs-4">Customer Support</h4>
          <p>Our platform offers dedicated customer support to help you with any questions or issues you may have. Our support team is available via chat, email, or phone, ensuring that you always have someone to turn to.</p>
        </div>
        <div className="feature col">
          
          <h4 className="fs-4">Export and Share</h4>
          <p>Our platform allows you to export and share meeting minutes in a variety of formats, such as PDF, Word, or HTML, making it easy to share with stakeholders, team members, or clients.</p>
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

