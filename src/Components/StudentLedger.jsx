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

const  StudentLedger = () => {
 var ZoomMtg

 ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib/', '/av');
 ZoomMtg.preLoadWasm();
 ZoomMtg.prepareJssdk();
var signatureEndpoint = 'http://localhost:3000'
var apiKey = 'npB7hc30Qzqd1eSVC3Tgdg'
var meetingNumber = '97127827640'
var role = 0
var leaveUrl = 'http://localhost:3000'
var userName = 'React'
var userEmail = ''
var passWord = ''
// pass in the registrant's token if your meeting or webinar requires registration. More info here:
// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
var registrantToken = ''
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
  const history = useHistory();
  const stu = localStorage.getItem("response_id");
  const [studentledger, setStudentledger] = useState([]);
  const [name, setName] = useState();
  const { studentid } = useParams();
  const [studentledgerdata, setStudentLedgerData] = useState("");
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
  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        console.log(response.data);
        setStudentLedgerData(response.data);

        // setName(`${response.data.first_name} ${response.data.middle_name} ${response.data.last_name}`);
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
        setStudentledger(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
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
                <div class="big-inbox print-capitalize">
                  {/* {`${studentledgerdata[0].name}'s `} Ledger */}
                  Ledger
                </div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            <div class="message">
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">Term</th>
                      <th class="border-top-0">Description</th>
                      <th class="border-top-0">Date</th>
                      <th class="border-top-0">Debit</th>
                      <th class="border-top-0">Credit</th>
                      <th class="border-top-0">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentledger.map((val, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <td>{val.term_name}</td>
                            <td class="txt-oflo">{val.description}</td>
                            <td>{val.date}</td>
                            {val.debcred == "C" ? (
                              <td></td>
                            ) : (
                              <td>{val.amount}</td>
                            )}
                            {val.debcred == "D" ? (
                              <td></td>
                            ) : (
                              <td>{val.amount}</td>
                            )}
                            <td>{val.balance}</td>
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
export default StudentLedger;

