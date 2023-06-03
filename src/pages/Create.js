import React from 'react'
import { useState } from 'react'
import { useRef } from 'react';

export default function Create(props) {

  const [file, setFile] = useState(null);
  const [mname,setMname] = useState('')
  const [mdesc,setMdesc] = useState('')
  const [mdate,setMdate] = useState('dd/mm/yyyy')
  const previewRef = useRef(null);
  const recordingRef = useRef(null);
  const startButtonRef = useRef(null);
  const stopButtonRef = useRef(null);
  const downloadButtonRef = useRef(null);

  const[recdata,setRecdata] = useState(new Blob())

  const [recorder, setRecorder] = useState(null);
  const recordingTimeMS = 500000;

  function startRecording(stream, lengthInMS) {
    const newRecorder = new MediaRecorder(stream);
    setRecorder(newRecorder);


    const data = [];

    newRecorder.ondataavailable = (event) => data.push(event.data);
    newRecorder.start();
    console.log(`${newRecorder.state} for ${lengthInMS / 1000} seconds…`);

    const stopped = new Promise((resolve, reject) => {
      newRecorder.onstop = resolve;
      newRecorder.onerror = (event) => reject(event.name);
    });

    return Promise.all([stopped]).then(() => data);
  }

  function stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }



  function handleStartButtonClick() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        previewRef.current.srcObject = stream;
        downloadButtonRef.current.href = stream;
        previewRef.current.captureStream =
          previewRef.current.captureStream || previewRef.current.mozCaptureStream;
        return new Promise((resolve) => (previewRef.current.onplaying = resolve));
      })
      .then(() => startRecording(previewRef.current.captureStream(), recordingTimeMS))
      .then((recordedChunks) => {
        const recordedBlob = new Blob(recordedChunks, {
          type: "audio/wav",
        });
        setRecdata(recordedBlob)
        recordingRef.current.src = URL.createObjectURL(recordedBlob);
        downloadButtonRef.current.href = recordingRef.current.src;
        downloadButtonRef.current.download = "Recorded.wav";

        console.log(
          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
        );
      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          console.log("Camera or microphone not found. Can't record.");
        } else {
          console.log(error);
        }
      });
  }

  function handleStopButtonClick() {
    stop(previewRef.current.srcObject);
    recorder.stop();
  }

  const [isActive, setIsActive] = useState({
    id: 'divOne',
    tg: true
  })

  const hideShowDiv = (e) => {
    setIsActive({
      id: e.target.id,
      tg: !isActive.tg
    })
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Summary to be generated here ')
    console.log(file,recdata,mname,mdesc,mdate)
  };


  return (
    <div>

    <div className="px-4 pt-5 my-5 text-center ">
      <h1 className="display-4 fw-bold text-body-emphasis">Generate Summary</h1>
      <div className="col-lg-6 mx-auto ">
        <p className="lead mb-4">Quickly generate summary of your meetings </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <button type="button" id="divOne" onClick={(e) => {hideShowDiv(e)}} className={`btn btn-lg px-4 me-sm-3 ${isActive.tg ? "btn-primary" : "btn-outline-primary"}`}>Record Audio</button>
          <button type="button" id="divTwo" onClick={(e) => {hideShowDiv(e)}} className={`btn btn-lg px-4 me-sm-3 ${!isActive.tg ? "btn-primary" : "btn-outline-primary"}`}>Upload Audio</button>
        </div>
        <form onSubmit={handleSubmit} className='bg-light rounded p-5'>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Meeting Name:</span>
            <input type="text" className="form-control focus-ring focus-ring-light" placeholder="name..." required onChange={e => setMname(e.target.value)}/>
          </div>

          <div className="input-group">
            <span className="input-group-text">Description</span>
            <textarea className="form-control focus-ring focus-ring-light" aria-label="With textarea" required onChange={e => setMdesc(e.target.value)}></textarea>
          </div>

          <div className="input-group pt-3">
            <span className="input-group-text">Date</span>
            <input type="date" className="form-control focus-ring focus-ring-light" id="date" name="date" required onChange={e => setMdate(e.target.value)}/>
          </div>

          {/* recording audio below */}
          <div className={isActive.id === 'divOne' ? `divOne` : 'divOne d-none'}>
            <div className="d-flex justify-content-center align-items-center">
                <div>
                  <button ref={startButtonRef} className="btn btn-outline-success m-4" onClick={handleStartButtonClick}>
                    Start Recording
                  </button>
                  <video ref={previewRef} width="0" height="0" autoPlay muted></video>
                </div>
                <div>
                  <button ref={stopButtonRef} className="btn btn-outline-danger m-4" onClick={handleStopButtonClick}>
                    Stop Recording
                  </button>
                </div>
                <div>
                  <video ref={recordingRef} className='' width="147" height="45" controls></video>
                </div>
                <div><button className="btn btn-outline-info m-4" ref={downloadButtonRef} >Download</button></div>
            </div>
          </div>

          {/* uploading a file below */}
          <div className={isActive.id === 'divTwo' ? `divTwo` : 'divTwo d-none'}> 
            <div className="container-sm pt-5">
              <div className="form  p-2 ">
                <label className = 'pe-3' htmlFor="fileUpload">Upload file:</label>
                <input type="file" className="form-control-file" id="fileUpload" name="fileUpload" onChange={handleFileChange} />
              </div>
            </div>
          </div>

          <button className="btn btn-primary m-4" type='submit'>
            Generate Summary
          </button>

          </form>
      </div>
    </div>


    </div>
  )
}
