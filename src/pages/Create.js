import React from 'react'
import Recorder from '../components/Recorder';
import { useState } from 'react'

export default function Create(props) {

  const [file, setFile] = useState(null);
  const [mname,setMname] = useState('')
  const [mdesc,setMdesc] = useState('')
  const [mdate,setMdate] = useState('dd/mm/yyyy')

  const [isActive, setIsActive] = useState({
    id: 'divOne',
  })

  const hideShowDiv = (e) => {
    setIsActive({
      id: e.target.id,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    setFile(selectedFile);
  };

  function generateSummary(){
    console.log('Summary to be generated here ')
    console.log(file,mname,mdesc,mdate)
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
        <form onSubmit={handleSubmit} className='bg-light rounded p-5'>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Meeting Name:</span>
            <input type="text" className="form-control focus-ring focus-ring-light" placeholder="name..." required onChange={e => setMname(e.target.value)}/>
          </div>

          <div className="input-group">
            <span className="input-group-text">Description</span>
            <textarea className="form-control focus-ring focus-ring-light" aria-label="With textarea" onChange={e => setMdesc(e.target.value)}></textarea>
          </div>

          <div className="input-group pt-3">
            <span className="input-group-text">Date</span>
            <input type="date" className="form-control focus-ring focus-ring-light" id="date" name="date" onChange={e => setMdate(e.target.value)}/>
          </div>

          {/* recording audio below */}
          <div className={isActive.id === 'divOne' ? `divOne` : 'divOne d-none'}>
            <div className=".container-sm pt-5">
              <Recorder mname={mname} mdate={mdate} mdesc={mdesc}/>
            </div>
          </div>

          {/* uploading a file below */}
          <div className={isActive.id === 'divTwo' ? `divTwo` : 'divTwo d-none'}> 
            <div className="container-sm pt-5">
              <div className="form rounded border p-2 ">
                <label className = 'pe-3' htmlFor="fileUpload">Upload file:</label>
                <input type="file" className="form-control-file" id="fileUpload" name="fileUpload" onChange={handleFileChange} />
                <button className="btn btn-primary m-4" onClick={generateSummary}>
                  Generate Summary
                </button>
              </div>
            </div>
          </div>

          </form>
      </div>
    </div>


    </div>
  )
}
