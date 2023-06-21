import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const [visible, setVisible] = useState(false);
  const [bdata,setbdata] = useState([])
  const [msummary, setMsummary] = useState("Original meeting summary");
  const navigate = useNavigate();
  
  function handleDelete() {
    console.log("delete the meeting and goto dashboard");
    fetch(`http://localhost:8000/user/dashboard/${id}/edit`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    navigate("/dashboard");
  }

  function editMeeting() {
    console.log("Edit the meeting");
    setVisible(true);
  }

  function saveDetails() {
    console.log("post the meeting here");
    console.log(msummary);
    fetch(`http://localhost:8000/user/dashboard/${id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ data: msummary }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMsummary(msummary);
      });

    setVisible(false);
  }

  const { id } = useParams();
  console.log("details of meeting", id);

  useEffect(() => {
    fetch(`http://localhost:8000/user/dashboard/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setbdata(data);
        setMsummary(data.summary);
      });
  }, []);

  return (
    <div>
      <div className="bg-light text-secondary container shadow shadow-lg rounded px-4 py-5 text-center mt-5">
        <div className="py-4">
          <h1 className="display-5 fw-bold text-dark">{bdata.name}</h1>
          <p className="fs-5 mb-4 pe-5 d-flex justify-content-end">
            Date: 27/05/2023
          </p>
          <h4 className="ps-5">
            "Meeting Desc : {bdata.description}" 
          </h4>
          <hr />
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              "Meeting Summary: {bdata.summary}" 
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                onClick={editMeeting}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-lg px-4 "
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            {console.log(visible)}
            {visible ? (
              <div className="p-3">
                <div className="input-group">
                  <span className="input-group-text">Summary</span>
                  <textarea
                    className="form-control focus-ring focus-ring-light"
                    aria-label="With textarea"
                    defaultValue={bdata.summary}
                    onChange={(e) => setMsummary(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success btn-lg px-4 mt-3 "
                    onClick={saveDetails}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger btn-lg px-4 mt-3"
                    onClick={() => setVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
