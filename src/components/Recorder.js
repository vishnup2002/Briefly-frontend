// // 


// import React, { useRef, useState } from "react";

// function Recorder(props) {
//   const previewRef = useRef(null);
//   const recordingRef = useRef(null);
//   const startButtonRef = useRef(null);
//   const stopButtonRef = useRef(null);
//   const downloadButtonRef = useRef(null);

//   const [recdata, setRecdata] = useState(new Blob())

//   const [recorder, setRecorder] = useState(null);
//   const recordingTimeMS = 500000;

//   function startRecording(stream, lengthInMS) {
//     const newRecorder = new MediaRecorder(stream);
//     setRecorder(newRecorder);

//     const data = [];

//     newRecorder.ondataavailable = (event) => data.push(event.data);
//     newRecorder.start();
//     console.log(`${newRecorder.state} for ${lengthInMS / 1000} seconds…`);

//     const stopped = new Promise((resolve, reject) => {
//       newRecorder.onstop = resolve;
//       newRecorder.onerror = (event) => reject(event.name);
//     });

//     return Promise.all([stopped]).then(() => data);
//   }

//   function stop(stream) {
//     stream.getTracks().forEach((track) => track.stop());
//   }



//   function handleStartButtonClick() {
//     navigator.mediaDevices
//       .getUserMedia({
//         audio: true,
//       })
//       .then((stream) => {
//         previewRef.current.srcObject = stream;
//         downloadButtonRef.current.href = stream;
//         previewRef.current.captureStream =
//           previewRef.current.captureStream || previewRef.current.mozCaptureStream;
//         return new Promise((resolve) => (previewRef.current.onplaying = resolve));
//       })
//       .then(() => startRecording(previewRef.current.captureStream(), recordingTimeMS))
//       .then((recordedChunks) => {
//         const recordedBlob = new Blob(recordedChunks, {
//           type: "audio/wav",
//         });
//         setRecdata(recordedBlob)
//         recordingRef.current.src = URL.createObjectURL(recordedBlob);
//         downloadButtonRef.current.href = recordingRef.current.src;
//         downloadButtonRef.current.download = "Recorded.wav";

//         console.log(
//           `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
//         );
//       })
//       .catch((error) => {
//         if (error.name === "NotFoundError") {
//           console.log("Camera or microphone not found. Can't record.");
//         } else {
//           console.log(error);
//         }
//       });
//   }

//   function handleStopButtonClick() {
//     stop(previewRef.current.srcObject);
//     recorder.stop();
//   }

//   async function generateSummary() {
//     console.log('Summary to be generated here ')
//     console.log(recdata, props['mname'], props['mdesc'], props['mdate'])
//     async function sendData() {
//       const formData = new FormData();
//       formData.append('audio', recdata);
//       formData.append('meetingName',props['mname']);
//       formData.append('meetingDesc',props['mdesc']);
//       formData.append('meetingDate',props['mdate']);


//       const response = await fetch('http://localhost:8000/user/logic', {
//         method: 'POST',
//         body: formData,
//         headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       });


//     }

//     await sendData();
//   }

//   return (
//     <div className="d-flex justify-content-center ">
//       <div>
//         <button ref={startButtonRef} className="btn btn-outline-success m-4" onClick={handleStartButtonClick}>
//           Start Recording
//         </button>
//         <video ref={previewRef} width="0" height="0" autoPlay muted></video>
//       </div>
//       <div>
//         <button ref={stopButtonRef} className="btn btn-outline-danger m-4" onClick={handleStopButtonClick}>
//           Stop Recording
//         </button>
//       </div>
//       <video ref={recordingRef} className='pb-5 ' width="160" height="120" controls></video>
//       <div><button className="btn btn-outline-info m-4" ref={downloadButtonRef} >Download</button></div>
//       <div>
//         {/* <button className="btn btn-primary m-4" onClick={generateSummary}>
//           Generate Summary
//         </button> */}
//         {props['submit'](generateSummary)}
//       </div>
//     </div>
//   );
// }

// export default Recorder






import React, { useRef, useState } from "react";

function Recorder(props) {
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

  async function generateSummary() {
    console.log('Summary to be generated here ')
    console.log(recdata, props['mname'], props['mdesc'], props['mdate'])
    async function sendData() {
      console.log("hello");
      const formData = new FormData();
      formData.append('audio', recdata);
      formData.append('meetingName',props['mname']);
      formData.append('meetingDesc',props['mdesc']);
      formData.append('meetingDate',props['mdate']);


      const response = await fetch('http://localhost:8000/user/logic', {
        method: 'POST',
        body: formData,
        headers: { "Content-Type": "application/json" },
      credentials: "include",
      });

      


    }
    console.log("hello");
    await sendData();
  }

  return (
    <div className="d-flex justify-content-center ">
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
        <video ref={recordingRef} className='pb-5 ' width="160" height="120" controls></video>
        <div><button className="btn btn-outline-info m-4" ref={downloadButtonRef} >Download</button></div>
        <div>
          <button className="btn btn-primary m-4" onClick={generateSummary}>
            Generate Summary
          </button>
        </div>
    </div>
  );
}

export default Recorder
