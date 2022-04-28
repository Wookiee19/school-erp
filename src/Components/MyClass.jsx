import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Option } from "./Dropdown";
import Request from "./Request/requestClass"
import 'react-dropdown/style.css';
import "./dashboard.css";
import UpdateIcon from "@material-ui/icons/Update";
import LaunchIcon from "@material-ui/icons/Launch";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";


const MyClass = () => {
  const [schoolClass, setSchoolClass] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [classdata, setClassdata] = useState([]);
  const history = useHistory();
  const [prevdata, setPrevdata] = useState("");
  const school_id = localStorage.getItem("school_id");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow2();
    
  };
  const [class_id, setclass_id] = useState([]);
  
  const remove = () => {
    localStorage.removeItem("user_id");
    handleClose2();
  };
  const [sections, setSections] = useState([]);;
  const handleSelect = (e) => {
    
    setSections(e.target.value);
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
  

  useEffect(() => {
     axios
      .get(Request.GetAllClass)
      .then((response) => {
        console.log(response.data.responseBody);
       setClassdata(response.data.responseBody.sort((a,b)=>
       a.classNumber> b.classNumber?1:-1
   ));
      //  sort();
  
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }, []);
  const sort = () => {
    console.log("a1",classdata);
    const sorted = [...classdata].sort((a,b)=>
    a.classNumber> b.classNumber?1:-1
);
console.log("a",sorted);
setClassdata(sorted)
  };
  
  const data = {
  classNumber: schoolClass,
  eventType: "Add Class",
  sectionname: sections,
  };
  const sendData = (e) => {
    if (schoolClass === "") {
      setMessageinfo("Enter Class");
      handleMessage();
    } else if (sections === "") {
      setMessageinfo("Enter Section(s)");
      handleMessage();
    } else {
      axios
        .post(Request.createNew, data)
        .then((response) => {
         
          setSchoolClass();
          setSections([{ name: "" }]);
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
  };
  const reload = () => {
    history.push('/classs');
    history.push('/class');
  };
  
  const deleteClass = (id) => {
   
    axios
    .delete(Request.deleteClass+localStorage.getItem("user_id")+"?eventType=Delete%20Class")
      .then((response) => {
     
        remove();
        reload();
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const update = (id) => {
    axios
      .get(Response.updateClass+id+"?eventType=Get%20Class%20%20By%20Id")
      .then((response) => {
        console.log(response.data.responseBody.classNumber);
        setclass_id(response.data.responseBody.classId);
        setPrevdata(response.data.responseBody);
        setSchoolClass(response.data.responseBody.classNumber);
        handleShow1();
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  const sendUpdated = () => {
    if (schoolClass === "") {
      setMessageinfo("Enter Class");
      handleMessage();
    } 
    else if (sections === "") {
      setMessageinfo("Enter Section(s)");
      handleMessage();
    }
    else {
      axios
        .patch(
          Request.patchClass,
          { 
            classId: class_id, 
            classNumber:schoolClass, 
            eventType: "Patch Class", 
            sectionname: sections
          }
        )
        .then((response) => {
          console.log(response);
          setPrevdata("");
          setSchoolClass();
          reload();
          handleClose1();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  var count = 0;
  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
            <div class="abilan">
                <img alt="Logo" src={"https://d2jg2pri5bpndu.cloudfront.net/schools/250_d2d38ff6daa4f91f7fbfd664553d068a.png"} />
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
              <Link class="nav-link" to="/exam">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Student Exam</div>
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
                  <div class="icon-name">Live Class</div>
                </div>
              </Link> 
              
              {/* <Link class="nav-link" to="/adminresult">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Calendar</div>
                </div>
              </Link> */}
             
             
              {/* <Link class="nav-link" to="/time">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Timetable</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link> */}
           
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Classes </div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {/* back to dashboard option*/}
            
            <div class="message">
              <div class="add-student">
                <button
                  type="button"
                  onClick={handleShow}
                  class="btn btn-primary btn-lg"
                >
                  <AddIcon /> Add Class
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Class</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="number"
                          
                          onChange={(e) => setSchoolClass(e.target.value)}
                          label="Class"
                          variant="filled"
                        />
                      </div>
                      <Dropdown     
        onChange={handleSelect}
         >
        <Option selected value="Sections" />
        <Option value="Section A" />
        <Option value="Section B" />
        <Option value="Section C" />
        <Option value="Section D" />
        <Option value="Section E" />
      </Dropdown>
      
    </div>
                    
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Create
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
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.classNumber}
                          onChange={(e) => setSchoolClass(e.target.value)}
                          label="Class"
                          variant="filled"
                        />
                        </div>

                        <Dropdown onChange={handleSelect}  >
        <Option selected value={prevdata.section} />
        <Option value="Section A" />
        <Option value="Section B" />
        <Option value="Section C" />
        <Option value="Section D" />
        <Option value="Section E" />
      </Dropdown>
                      
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose1}>
                      Close
                    </button>
                    <button onClick={sendUpdated} className="btn btn-primary">
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
                    <button onClick={deleteClass} className="btn btn-primary">
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
                
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                    <th class="border-top-0">#</th>
                      <th class="border-top-0">Class Number</th>
                      <th class="border-top-0">Section</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0">&ensp;&ensp; Delete</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {classdata 
                  .map((val, i) => {
                      return (
                        <>
                          <tr key={i}>
                          <td>{`${count = 1 + count}`}</td>
                          
                            <td class="txt-oflo">{val.classNumber}</td>

                            <td class="txt-oflo">{val.section}</td>
                            <td class="txt-oflo">{val.status}</td>
                            
                            

                            
                            <td>
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                {/* <Button
                              className="student-btn-up"
                              onClick={() => update(val.classId)}
                            >
                              <UpdateIcon className="text-white" />
                            </Button> */}
                                
                                <Button
                                  className="student-btn-del"
                                  
                                  onClick={() => handleClick(val.classId)}
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
export default MyClass;
