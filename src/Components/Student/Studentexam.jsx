import React, { useState, useEffect } from "react";
import "../dashboard.css";
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
import Sidebar from "../../Components/Student/Sidebar";
import { Switch } from 'antd';
import { useFaker } from 'react-fakers'

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

const Exam = () => {
  const classes = useStyles();
  const { success, error, loading } = useFaker()
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
  const [Examdata, setExamdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [examname, setexamname] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [isresult, setisresult] = useState();
  // const [searchTerm, setSearchTerm] = useState('');
  const [admissionDate, setadmissionDate]=useState();
  const [date, setdate]=useState();
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
  
  const [email, setEmail] = useState();
  const [classId, setclassId] = useState();
  const [lname, setLname] = useState();
  const [mname, setMname] = useState();
  const [examName, setexamName] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [userdata, setUserdata] = useState([]);
  const [userdata1, setUserdata1] = useState([]);
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
    localStorage.setItem("exam_id", id);
    handleShow2();
  };
  const handleClick4 = (id) => {
    localStorage.setItem("user_id", id);
    handleShow4();
  };
  const handleClick5 = (cid,eid) => {
    localStorage.setItem("class_id", cid);
    localStorage.setItem("exam_id", eid);
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
    
        classId: classId,
        examDate: "01-01-2022",
        examName: examName
      
  }
  
    
    
    
  useEffect(() => {
    axios
      .get(`https://65.2.31.39/erpdev/result/get-student/`+localStorage.getItem("stid"))
      .then((response) => {
        console.log("result",response.data.responseBody);
        setUserdata1(response.data.responseBody);
        // setStudentdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
         
        }
      });
    axios
      .get(`https://65.2.31.39/erpdev/exam?page=0&size=25`)
      .then((response) => {
        console.log("hi", response.data.responseBody.getExamResponseList);
        setExamdata( response.data.responseBody.getExamResponseList);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
      
    
    
  }, []);

  const reset = () => {
    setClassid("");
    setSearchTerm("");
    setSectionid("");
  };
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  
  var count = 0;
  return (
    <>
      <div class="dashboard">
        <div class="left" >
          <div class="navigation">
            
              
              <Sidebar />
           
          </div>
        </div>
        <div class="right-side" style={{marginLeft: '5%'}}>
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Exam Section</div>
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
              <Modal show={show5} onHide={handleClose5}>
                    <Modal.Header closeButton>
                      <Modal.Title>Marksheet</Modal.Title>
                     
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <h2 className="text-center">
                          Exam Name 
                        </h2>
                      </div>
                    </div>
                    <table class="table no-wrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">Subject</th>
                      <th class="border-top-0">Marks</th>
                     
                    </tr>

                  </thead>
                   
                  {
                    userdata1 
                      
                    .map((val, i) => {
                      if (`${val.examId}`.includes(localStorage.getItem("examid"))) 
                        {
                          return (
                            <tr key={i++}>

                            <td>{val.marks[i].subjectName}</td>
                            <td>{val.marks[i].marksobtained}</td>
                            </tr>
                          );
                          } 
                        })}
                        {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
            
               
              <td>  Subject {val.id}</td>
              <td>5{val.id}</td>
              
              
            </tr>
          ))}
                         </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <button class="btn btn-secondary" onClick={handleClose5}>
                        Close
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
                    helperText="By Eam id"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    label="Search Exam"
                  />
                  <button onClick={reset} className="btn btn-primary mt-3 ml-5">
                    Reset
                  </button>
                </div>
                
              </div>
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                    <th class="border-top-0">#</th>
                    
                      
                      <th class="border-top-0">Exam Name</th>
                      
                      <th class="border-top-0">Exam status</th>
                      
                      <th class="border-top-0">Exam Date</th>
                      <th class="border-top-0">Check Result</th>
                      {/* <th class="border-top-0">createdAt</th>
                      <th class="border-top-0">updateAt</th> */}
                      
                    </tr>
                  </thead>
                  <tbody>
                    
                    
                    {Examdata
                      
                      .map((val, i) => {
                        if (`${val.classId}`.toLowerCase().includes("7275ec75-9dcc-4c6b-ad90-672e28436c0c".toLowerCase())) 
                        {
                        return (
                          <tr key={i}>
                            <td>{`${count = 1 + count}`}</td>
                           
                            <td>
                            {val.examName}
                             
                            </td>
                            <td>
                            {val.examstatus}
                             
                            </td>
                           
                           
                            <td>
                            {val.examDate}
                            </td> 
                            
                             
                            <td>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                
                                <Button
                                  className="student-btn-up"
                                   onClick={() => handleClick5(localStorage.setItem("examid",val.examId))}
                                >
                                  <UpdateIcon className="text-white" />
                                </Button>
                                
                              </ButtonGroup>
                            </td>
                            
                            
                          </tr>
                        );}
                      })}
                  </tbody>
                  <tbody>
                  
        {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
             
             
              <td>{val.id}</td> 
              
              <td> {val.firstname} Test </td>
              <td>Active</td>
              <td>2014-05-{val.id}</td> 
              <td>
                            <ButtonGroup
                                disableElevation
                                variant="contained"
                                color="primary"
                              >
                                
                                <Button
                                  className="student-btn-up"
                                   onClick={() => handleClick5(localStorage.setItem("examid",val.examId))}
                                >
                                  <UpdateIcon className="text-white" />
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
export default Exam;
