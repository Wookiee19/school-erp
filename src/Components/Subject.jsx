import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Link, useHistory } from "react-router-dom";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LaunchIcon from "@material-ui/icons/Launch";
import Snackbar from "@material-ui/core/Snackbar";
import DescriptionIcon from "@material-ui/icons/Description";
import ClassIcon from '@mui/icons-material/Class';
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, Option } from "./Dropdown";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    //   width: '30ch',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Mystudents = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show5, setShow5] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose4 = () => setShow4(false);
  const handleClose5 = () => setShow5(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow4 = () => setShow4(true);
  const handleShow5 = () => setShow5(true);
  const [studentdata, setstudentdata] = useState([]);
  const [subjectname, setsubjectname] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [classdata, setClassdata] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [subjectdata, setsubjectdata] = useState([]);
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [line1, setline1] = useState();
  const [line2, setline2] = useState();
  const [pinCode, setpinCode] = useState();
  const [state, setstate] = useState();
  const [isAddressPermanen, setisAddressPermanen] = useState();
  
  const [email, setEmail] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [mname, setMname] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [userdata, setUserdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prevdata, setPrevdata] = useState("");
  var mydata = [];
  const [sections, setSections] = useState([]);;
  const history = useHistory();
  const school_id = localStorage.getItem("school_id");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  
  const [schoolClass, setSchoolClass] = useState();
  const handleShow3 = () => setShow3(true);
  const [class_id, setclass_id] = useState([]);
  const changeClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow3();
  };
  const remove1 = () => {
    localStorage.removeItem("user_id");
    handleClose3();
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClick = (id) => {
    localStorage.setItem("subject_id", id);
    handleShow2();
  };
  const handleSelect = (e) => {
    
    setSectionid(e.target.value);
  };
  const handleClick5 = (id,id1) => {
    localStorage.setItem("subject_id", id);
    localStorage.setItem("class_id", id1);
    handleShow5();
  };
  const remove = () => {
    localStorage.removeItem("user_id");
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
  if (studentdata.length > 0 && userdata.length > 0) {
    for (var i = 0; i < studentdata.length; i++) {
      for (var j = 0; j < userdata.length; j++) {
        var dd = {
          contact: `${studentdata[i].contact}`,
          address: `${studentdata[i].address}`,
          gender: `${studentdata[i].gender}`,
          id: `${studentdata[i].id}`,
          name: "",
          email: "",
        };
        if (studentdata[i].user_id === userdata[j].id) {
          dd.name = `${userdata[j].first_name} ${userdata[j].last_name}`;
          dd.email = `${userdata[j].email}`;
        }
      }
      mydata.push(dd);
    }
  }
  
  const data = {
    classNumber: classid ,
    sectionname: sectionid,
  subjectName: subjectname
  }
  
    const sendData = () => {
     console.log("data",data);
   
        axios
          .post("https://65.2.31.39/erpdev/subject/add-subject",data)
          .then((response) => {
           
            handleClose();
            reload();
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
     
    };
 
    
  
  useEffect(() => {


    axios
    .get(
      `https://65.2.31.39/erpdev/api/class/Get%20All%20Class`
    )
    .then((response) => {
      console.log(response.data.responseBody);
     setClassdata(response.data.responseBody.sort((a,b)=>
       a.classNumber> b.classNumber?1:-1
   ));
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    });
    
    
    axios
      .get(``)
      .then((response) => {
        console.log(response);
        setUserdata(response.data);
        
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        ``
      )
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }, [setsubjectdata]);

  const reload = () => {
    history.push('/subject');
    history.push('/subject');
  
  };
  const getdata = () => {
    
    axios
      .get("https://65.2.31.39/erpdev/subject/linked-subject/"+classid+"/"+sectionid)
      .then((response) => {
        console.log(response.data.responseBody);
        setsubjectdata(response.data.responseBody);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const deleteData = () => {
    
    axios
      .delete(
        `https://65.2.31.39/erpdev/subject/`+localStorage.getItem("subject_id")
      )
      .then((response) => {
        console.log(response);
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
      .get(``)
      .then((response) => {
        setPrevdata(response.data);
        setFname(response.data.first_name);
        setLname(response.data.last_name);
        setMname(response.data.middle_name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setContact(response.data.contact);
        setGender(response.data.gender);
        handleShow1();
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  // console.log(fname)
  const sendUpdated = () => {
          {
        axios
          .patch(
            `https://65.2.31.39/erpdev/subject/edit-subject`,
            {
              
                classId: localStorage.getItem("class_id"),
                subjectId: localStorage.getItem("subject_id"),
                subjectName: subjectname
              
            }
          )
          .then((response) => {
            console.log(response);
            reload();
            handleClose5();
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
      } 
    
  };
  const search = () => {
    axios
      .get(``)
      .then((response) => {
        console.log(response.data);
        setSectiondata(response.data);
      })
      .catch((error) => console.log(error));
  };
  const reset = () => {
    setClassid("");
    setSearchTerm("");
    setSectionid("");
  };
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  function updateStudent(id){
    localStorage.setItem("reg_no",id);
    history.push("/studentparticular")
  }
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
              <Link class="nav-link" to="/liveclass">
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
              </Link>
              <Link class="nav-link" to="/adminledger">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Student Ledger</div>
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
                <div class="big-inbox">Subject</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {/* back to dashboard option*/}
            
              <button
                  type="button"
                  onClick={handleShow}
                  class="btn btn-primary btn-lg"
                  style={{
                    margin: "0px",
                    marginLeft: "1350px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  <AddIcon /> Add Subject
                </button>
                <br/>
            

            <div class="message">
              <div class="add-student">
                 <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Subject</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                      <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setClassid(e.target.value)}
                                                    >
                                                        {classdata 
                                                        .map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.classNumber}>{`${val.classNumber}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setSectionid(e.target.value)}
                                                    >
                                                        {classdata 
                                                         .map((val, i) => {
                                                          if(val.classNumber==classid)
                                                            return (
                                                                <MenuItem value={val.section}>{`${val.section}`}</MenuItem>
                                                            )

                                                        })}
                                                        
                                                    </Select>
                                                </FormControl>
                     
                              <TextField className="pb-3 bg-white" 
                              type="text" 
                              onChange={(e) => setsubjectname(e.target.value)} 
                              label="Subject Name" variant="filled" />
                                               
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button  onClick={sendData} className="btn btn-primary">Create</button>
                                    </Modal.Footer>
                                </Modal> 
                                
                <Modal show={show5} onHide={handleClose5}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Students</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={prevdata.last_name}
                          onChange={(e) => setsubjectname(e.target.value)}
                          label="Subject Name"
                          variant="filled"
                        />
                       
                      </div>
                      
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose5}>
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
                    <button onClick={deleteData} className="btn btn-primary">
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
                
              </div>
              <div className="row">
                {/* <div className="col-6 text-left mt-1">
                  <TextField
                    className="pb-3 bg-white"
                    value={searchTerm}
                    type="text"
                    helperText="By subject name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    label="Search Subject"
                  />
                  <button onClick={reset} className="btn btn-primary mt-3 ml-5">
                    Reset
                  </button>
                  </div> */}
                  <div className="col-6 text-left mt-1">
                  <FormControl className={classes.formControl} >
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setClassid(e.target.value)}
                                                    >
                                                        {classdata 
                                                        .map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.classNumber}>{`${val.classNumber}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setSectionid(e.target.value)}
                                                    >
                                                        {classdata 
                                                        .map((val, i) => {
                                                          if(val.classNumber==classid)
                                                            return (
                                                                <MenuItem value={val.section}>{`${val.section}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <button onClick={getdata} className="btn btn-primary mt-3 ml-5" style={{ marginLeft: "-5%" }}>
                    Get
                  </button>
                </div>
                
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                    <th class="border-top-0">#</th>
                    
                      <th class="border-top-0">Subject Name</th>
                      <th class="border-top-0">Class</th>
                      <th class="border-top-0">Section</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0">&ensp;Update&ensp;&ensp; Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    
                    {subjectdata 
                      
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          `${val.subjectName}` 
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      
                      
                      .map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>{`${count = 1 + count}`}</td>
                            
                            <td>
                            {val.subjectName}
                             
                            </td>
                            <td>
                            {val.classNumber}
                             
                            </td>
                            <td>
                            {val.sectionName}
                             
                            </td>
                             
                            <td>
                            {val.subjectStatus}
                             
                            </td>
                            
                            
                            <td>
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                
                                <Button
                                  className="student-btn-up"
                                  onClick={() => handleClick5(val.subjectId,val.classId)}
                                >
                                  <UpdateIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-del"
                                  onClick={() => handleClick(val.subjectId)}
                                >
                                  <DeleteIcon className="text-white" />
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
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
export default Mystudents;
