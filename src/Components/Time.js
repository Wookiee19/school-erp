import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "whatwg-fetch";
import "./view.css";
import { Scheduler } from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.light.css';
import CustomStore from "devextreme/data/custom_store";

const Timetable = () => {
  function getData(_, requestOptions) {
    const PUBLIC_KEY = "AIzaSyBjNulG7KWIF2qbRbrbnlUtqsog7-9lg1s";
    const CALENDAR_ID = "dumy1717@gmail.com";
    const dataUrl = [
      "https://www.googleapis.com/calendar/v3/calendars/",
      CALENDAR_ID,
      "/events?key=",
      PUBLIC_KEY
    ].join("");
  
    return fetch(dataUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => data.items);
  }
  
  const history = useHistory();
const logOut = () => {
  localStorage.clear();
  history.push("/");
  };
  const dataSource = new CustomStore({
    load: (options) => getData(options, { showDeleted: true })
  });
  
  const currentDate = new Date();
  const views = ["day", "workWeek", "month"];
  return (
    <>
      <div class="dashboard">
      <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                
              </div>

              <Link to="/campusdashboard" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas  fa-columns active"></i>
                  </div>
                  <div class="icon-name1 active ">Dashboard</div>
                </div>
              </Link>
              <Link to="/admissioncomponents" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas fa-school"></i>
                  </div>
                  <div class="icon-name1">Admission</div>
                </div>
              </Link>

              <Link class="nav-link" to="/class">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-users-class "></i>
                  </div>
                  <div class="icon-name ">Class</div>
                </div>
              </Link>

              <Link class="nav-link" to="/students">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Students</div>
                </div>
              </Link>
              <Link class="nav-link" to="/employee">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <div class="icon-name"> Employee</div>
                </div>
              </Link>
              <Link class="nav-link" to="/feecomponents">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-money-check-alt"></i>
                  </div>
                  <div class="icon-name">Fee</div>
                </div>
              </Link>
              <Link class="nav-link" to="/subject">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Subject</div>
                </div>
              </Link>
              <Link class="nav-link" to="/adminresult">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Calendar</div>
                </div>
              </Link>
              <Link class="nav-link" to="/adminledger">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Student Ledger</div>
                </div>
              </Link>
              <Link class="nav-link" to="/time">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">timer</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>
              

            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <div className="long-title">
          <h3>TimeTable</h3>
        </div>
        <Scheduler
          dataSource={dataSource}
          views={views}
          defaultCurrentView="workWeek"
          defaultCurrentDate={currentDate}
          height={750}
          startDayHour={8}
          editing={true}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          timeZone="	Asia/Kolkata"
        />
          </div>
        </div>
      </div>
    </>
  );
};
export default Timetable;
