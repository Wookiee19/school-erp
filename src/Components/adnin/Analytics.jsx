import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";
import "../student.css"
import axios from "axios";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import Helmet from 'react-helmet';

export default function Analytics() {
  const history = useHistory();
  const [schooldata, setSchooldata] = useState([]);
  
  const [isOppened, setIsOppened] = useState();
  const [totalClasses, setTotalClasses] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [totalEmployees, setTotalEmployees] = useState();
  const [totalDefaulters, setTotalDefaulters] = useState();
  const [TotalExam, setTotalExam] = useState();
  const school_id = localStorage.getItem("school_id");

  const [messageinfo, setMessageinfo] = useState("");
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = message;
  const handleMessage = () => {
    setMessage({ open: true, vertical: "top", horizontal: "right" });
  };
  const CloseMessage = () => {
    setMessage({ ...message, open: false });
  };

  useEffect(() => {
  
    // axios
    //   .get(
    //     ``
    //   )
    //   .then((response) => {
    //     // console.log(response.data.is_oppend)
    //     setSchooldata(response.data);
    //     setIsOppened(response.data.is_oppend);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       setMessageinfo(error.response.data.message);
    //       handleMessage();
    //     }
    //   });
    axios
      .get(
        `https://65.2.31.39/erpdev/api/class/Get%20All%20Class`
      )
      .then((response) => {
         console.log(response.data.responseBody.length)
        setTotalClasses(response.data.responseBody.length);
        
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    // axios
    //   .get(
    //     ``
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     setTotalDefaulters(response.data);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       setMessageinfo(error.response.data.message);
    //       handleMessage();
    //     }
    //   });
    axios
      .get(
        `https://65.2.31.39/erpdev/exam?page=0&size=25`
      )
      .then((response) => {
         console.log(response.data.responseBody.numberOfElements)
        setTotalExam(response.data.responseBody.numberOfElements);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
      axios
      .get(
        `https://65.2.31.39/erpdev/user?eventType=Get_ALL_Users&page=0&roles=Student&size=25&sortBy=userId`
      )
      .then((response) => {
         console.log(response.data.responseBody.content.length)
        setTotalStudents(response.data.responseBody.content.length);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `https://65.2.31.39/erpdev/user?eventType=Get_ALL_Users&page=0&roles=Teacher&size=25&sortBy=userId`
      )
      .then((response) => {
        // console.log(response.data)
        setTotalEmployees(response.data.responseBody.content.length);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    // axios
    //   .get(
    //     ``
    //   )
    //   .then((response) => {
    //     // console.log(response.data)
    //     setTotalAdmissions(response.data);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       setMessageinfo(error.response.data.message);
    //       handleMessage();
    //     }
    //   });
  }, []);
 
  return (
    <Section>
     
      <div className="analytic ">
        <div className="content">
          
          <h5>Total Classes</h5>
          <h2>{totalClasses}</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content" >
          
          <h5>Total Student</h5>
          <h2>{totalStudents}</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
         <FcMoneyTransfer/>
        </div>
        <div className="content">
          <h5> Total Teachers</h5>
          <h2>{totalEmployees}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Exams </h5>
          <h2>{TotalExam}</h2>
        </div>
        <div className="logo">
          <FcCalendar/>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Defaulteres </h5>
          <h2>25</h2>
        </div>
        <div className="logo">
          <FcCalendar/>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Teachers Absent  </h5>
          <h2>12</h2>
        </div>
        <div className="logo">
          <FcCancel/>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>New Admission </h5>
          <h2>54</h2>
        </div>
        <div className="logo">
          <FcApproval/>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Total Complaint  </h5>
          <h2>2</h2>
        </div>
        <div className="logo">
          <FcAbout/>
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  height:12rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background: -webkit-linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(161,128,243,1) 97%, rgba(89,0,255,0.9920343137254902) 100%);
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
