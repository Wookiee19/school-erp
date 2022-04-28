import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from "@material-ui/core/Snackbar";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Amplify, { Auth } from "aws-amplify";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Sidebar from "../Components/adnin/Sidebar";
import Dashboard from "../Components/adnin/Dashboard";

const CampusDashboard = () => {
  const [schooldata, setSchooldata] = useState([]);
  
  const [isOppened, setIsOppened] = useState();
  const [totalClasses, setTotalClasses] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [totalEmployees, setTotalEmployees] = useState();
  const [totalDefaulters, setTotalDefaulters] = useState();
  const [TotalExam, setTotalExam] = useState();
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
         console.log("CLASS",response.data.responseBody.length)
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
 

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const openAdmission = () => {
    axios
      .put(
        ``
      )
      .then((response) => {
        console.log(response);
        axios
          .get(
            ``
          )
          .then((response) => {
            console.log(response.data.is_oppend);
            setIsOppened(response.data.is_oppend);
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  
  return (
    <>
      <div class="dashboard">
     
          

              <Sidebar />
              <Dashboard />

            
       
        
      </div>
    </>
  );
};
export default CampusDashboard;
