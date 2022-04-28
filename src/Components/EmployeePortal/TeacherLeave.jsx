import { React, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useHistory , useParams} from "react-router-dom";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import MultiSelect from "react-multi-select-component";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "30ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const StudentLeave = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const [classdata, setClassdata] = useState([]);
  const school_id = localStorage.getItem("school_id");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [start_date, setStartDate] = useState("")
  const [description, setDescription] = useState("")
  const [end_date, setEndDate] = useState("")
  const handleClick = (id) => {
    localStorage.setItem("asset_id", id);
    handleShow2();
  };
  const remove = () => {
    localStorage.removeItem("asset_id");
    handleClose2();
  };

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


  const {studentid} = useParams()


//   const [price, setPrice] = useState("");

  const data = {
      start_date:start_date,
      end_date: end_date,
      student_id:studentid,
      school_id: school_id,
      description : description
    }

    useEffect(() => {
      reload();
    },[])

    function reload(){
      axios.get(`https://fee-management-api.nastechltd.co/api/show_leave/${studentid}`)
      .then((response) => {
        console.log(response.data)
        setClassdata(response.data);
      })
    }
  function sendData() {
    
    console.log(data);
    console.log("data");
 
    axios.post(`https://fee-management-api.nastechltd.co/api/student_leave`, data)
      .then((response) => {
        console.log(response);
        handleClose();
        reload();
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }
// }

  

  const logOut = () => {
    localStorage.clear();
   
  };

 

 
  

  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img
                  alt="Logo"
                  src={
                    "https://fee-management-api.nastechltd.co/api/school_profile/" +
                    localStorage.getItem("school_id")
                  }
                />
              </div>

              <Link class="nav-link" to={`/EmployeeDashboard`}>
                <div class="folder-icons">
                  <div class="icon1">
                  <i class="fas fa-tachometer-alt active"></i>
                  </div>
                  <div class="icon-name active">Dashboard</div>
                </div>
              </Link>

              <Link class="nav-link" to={`Teacherprofile`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-circle"></i>
                  </div>
                  <div class="icon-name">Profile</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/Teacherledger`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt "></i>
                  </div>
                  <div class="icon-name ">Student Ledger</div>
                </div>
              </Link>
              
              <Link class="nav-link" to={`/Teacherpassword`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-key"></i>
                  </div>
                  <div class="icon-name">Change Password</div>
                </div>
              </Link>

               

             <Link class="nav-link" to={`/TeacherAttendance`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check "></i>
                  </div>
                  <div class="icon-name ">View Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/TeacherLeave`}>
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
                <div class="big-inbox">Leave Application</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {/* back to dashboard option*/}
            <a href="/campusdashboard" style={{ textDecoration: "none" }}>
              <div
                className="col-xl-2 dash-button"
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "6px",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <i
                  class="fas fa-tachometer-alt"
                  style={{ fontSize: "25px" }}
                ></i>
                <h5
                  style={{
                    margin: "0px",
                    marginLeft: "10px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </h5>
              </div>
            </a>
            <div class="message">
              <div class="add-student">
                <button
                  type="button"
                  onClick={handleShow}
                  class="btn btn-primary btn-lg"
                >
                  Apply For Leave
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Apply For Leave</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="name"
                        type="date"
                        
                        variant="filled"
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="name"
                        type="text"
                        label="description"
                        variant="filled"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="end date"
                        type="date"
                       
                        variant="filled"
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                   
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Send
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Class</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        
                      </div>
                    </div>

                    

                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                       
                      </div>
                    </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose1}>
                      Close
                    </button>
                    <button  className="btn btn-primary">
                      Update
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={remove}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <h2 className="text-center">
                          Are You Sure You Want To Delete?
                        </h2>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={remove}>
                      Close
                    </button>
                    <button  className="btn btn-primary">
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">Start Date</th>
                      <th class="border-top-0">End Date</th>
                   
                      <th class="border-top-0">Description</th>
                     
                      
                      <th class="border-top-0">Action</th>
                      

                    </tr>
                  </thead>

                  <tbody>
                    {classdata.map((val, i) => {
                      return (
                        <>
                          <tr key={i}>

                            <td class="txt-oflo">{val.start_date}</td>
                           
                            <td class="txt-oflo">{val.end_date}</td>
                            <td class="txt-oflo">{val.description}</td> 
                            <td>
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                <Button
                                  className="student-btn-up"
                                  
                                >
                                  <UpdateIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-del"
                                  onClick={() => handleClick(val.id)}
                                >
                                  <DeleteIcon className="text-white" />
                                </Button>
                              </ButtonGroup>
                            </td>
                        
                            
                          </tr>
                        </>
                      );
                    })}
                  </tbody> 
            
                </table>
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
export default StudentLeave;
