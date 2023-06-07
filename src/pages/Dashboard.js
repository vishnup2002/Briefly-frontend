import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // const meetings = [
  //   {
  //     meetingName: "executive committee meeting",
  //     date: "21/02/23",
  //     id: "001"
  //   },
  //   {
  //     meetingName: "branch head meeting",
  //     date: "01/12/22",
  //     id: "002"
  //   },
  //   {
  //     meetingName: "zonal head meeting",
  //     date: "30/05/23",
  //     id: "003"
  //   }
  // ]

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMeetings(data);
      });
  }, []);

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-between py-3 mb-4 border-bottom">
        <span className="fs-1 ps-5">Your Meetings</span>
        <span className="fs-1 pe-5">Date</span>
      </header>

      <div className="container">
        {meetings.map((meetings, index) => (
          <div
            key={index}
            className="d-flex flex-wrap justify-content-between ps-2 pe-2 mb-4 border-bottom"
          >
            <Link
              to={`/meetings/${meetings.id}`}
              className="ps-5 fs-5  px-2 text-dark"
            >
              {meetings.meetingName}
            </Link>
            <span className="pe-5 fs-5">{meetings.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
