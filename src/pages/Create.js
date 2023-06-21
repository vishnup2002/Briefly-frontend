import React from "react";
import { useState } from "react";
import { useRef } from "react";

export default function Create(props) {
  const [file, setFile] = useState(null);
  const [mname, setMname] = useState("");
  const [mdesc, setMdesc] = useState("");
  const [mdate, setMdate] = useState("dd/mm/yyyy");
  const previewRef = useRef(null);
  const recordingRef = useRef(null);
  const startButtonRef = useRef(null);
  const stopButtonRef = useRef(null);
  const downloadButtonRef = useRef(null);

  const [recdata, setRecdata] = useState(new Blob());

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



  function handleStartButtonClick(e) {
    e.preventDefault();
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        previewRef.current.srcObject = stream;
        downloadButtonRef.current.href = stream;
        previewRef.current.captureStream =
          previewRef.current.captureStream ||
          previewRef.current.mozCaptureStream;
        return new Promise(
          (resolve) => (previewRef.current.onplaying = resolve)
        );
      })
      .then(() =>
        startRecording(previewRef.current.captureStream(), recordingTimeMS)
      )
      .then((recordedChunks) => {
        const recordedBlob = new Blob(recordedChunks, {
          type: "audio/wav",
        });
        setRecdata(recordedBlob);
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

  function handleStopButtonClick(e) {
    e.preventDefault();
    stop(previewRef.current.srcObject);
    recorder.stop();
  }

  const [isActive, setIsActive] = useState({
    id: "divOne",
    tg: true,
  });

  const hideShowDiv = (e) => {
    if (isActive.id !== e.target.id) {
      setIsActive({
        id: e.target.id,
        tg: !isActive.tg,
      });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
    setFile(selectedFile);
  };

  function validateFile(event) {
    const fileInput = event.target;
    console.log(fileInput);
    const file = fileInput.files[0];
    console.log(file);
    const allowedExtensions = /(\.wav)$/i;
  
    if (!allowedExtensions.exec(file.name)) {
      alert('Please select a .wav file.');
      fileInput.value = '';
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Summary to be generated here ')
    console.log(file,recdata,mname,mdesc,mdate);
    console.log('Summary to be generated here ')
    console.log(recdata,mname,mdesc,mdate)
    async function sendData() {
      console.log("hello");
      const formData = new FormData();
      isActive.id ==='divOne' ? formData.append('audio', recdata) : formData.append('audio', file);
      // formData.append('audio', recdata);
      formData.append('meetingName',mname);
      formData.append('meetingDesc',mdesc);
      formData.append('meetingDate',mdate);


      const response = await fetch('http://localhost:8000/user/logic', {
        method: 'POST',
        body: formData,
        credentials : 'include'
      });
    }

    console.log("hello");
    await sendData();
    console.log("Summary to be generated here ");
    console.log(file, recdata, mname, mdesc, mdate);
  };

  

  const yyyy = new Date().getFullYear();
  const mm = String(new Date().getMonth() + 1).padStart(2, "0");
  const dd = String(new Date().getDate()).padStart(2, "0");

  return (
    <div>
      <div className="px-4 pt-5 my-5 text-center ">
        <h1 className="display-4 fw-bold text-body-emphasis">
          Generate Summary
        </h1>
        <div className="col-lg-6 mx-auto ">
          <p className="lead mb-4">
            Quickly generate summary of your meetings{" "}
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              id="divOne"
              onClick={(e) => {
                hideShowDiv(e);
              }}
              className={`btn btn-lg px-4 me-sm-3 ${
                isActive.tg ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              Record Audio
            </button>
            <button
              type="button"
              id="divTwo"
              onClick={(e) => {
                hideShowDiv(e);
              }}
              className={`btn btn-lg px-4 me-sm-3 ${
                !isActive.tg ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              Upload Audio
            </button>
          </div>
          <form onSubmit={handleSubmit} className="bg-light rounded p-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Meeting Name:
              </span>
              <input
                type="text"
                className="form-control focus-ring focus-ring-light"
                placeholder="name..."
                required
                onChange={(e) => setMname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea
                className="form-control focus-ring focus-ring-light"
                aria-label="With textarea"
                required
                onChange={(e) => setMdesc(e.target.value)}
              ></textarea>
            </div>

            <div className="input-group pt-3">
              <span className="input-group-text">Date</span>
              <input
                type="date"
                className="form-control focus-ring focus-ring-light"
                id="date"
                name="date"
                value={yyyy + "-" + mm + "-" + dd}
                required
                onChange={(e) => setMdate(e.target.value)}
              />
            </div>

            {/* recording audio below */}
            <div
              className={isActive.id === "divOne" ? `divOne` : "divOne d-none"}
            >
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <button
                    ref={startButtonRef}
                    className="btn btn-outline-success m-4"
                    onClick={handleStartButtonClick}
                  >
                    Start Recording
                  </button>
                  <video
                    ref={previewRef}
                    width="0"
                    height="0"
                    autoPlay
                    muted
                  ></video>
                </div>
                <div>
                  <button
                    ref={stopButtonRef}
                    className="btn btn-outline-danger m-4"
                    onClick={handleStopButtonClick}
                  >
                    Stop Recording
                  </button>
                </div>
                <div>
                  <video
                    ref={recordingRef}
                    className=""
                    width="147"
                    height="45"
                    controls
                  ></video>
                </div>
                <div>
                  <button
                    className="btn btn-outline-info m-4 d-none"
                    ref={downloadButtonRef}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* uploading a file below */}
            <div
              className={isActive.id === "divTwo" ? `divTwo` : "divTwo d-none"}
            >
              <div className="container-sm pt-5">
                <div className="form  p-2 ">
                  <label className="pe-3" htmlFor="fileUpload">
                    Upload file:
                  </label>
                  <input
                    type="file"
                    accept=".wav"
                    className="form-control-file"
                    id="fileUpload"
                    name="fileUpload"
                    onChange={handleFileChange}
                    onInput={(e)=>{validateFile(e)}}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary m-4" type="submit">
              Generate Summary
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
