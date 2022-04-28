import React, { useState, useEffect } from "react";
import "./dashboard.css";
import styled, { ThemeProvider } from "styled-components";
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
import { useFaker } from 'react-fakers'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
  const { success, error, loading } = useFaker()
  const classes = useStyles();
  const BorderedAvatar = styled(Avatar)`
  border: 2px solid lightseagreen;
`;
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
  const [studentdata, setStudentdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  // const [searchTerm, setSearchTerm] = useState('');
  const [admissionDate, setadmissionDate]=useState();
  const [dateOfBirth, setdateOfBirth]=useState();
  const [fatherName, setfatherName]=useState();
  const [imageUrl, setimageUrl]=useState();
  const [motherName, setmotherName]=useState();
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [line1, setline1] = useState();
  const [line2, setline2] = useState();
  const [pinCode, setpinCode] = useState();
  const [state, setstate] = useState();
  const [isAddressPermanen, setisAddressPermanen] = useState();
var [userdata1, setUserdata1] = useState([]);
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
  const [show6, setShow6] = useState(false);
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
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const handleClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow2();
  };
  const handleClick6 = (data) => {
    
    setUserdata1=data;
   
    handleShow6();
    
  };
  const handleClick4 = (id) => {
    localStorage.setItem("user_id", id);
    handleShow4();
  };
  const handleClick5 = (id) => {
    localStorage.setItem("user_id", id);
    handleShow5();
  };
  const remove = () => {
    localStorage.removeItem("user_id");
    handleClose2();
  };
  const handleSelect = (e) => {
    
    setSectiondata(e.target.value);
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
  
  
  const data = {
    "address": {
      "city": city,
      "country":country,
      "isAddressPermanent": true,
      "line1": line1,
      "line2": line2,
      "pinCode": pinCode,
      "state": state
    },
    "admissionDate": admissionDate,
    "dateOfBirth": dateOfBirth,
    "email": email,
    "fatherName": fatherName,
    "firstName": fname,
    "gender": gender,
    "imageUrl": imageUrl,
    "lastname": lname,
    "motherName": motherName,
    "password": password,
    "roles": "Student"
  }
  
    const sendData = () => {
      if (email === "") {
        setMessageinfo("Enter email");
        handleMessage();
      } else {
        axios
          .post("https://65.2.31.39/erpdev/user-authenticate/sign-up", data)
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
      }
    };
    const map = (id) => {
      axios
        .get("https://65.2.31.39/erpdev/api/class/Get%20All%20Class")
        .then((response) => {
       
          setclass_id(response.data.responseBody.classId);
          setPrevdata(response.data.responseBody);
          setSchoolClass(response.data.responseBody.classNumber);
          handleShow4();
          reload();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    };

    const sendmap = () => {
      localStorage.getItem(classid);
        axios
          .post(
           "http://65.2.31.39:8080/erpdev/student?className="+classid+"&sectionname="+sectionid+"&studentId="+localStorage.getItem("user_id")
                  
                      )
          .then((response) => {
         
           
            reload();
            handleClose4();
            remove1();
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
        console.log("aas",response.data.responseBody);
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
      .get(`https://65.2.31.39/erpdev/user?eventType=Get_ALL_Users&page=0&roles=Student&size=25&sortBy=userId`)
      .then((response) => {
        
        setStudentdata(response.data.responseBody.content.sort((a,b)=>
        a.user.firstName.toLowerCase()> b.user.firstName.toLowerCase()?1:-1));
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
   
    
    
  }, []);

  const reload = () => {
    history.push('/students');
    history.push('/students');
  
  };
  const changePassword = () => {
    if (password !== confirmpassword) {
      setMessageinfo("Password Does not Match");
      handleMessage();
    } else if (password === "") {
      setMessageinfo("Enter Password");
      handleMessage();
    }
    else if (password.length < 8) {
      setMessageinfo("Password should be atleast 8 characters");
      handleMessage();
    } 
    
    
    else {
      axios
        .put(
          )
        .then((response) => {
         
          setPassword("");
          setConfirmpassword("");
          setMessageinfo("Password Changed");
          handleMessage();
          reload();
          remove1();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };

  const deleteData = () => {
   
    axios
      .delete(
        `https://65.2.31.39/erpdev/student/delete-student?studentId=`+localStorage.getItem("user_id")
      )
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
   
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
 
  const sendUpdated = () => {{
    axios
      .patch(
        `https://65.2.31.39/erpdev/student/update-student`,
        {
          first_name: fname,
          last_name: lname,
          middle_name: mname,
          email: email,
          mobileNumber: contact,
          address: address,
          gender: gender,
        }
      )
      .then((response) => {
      
        setPrevdata("");
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
  const search = () => {
    axios
      .get(``)
      .then((response) => {
       
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
  var count1 = 0;
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
             
               {/* 
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
                <div class="big-inbox">Students</div>
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
                  <AddIcon /> Add Student
                </button>
                <br/>
            

            <div class="message">
              <div class="add-student">
                 <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setFname(e.target.value)} label="First Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setLname(e.target.value)} label="Last Name" variant="filled" />
                                                
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                                </div>
                                                
                                            
                                            <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setEmail(e.target.value)} label="E-mail" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled"  />
                                               

                                            </div>
                                            <div class="col-6 billing-box">
                                                
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setfatherName(e.target.value)} label="Father Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="email" onChange={(e) => setmotherName(e.target.value)} label="Mother Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField autoFocus className="pb-3 Mui-focused" type="date" onChange={(e) => setadmissionDate(e.target.value)} label="Admission Date" variant="filled" />

                                            </div>
                                            <div class="col-6 billing-box">
                                            
                                            <TextField className="pb-3 bg-white" type="date" onChange={(e) => setdateOfBirth(e.target.value)} label="Date Of Birth" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setline1(e.target.value)} label="Line1" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setline2(e.target.value)} label="Line 2" variant="filled" />                                                
                                                
                                            </div>
                                            <div class="col-6 billing-box">
                                            
                                                
                                                <TextField className="pb-3" type="text" onChange={(e) => setcity(e.target.value)} label="City" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="TextField" onChange={(e) => setcountry(e.target.value)} label="Country" multiline rows={1} variant="filled" />

                                                

                                            </div>
                                            <div class="col-6 billing-box">
                                                
                                            <TextField className="pb-3 bg-white" type="text" onChange={(e) => setpinCode(e.target.value)} label="Pin Code" variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setstate(e.target.value)} label="State" variant="filled" />
                                                

                                            </div>
                                            {/* <div className="">
                                                <FormLabel component="legend">is Address Permanent</FormLabel>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" onChange={(e) => setisAddressPermanen(e.target.value)} value="male" />
                                                    <label class="form-check-label" for="inlineRadio1">True</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" onChange={(e) => setisAddressPermanen(e.target.value)} value="female" />
                                                    <label class="form-check-label" for="inlineRadio2">False</label>
                                                </div>
                                            </div> */}
                                            <div className="">
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" onChange={(e) => setGender(e.target.value)} value="male" />
                                                    <label class="form-check-label" for="inlineRadio3">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" onChange={(e) => setGender(e.target.value)} value="female" />
                                                    <label class="form-check-label" for="inlineRadio4">Female</label>
                                                </div>
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
                                <Modal show={show4} onHide={handleClose4}>
                  <Modal.Header closeButton>
                    <Modal.Title>Class Student Map</Modal.Title>
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
                                                    <InputLabel id="demo-simple-select-label">Seaction</InputLabel>
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
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose4}>
                      Close
                    </button>
                    <button onClick={sendmap} className="btn btn-primary">
                     Assign Class
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show6} onHide={handleClose6}>
                  <Modal.Header closeButton>
                    <Modal.Title>Student Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  
                      { console.log(data)}
                  <div className="col-xl-12">
                  <Stack direction="row" spacing={2}>
     
     <Avatar
       alt=""
       src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
       sx={{ width: 156, height: 156 }}
     />
     <div className="">
                          <h4 style={{ fontSize: "35px", color: "black" }}>
                          Sagar K
                          </h4>
                          <div className="">
                          <h4 style={{ fontSize: "25px", color: "#F0BB62" }}>
                          Sagar@ggmail.com
                          </h4>
                          </div>
                        </div>
                       
   </Stack>
                
                    <div className="row" style={{ margin:"0", marginTop: "20px" }}>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Admission Date:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                         11/04/2011
                          </h4>
                        </div>
                      </div>

                      

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Class :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            12
                          </h4>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Section:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            Section D
                          </h4>
                        </div>
                      </div>
                      {/* <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Gender:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62", textTransform:"capitalize" }}>
                            {""}
                          </h4>
                        </div>
                      </div> */}

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Father Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                          Ram k
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green",color: "green" }}>Mother Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62", color: "#F0BB62" }}>
                            Pre k
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Date Of Birth:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            12/02/1993
                          </h4>
                        </div>
                      </div>

                      {/* <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Cell No. :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            {student_data.contact}
                          </h4>
                        </div>
                      </div> */}

                      
                     

                      <div className="col-xl-8">
                        <div className="">
                          <h4 style={{ fontSize: "16px",color: "green" }}>Address:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            Dehradun
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Modal.Body>
                  
                </Modal>
                <Modal show={show5} onHide={handleClose5}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Students</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.first_name}
                          onChange={(e) => setFname(e.target.value)}
                          label="First Name"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={prevdata.last_name}
                          onChange={(e) => setLname(e.target.value)}
                          label="Last Name"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3 bg-white"
                          type="number"
                          defaultValue={prevdata.contact}
                          onChange={(e) => setContact(e.target.value)}
                          label="Contact No."
                          variant="filled"
                        />
                      </div>

                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.middle_name}
                          onChange={(e) => setMname(e.target.value)}
                          label="Middle Name"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="email"
                          defaultValue={prevdata.email}
                          onChange={(e) => setEmail(e.target.value)}
                          label="Email"
                          variant="filled"
                        />
                        <TextField
                          className="TextField"
                          defaultValue={prevdata.address}
                          onChange={(e) => setAddress(e.target.value)}
                          label="Address"
                          multiline
                          rows={1}
                          variant="filled"
                        />
                      </div>
                      {gender == "male" ? (
                        <div className="mt-2">
                          <FormLabel component="legend">Gender</FormLabel>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              checked
                              id="inlineRadio1"
                              onChange={(e) => setGender(e.target.value)}
                              value="male"
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Male
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              onChange={(e) => setGender(e.target.value)}
                              value="female"
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              Female
                            </label>
                          </div>
                         
                        </div>
                      ) : (
                        <div className="mt-2">
                          <FormLabel component="legend">Gender</FormLabel>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              onChange={(e) => setGender(e.target.value)}
                              value="male"
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Male
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              checked
                              id="inlineRadio2"
                              onChange={(e) => setGender(e.target.value)}
                              value="female"
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              Female
                            </label>
                          </div>
                          <div class="form-check form-check-inline" style={{float:'right'}}>
                          <button onClick={(e) => updateStudent(prevdata.registration_no)} className="btn btn-primary" >
                          Detail 
                        </button>
                          </div>
                        </div>
                      )}
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
                <Modal show={show3} onHide={remove1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row billing-main">
                      <div className="col-8 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          label="Password"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="password"
                          onChange={(e) => setConfirmpassword(e.target.value)}
                          label="Confirm Password"
                          variant="filled"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={remove1}>
                      Close
                    </button>
                    <button
                      onClick={changePassword}
                      className="btn btn-primary"
                    >
                      Change
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="row">
                <div className="col-6 text-left mt-1">
                  <TextField
                    className="pb-3 bg-white"
                    value={searchTerm}
                    type="text"
                    helperText="By Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    label="Search Student"
                  />
                  <button onClick={reset} className="btn btn-primary mt-3 ml-5">
                    Reset
                  </button>
                </div>
                <div className="col-6 text-right">
                  
                </div>
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                    <th class="border-top-0">#</th>
                    
                      <th class="border-top-0">Name</th>
                      <th class="border-top-0">Class</th>
                      <th class="border-top-0">Section</th>
                      
                    
                      
                      <th class="border-top-0">E-mail</th>
                      <th class="border-top-0">&ensp;Details&ensp;&ensp;&ensp;&ensp;Map&ensp;&ensp;&ensp;Update&ensp;&ensp; Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                 
                    
                    {studentdata  
                      .filter((val) => {
                        if (searchTerm == "") {
                          return val;
                        } else if (
                          `${val.user.firstName} ${val.user.lastName}`
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
                            {`${val.user.firstName} ${val.user.lastName}`}
                             
                            </td>
                            <td>
                            {val.classId}
                             
                            </td>
                             
                            <td>
                            {/* {val.sectionId} */}
                            Section A
                             
                            </td>
                           
                            
                            <td>
                            {val.user.email}
                             
                            </td>
                            
                            <td>
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                <Button variant="contained"color="secondary" onClick={() => handleClick6(val)}>
                                view
                                  
                                </Button>
                               
                                <Button
                                  className="student-btn-right"
                                  onClick={() => handleClick4(val.studentId)}
                                >
                                  <ClassIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-up"
                                  onClick={() => handleClick5(val.id)}
                                >
                                  <UpdateIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-del"
                                  onClick={() => handleClick(val.studentId)}
                                >
                                  <DeleteIcon className="text-white" />
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        );
                      })}
                      {!loading && <h4>Loading....</h4>}
     
                  </tbody>
                  <tbody>
                  
        {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
              <td>{`${count = 1 + count}`}</td>
              <td>{val.firstname}{" "}{val.lastname} </td>
              <td>{val.id}</td> 
              <td>Section D</td> 
             
              <td> {val.email}</td>
              <td>
                              <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                <Button variant="contained" color="secondary" onClick={() => handleClick6(val)}>
                                  
                                view
                                  
                                </Button>
                                <Button
                                  className="student-btn-right"
                                  onClick={() => handleClick4(val.studentId)}
                                >
                                  <ClassIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-up"
                                  onClick={() => handleClick5(val.id)}
                                >
                                  <UpdateIcon className="text-white" />
                                </Button>
                                <Button
                                  className="student-btn-del"
                                  onClick={() => handleClick(val.studentId)}
                                >
                                  <DeleteIcon className="text-white" />
                                </Button>
                              </ButtonGroup>
                            </td>
            </tr>
          ))}
      
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
