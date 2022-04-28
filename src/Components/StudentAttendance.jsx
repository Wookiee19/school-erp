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
import Employeesidebar from "../Components/EmployeePortal/Employeesidebar";
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
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { Dropdown, Option } from "./Dropdown";
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

const StudentAttendance = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow4 = () => setShow4(true);
  const [studentdata, setStudentdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [Class1id, setClass1id] = useState("");
  const [section1id, setSection1id] = useState("");
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
  var today = new Date();
  var dd = today.getDate();
  const handleSelect = (e) => {
      
    setSectiondata(e.target.value);
  };
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  
  if(mm<10) 
  {
      mm='0'+mm;
  } 
  today = dd+'-'+mm+'-'+yyyy;
  const { success, error, loading } = useFaker()
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
    localStorage.setItem("user_id", id);
    handleShow2();
  };
  const handleClick1 = (id,id1,id2) => {
 
    localStorage.setItem("stid", id);
     localStorage.setItem("cid", id1);
     localStorage.setItem("sid", id2);
    handleShow2();
    sendData1(id,id1,id2);
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
  
  
  
    const x=[1];
   
   
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
  
  
  }, []);
 
  
  

const sendData1 = (id,id1,id2) => {
  const data = {
   
    attendanceDate:today,
    classId: id1,
    isStudentPresent: true,
    markerTeacherId: localStorage.getItem("Tid"),
    sectionName: id2,
    students: [
      id,
    ]
  
};
  console.log(data);
  axios
    .post("https://65.2.31.39/erpdev/attend/mark-attendance",data)
    .then((response) => {
      console.log(sectiondata);
        console.log(response.data.responseBody.content);
      
      
      // console.log(studentdata);
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    });


};

const sendData = (e) => {
 
  axios
    .get("https://65.2.31.39/erpdev/api/class/get-students?classNumber="+classid+"&page=0&sectionName="+sectionid+"&size=25")
    .then((response) => {
      console.log(sectiondata);
        console.log(response.data.responseBody.content);
      setStudentdata(response.data.responseBody.content);
      
      // console.log(studentdata);
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    });


};


  
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
 
  var count = 0;
  return (
    <>
     <div class="dashboard">
                <Employeesidebar/>
                <div class="right-side">
          <div class="right-header"style={{ marginLeft: "18%" }}>
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Students Attendance</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div className="row">
                <div className="col-6 text-left mt-1"style={{ marginLeft: "17%" }}>
                      <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setClassid(e.target.value)}
                                                    >
                                                      
                                                        {classdata.map((val, i) => {
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
                                                        {classdata.map((val, i) => {
                                                          if(val.classNumber==classid)
                                                            return (
                                                                <MenuItem value={val.section}>{`${val.section}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                     
      <button  onClick={sendData} className="btn btn-primary" style={{ marginTop: "3%" }}>
                     Submit
                    </button>
        </div>
        </div>    
          <div class="right-body">
         
          

            <div class="message" >
              
              <div class="table-responsive" >
                <table class="table no-wrap">
                  <thead >
                    <tr>
                    <th class="border-top-0"></th>
                    <th class="border-top-0"></th>
                    <th class="border-top-0"></th>
                    <th class="border-top-0">#</th>
                    <th class="border-top-0">Name</th>
                      <th class="border-top-0">Attendance</th>
                     </tr>
                  </thead>
                  <tbody>
                  
                    {studentdata
                      // .filter((val) => {
                        
                      //   if (searchTerm == "") {
                      //     return val;
                      //   } else if (
                      //     val.section_id.toString().includes(searchTerm)
                      //   ) {
                      //     return val;
                      //   } else if (
                      //     val.studentId.toLowerCase().includes(
                      //       searchTerm.toLowerCase()
                      //     )
                      //   ) {
                      //     return val;
                      //   } else if (
                      //     `${val.fname} ${val.lname}`
                      //       .toLowerCase()
                      //       .includes(searchTerm.toLowerCase())
                      //   ) {
                      //     return val;
                      //   }
                      // })
                      
                      // .filter((val) => {
                      //   if (sectionid == "") {
                          
                      //     return val;
                      //   } else if (
                      //     val.section_id.toString().includes(sectionid)
                      //   ) {
                      //     return val;
                      //   }
                      // })
                    
                      .map((val, i) => {
                        return (
                          
                          
                          <tr key={i}>
                             <td></td>
                             <td></td> 
                             <td></td> 
                            <td>{`${count = 1 + count}`}</td>
                            <td>
                            {`${val.user.firstName} ${val.user.lastName}`}
                            
                            </td>
                            
                            
                            <td>
                            <Switch onChange={()=>handleClick1(val.studentId,val.classId,val.sectionId)} checkedChildren="PRESENT" unCheckedChildren="ABSENT" defaultunChecked />

                               
                               
                              
                            </td>
                          </tr>
                        );
                      })
                      }
                  </tbody>
                  <tbody >
                  {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
              <td></td>
              <td></td>
              <td></td> 
              <td>{`${count = 1 + count}`}</td>
              <td>{val.firstname}{" "}{val.lastname} </td>
              
              <td>
                            <Switch  checkedChildren="PRESENT" unCheckedChildren="ABSENT" defaultunChecked />

                               
                               
                              
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
export default StudentAttendance;
