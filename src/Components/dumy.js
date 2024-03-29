import { React, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useHistory, useParams } from "react-router-dom";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styleFunctionSx from "@mui/system/styleFunctionSx";

const StudentDashboard = () => {
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
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                
              </div>

              <Link class="nav-link" to={`/studentdashboard`}>
                <div class="folder-icons">
                  <div class="icon1">
                  <i class="fas fa-tachometer-alt active"></i>
                  </div>
                  <div class="icon-name active">Dashboard</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/student-profile`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-circle"></i>
                  </div>
                  <div class="icon-name">Profile</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/studentledger`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt "></i>
                  </div>
                  <div class="icon-name ">Student Ledger</div>
                </div>
              </Link>
              
              <Link class="nav-link" to={`/studentpassword`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-key"></i>
                  </div>
                  <div class="icon-name">Change Password</div>
                </div>
              </Link>

               

             <Link class="nav-link" to={`/ViewAttendance`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check "></i>
                  </div>
                  <div class="icon-name ">View Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/StudentLeave`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check "></i>
                  </div>
                  <div class="icon-name ">Student Leave</div>
                </div>
              </Link>


             
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
              <div class="big-inbox">Dashboard</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
         

          <div class="right-body">
            <div class="campus-sts">
              <div className="show_fee p-5">
                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="row card-body w-100">
                    <div className="float-start col-8">
                      <h4>Remaining Balance</h4>
                      <p className="text-bold text-danger">{remainingbalance}</p>
                    </div>
                    <div className="float-end mb-2 col-4">
                      <i class="txt-icon  fa-5x fas fa-user-clock"></i>
                      
                    </div>
                  </div>
                </div>
                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="row card-body w-100">
                    <div className="float-start col-8">
                      <h4>Paid Amount</h4>
                      <p className="text-bold text-danger">{paidamount}</p>
                    </div>
                    <div className="float-end mb-2 col-4">
                      <i class="txt-icon fas fa-5x fa-file-invoice-dollar"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={4000}
              onClose={CloseMessage}
              message={messageinfo}
              key={vertical + horizontal}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentDashboard;
