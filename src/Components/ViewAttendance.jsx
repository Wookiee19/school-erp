import React, { useState, useEffect } from "react";

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
import Sidebar from "../Components/Student/Sidebar";
import { Switch } from 'antd';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  const [AllData, setAllData] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [examname, setexamname] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [isresult, setisresult] = useState();
  // const [searchTerm, setSearchTerm] = useState('');
  const [admissionDate, setadmissionDate]=useState();
  const [date, setdate]=useState();
  const localizer = momentLocalizer(moment);
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
  
  const myEventsList =[
    {
      id: 0,
      title: "Present",
      start: new Date(2022, 1, 10),
      end: new Date(2022, 1, 10),
      type: "global"
    },
    {
      id: 1,
      title: "Present",
      start: new Date(2022, 1, 11),
      end: new Date(2022, 1, 11),
      type: "martian"
    },
    {
      id: 2,
      title: "Present",
      start: new Date(2022, 1, 14),
      end: new Date(2022, 1, 14),
      type: "regional"
    },
    {
      id: 3,
      title: "Present",
      start: new Date(2022, 1, 15),
      end: new Date(2022, 1, 15),
      type: "underground"
    },
    {
      id: 4,
      title: "Absent",
      start: new Date(2022, 1, 16),
      end: new Date(2022, 1, 16),
      type: "global"
    },
    {
      id: 5,
      title: "Leave",
      start: new Date(2022, 1, 17),
      end: new Date(2022, 1, 17),
      type: "regional"
    },
    {
      id: 0,
      title: "Present",
      start: new Date(2022, 1, 18),
      end: new Date(2022, 1, 18),
      type: "global"
    },
    {
      id: 1,
      title: "Present",
      start: new Date(2022, 1, 22),
      end: new Date(2022, 1, 22),
      type: "martian"
    },
    {
      id: 2,
      title: "Present",
      start: new Date(2022, 1, 21),
      end: new Date(2022, 1, 21),
      type: "regional"
    },
    {
      id: 3,
      title: "Present",
      start: new Date(2022, 1, 23),
      end: new Date(2022, 1, 23),
      type: "underground"
    },
    {
      id: 4,
      title: "Absent",
      start: new Date(2022, 1, 24),
      end: new Date(2022, 1, 24),
      type: "global"
    },
    {
      id: 5,
      title: "Leave",
      start: new Date(2022, 1, 25),
      end: new Date(2022, 1, 25),
      type: "regional"
    }
  ];
  
  
    
 
    
  useEffect(() => {
    axios
      .get(
        `https://65.2.31.39/erpdev/attend/get-attendance?studentId=`+localStorage.getItem("stid")
      )
      .then((response) => {
        console.log("a",response.data.responseBody);
        setAllData(response.data.responseBody);
        
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
                <div class="big-inbox">Attendance Section</div>
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
                  class="btn btn-primary btn-lg" style={{marginBottom: '10px'}}
                >
                  Apply For Leave
                </button>
              </div>
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
                        
                      />
                    </div>

                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="end date"
                        type="date"
                       
                        variant="filled"
                        
                      />
                    </div>
                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="name"
                        type="text"
                        label="Reason"
                        variant="filled"
                        
                      />
                    </div>
                   
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button  className="btn btn-primary">
                      Send
                    </button>
                  </Modal.Footer>
                </Modal>
              <div class="table-responsive">
                <table class="table no-wrap">
                {AllData
            .map((val, i) => {
              console.log(val.isStudentPresent)
              if(`${val.isStudentPresent}`.toLowerCase().includes("true".toLowerCase()))
                        {
                          myEventsList.push({
                            start:val.dateAttended ,
                             end: val.dateAttended , 
                             title: "Present" })
                        }
                        else
                        {
                          myEventsList.push({
                            start:val.dateAttended ,
                             end: val.dateAttended , 
                             title: "Absent" })
                        }
             
                      })}     

                  {console.table("2ns",myEventsList)}
                     <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    defaultDate={new Date()}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    style={{ height: 500 }}
                  />
       
                 
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
