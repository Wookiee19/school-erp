import { React, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useState } from 'react';
import axios from 'axios'
import { Modal } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AdmissionCharges = () => {
    const classes = useStyles();
    const school_id = localStorage.getItem("school_id");
    const [chargesadmission, setChargesadmission] = useState();
    const [admissiondata, setAdmissiondata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [prevdata, setPrevdata] = useState('');
    const history = useHistory();
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage = () => {
        setMessage({ open: true, vertical: 'top', horizontal: 'right' });
    };
    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    useEffect(() => {
        axios.get(``)
            .then(response => {
                console.log(response.data)
                setAdmissiondata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    const reload = () => {
        axios.get(``)
            .then(response => {
                console.log(response.data)
                setAdmissiondata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }
    const sendAdmission = () => {
        if (chargesadmission < 0) {
            setMessageinfo("Charges can't be Negative");
            handleMessage();
        }
        else {
            axios.post(``,
                {

                    school_id: school_id,
                    charges: chargesadmission

                })
                .then(response => {
                    console.log(response)
                    setChargesadmission();
                    reload();
                    handleClose();
                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }

    };
    const update = (id) => {
        axios.get(``)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data);
                setChargesadmission(response.data.charges)
                handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const sendUpdated = () => {
        if (chargesadmission < 0) {
            setMessageinfo("Charges can't be Negative");
            handleMessage();
        }
        else {
            axios.put(``, {
                charges: chargesadmission,
                school_id: school_id
            })
                .then(response => {
                    console.log(response.data)
                    setPrevdata('');
                    setChargesadmission();
                    reload();
                    handleClose1();
                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }
    }
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }
    const deleteCharges = (id) => {
        axios.delete(``)
            .then(response => {
                console.log(response)
                handleClose2();
                localStorage.removeItem("user_id")
                reload();

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                
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
             
              <Link class="nav-link" to="/adminledger">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Student Ledger</div>
                </div>
              </Link>
           

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Admission Charges
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                     
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                <img alt="Logo" src={"https://i.ibb.co/cJss6VH/Capture1.png"} 
                                 height="700px" width="800px" 
                                />
                                </table>

                            </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
    );

};
export default AdmissionCharges;