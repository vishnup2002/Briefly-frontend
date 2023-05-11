import React from 'react'
import RecorderJSDemo from '../components/Recorder';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Create(props) {

  const navigate = useNavigate();

  const [mname,setMname] = useState('')
  const [mdesc,setMdesc] = useState('')
  const [mdate,setMdate] = useState('dd/mm/yyyy')
  const [redirect,setRedirect] = useState(false)

  const [isActive, setIsActive] = useState({
    id: 'divOne',
  })

  const hideShowDiv = (e) => {
    setIsActive({
      id: e.target.id,
    })
  }

  const submit = async (e) => {
     e.preventDefault();
     console.log({mname,mdesc,mdate})
     setRedirect(true);
  }

  if(redirect){
    navigate('/meetings/2');
  }


  return (
    <div>

    <div className="px-4 pt-5 my-5 text-center ">
      <h1 className="display-4 fw-bold text-body-emphasis">Generate Summary</h1>
      <div className="col-lg-6 mx-auto ">
        <p className="lead mb-4">Quickly generate summary of your meetings </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <button type="button" id="divOne" onClick={(e) => {hideShowDiv(e)}} className="btn btn-primary focus-ring btn-lg px-4 me-sm-3">Record Audio</button>
          <button type="button" id="divTwo" onClick={(e) => {hideShowDiv(e)}} className="btn btn-primary focus-ring btn-lg px-4 me-sm-3">Upload Audio</button>
        </div>
        <form onSubmit={(e)=>submit(e)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Meeting Name:</span>
            <input type="text" className="form-control focus-ring focus-ring-light" placeholder="name..." required onChange={e => setMname(e.target.value)}/>
          </div>

          <div class="input-group">
            <span class="input-group-text">Description</span>
            <textarea class="form-control focus-ring focus-ring-light" aria-label="With textarea" onChange={e => setMdesc(e.target.value)}></textarea>
          </div>

          <div class="input-group pt-3">
            <span class="input-group-text">Date</span>
            <input type="date" class="form-control focus-ring focus-ring-light" id="date" name="date" onChange={e => setMdate(e.target.value)}/>
          </div>

          {/* recording audio below */}
          <div className={isActive.id === 'divOne' ? `divOne` : 'divOne d-none'}>
            <div className=".container-sm pt-5">
              <h5>implement code to record voice</h5>
              <h5>IDK how to do that</h5>
              <RecorderJSDemo/>
            </div>
          </div>

          {/* uploading a file below */}
          <div className={isActive.id === 'divTwo' ? `divTwo` : 'divTwo d-none'}> 
            <div className="container-sm pt-5">
              <div className="form rounded border p-2 ">
                <label className = 'pe-3' for="fileUpload">Upload file:</label>
                <input type="file" className="form-control-file" id="fileUpload" name="fileUpload"/>
              </div>
              <h5>IDK what to do with the file</h5>
            </div>
          </div>

          <button type="submit" className="btn btn-primary m-4">Generate Summary</button>

          </form>
      </div>
    </div>

    {/* maybe implement a sticky footer here */}

    </div>
  )
}
