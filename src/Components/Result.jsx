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
import Employeesidebar from "../Components/EmployeePortal/Employeesidebar";



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

const Result = () => {
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
  const [studentdata, setClassid] = useState([]);
  const [subjectname, setsubjectname] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setclassid] = useState("");
  const [sectionid, setSectionid] = useState("");
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
    classId: classid ,
  subjectName: subjectname
  }
  
    const sendData = () => {
     console.log(classid);
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
      .get(``)
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
    axios
      .get(``)
      .then((response) => {
        console.log(response);
        
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
          console.log(response);
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
                <Employeesidebar/>
                <div class="right-side" style={{ marginLeft: "17%" }}>
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Result</div>
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
                  <AddIcon /> Add Result
                </button>
                <br/>
            

            <div class="message">
              <div class="add-student">
                  
                                
                
                <Modal show={show2} onHide={remove}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        
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
                    helperText="By Batch"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    label="Search Result"
                  />
                  <button onClick={reset} className="btn btn-primary mt-3 ml-5">
                    Reset
                  </button>
                </div>
                <div className="col-6 text-right">
                  {/* <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={classid}
                      onChange={(e) => setClassid(e.target.value)}
                    >
                      {classdata.map((val, i) => {
                        return (
                          <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <button
                    onClick={search}
                    className="btn btn-primary mt-3 ml-1"
                  >
                    Search
                  </button> */}
                  {/* <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Section
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sectionid}
                      onChange={(e) => setSectionid(e.target.value.toString())}
                    >
                      {sectiondata.map((val, i) => {
                        return (
                          <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl> */}
                </div>
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                    <th class="border-top-0">Exam</th>
                    
                      <th class="border-top-0">Class</th>
                      <th class="border-top-0">Student</th>
                      <th class="border-top-0">Marks(%)</th>
                      <th class="border-top-0">Added By</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0">Action</th>
                                          
                    </tr>
                  </thead>
                  <tbody>
                    
                    
                    {/* {subjectdata
                      
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
                      
                      
                      .map((val, i) => { */}
                        {/* return ( */}
                          <tr key={i}>
                           
                            <td>
                            {`class 12 Exam 2021 `}
                             
                            </td>
                            <td>
                            {"class 12  2021"}
                             
                            </td>
                            <td>
                            {"RAM"}
                             
                            </td>
                            <td>
                            {"90.75%"}
                             
                            </td>
                             
                            <td>
                            {"Peter Parker"}
                             
                            </td>
                            <td>
                            {"Active"}
                             
                            </td>
                            
                            
                          </tr>
                        );
                      {/* }
                      )} */}
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
export default Result;
