import { React, useEffect, useState } from "react";

import { Link, useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import Employeesidebar from "./Employeesidebar";


const EmployeeDashboard = () => {
  const [schooldata, setSchooldata] = useState([]);
  const [paidamount, setPaidAmount] = useState("");
  const [remainingbalance, setRemainingBalance] = useState("");
  const [isOppened, setIsOppened] = useState();
  const [totalClasses, setTotalClasses] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [totalEmployees, setTotalEmployees] = useState();
  const [totalDefaulters, setTotalDefaulters] = useState();
  const [totalAdmissions, setTotalAdmissions] = useState();
  const { studentid } = useParams();
  const school_id = localStorage.getItem("school_id");
  // const admin_id = localStorage.getItem("admin_id");
  const history = useHistory();
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
    axios
      .get(
        ``
      )
      .then((response) => {
        console.log(response.data)
        setPaidAmount(response.data);
      
      })
      .catch((error) => {
        if (error.response) {
          // setMessageinfo(error.response.data.message);
          // handleMessage();
        }
      });

      axios
      .get(
        ``
      )
      .then((response) => {
        console.log("sa",response.data)
        setRemainingBalance(response.data);
      
      })
      .catch((error) => {
        if (error.response) {
          // setMessageinfo(error.response.data.message);
          // handleMessage();
        }
      });
  }, []);
 

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  
  return (
    <>
     
     <Div> 
      <Employeesidebar />
      <Dashboard />
        
          </Div>
          <div class="right-body">
           
           <Snackbar
             anchorOrigin={{ vertical, horizontal }}
             open={open}
             autoHideDuration={4000}
             onClose={CloseMessage}
             message={messageinfo}
             key={vertical + horizontal}
           />
         </div>
    </>
  );
};
export default EmployeeDashboard;

const Div = styled.div`
  position: relative;
`;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;