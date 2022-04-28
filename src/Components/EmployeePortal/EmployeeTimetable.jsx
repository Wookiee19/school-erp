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
import ClassIcon from "@mui/icons-material/Class";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, Option } from "../Dropdown";
import { Switch } from "antd";
import Employeesidebar from "../EmployeePortal/Employeesidebar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import Paper from "@material-ui/core/Paper";
// import { ViewState } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   WeekView,
//   Appointments
// } from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { appointments } from "./data";
const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

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




const EmployeetimeTable = () => {

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
  const [classdata, setClassdata] = useState([]);
  const [examname, setexamname] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classid, setClassid] = useState("");
  const [sectionid, setSectionid] = useState("");
  const [isresult, setisresult] = useState();
  // const [searchTerm, setSearchTerm] = useState('');
  const [admissionDate, setadmissionDate] = useState();
  const [date, setdate] = useState();
  const [fatherName, setfatherName] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [motherName, setmotherName] = useState();
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [line1, setline1] = useState();
  const [subjectData, setsubjectData] = useState([]);
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
  const [subjectname, setsubjectname] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prevdata, setPrevdata] = useState("");
  var mydata = [];
  const [sections, setSections] = useState([]);
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
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClick = (id) => {
    localStorage.setItem("exam_id", id);
    handleShow2();
  };
  const handleClick4 = (id,id1) => {
    localStorage.setItem("c_id", id1);
    localStorage.setItem("e_id", id);
    handleShow4();
  };
  const handleClick5 = (eid, cid) => {
    localStorage.setItem("class_id", cid);
    localStorage.setItem("exam_id", eid);
    {
      console.log("exam", localStorage.getItem("exam_id"));
    }
    {
      console.log("class", localStorage.getItem("class_id"));
    }
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
 

  const localizer = momentLocalizer(moment)
    
   

  return (
    <>
      <div class="dashboard">
        <Employeesidebar />
        <div class="right-side" style={{ marginLeft: "17%" }}>
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Time Table</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {/* back to dashboard option*/}

          
            <br />

            <div class="message">
           
              {/* <div class="table-responsive">
              <MuiThemeProvider theme={theme}>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState currentDate="2018-06-28" />
          <WeekView startDayHour={9} endDayHour={16} />
          <Appointments />
        </Scheduler>
      </Paper>
    </MuiThemeProvider>
              </div> */}
             




  <div>
    <Calendar
      localizer={localizer}
      events={appointments}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeetimeTable;
