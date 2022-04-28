import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Modal } from 'react-bootstrap';
import FormLabel from '@material-ui/core/FormLabel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Amplify, { Auth } from "aws-amplify";
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { useFaker } from 'react-fakers'

const Finance = () => {
    const { success, error, loading } = useFaker()
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
    const [employeedata, setEmployedata] = useState([]);
    const [sortemployeedata, setsortEmployedata] = useState([]);
    const [whatsappNumber, setwhatsappNumber] = useState([]);
    const [qualification, setqualification] = useState([]);
    const [fatherName, setfatherName] = useState([]);
    const [joiningDate, setjoiningDate] = useState([]);
    const [motherName, setmotherName] = useState([]);
    const [admissionDate, setadmissionDate] = useState([]);
    const [designation, setdesignation] = useState([]);
    const [dateOfBirth, setdateOfBirth] = useState([]);
    
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const [email, setlemail] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [Contact, setContact] = useState('');
    var [userdata1, setUserdata1] = useState([]);
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [classTeacher, setClassTeacher] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const school_id = localStorage.getItem("school_id")
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show6, setShow6] = useState(false);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);
    const changeClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow3();
    }
    const remove1 = () => {
        localStorage.removeItem("user_id")

        handleClose3();
    }
    const handleClick6 = (data) => {
    
        setUserdata1=data;
       
        handleShow6();
        
      };
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        console.log("user",localStorage.getItem(id))
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }
    
    useEffect(() => {
        axios.get(`https://65.2.31.39/erpdev/user?eventType=Get_ALL_Users&page=0&roles=Teacher&size=25&sortBy=userId`)
            .then(response => {
                
                
                setEmployedata(response.data.responseBody.content.sort((a,b)=>
                a.user.firstName.toLowerCase()> b.user.firstName.toLowerCase()?1:-1));
            
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])

 
        const reload = () => {
            history.push('/employee');
            history.push('/employee');
          
          };
 
    const changePassword = () => {
        if (password !== confirmpassword){
            setMessageinfo("Password Does not Match")
            handleMessage();
        }
        else if (password === ''){
            setMessageinfo("Enter Password")
            handleMessage();
        } 
        else if (password.length < 8) {
            setMessageinfo("Password should be atleast 8 characters");
            handleMessage();
          } 
        else{
            axios.put('')
                .then(response => {
                    console.log(response)
                    setPassword('')
                    setConfirmpassword('')
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
                })
        }

    }

   
        

  
    
    const deleteData = () => {
        console.log("user1",localStorage.getItem("user_id"))
        axios.delete("https://localhost:8080/erpdev/teacher/delete-teacher?teacherId="+localStorage.getItem("user_id"))
            .then(response => {
                console.log(response)
                reload();
                remove();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const data = {
        "classTeacher": classTeacher,
  "dateOfBirth": dateOfBirth,
  "designation": designation,
  "email": email,
  "fatherName": fatherName,
  "firstName": fname,
  "gender": gender,
  "imageUrl": "..//image.html",
  "joiningDate": "22-01-2022 08:55",
  "lastname": lname,
  "mobileNumber": Contact,
  "motherName": motherName,
  "password": password,
  "qualification": qualification,
  "roles": "Teacher",
  "whatsappNumber": whatsappNumber
      
    //     classTeacher: classTeacher,
    //     dateOfBirth: dateOfBirth,
    //     designation: designation,
    //     email: email,
    //     fatherName: fatherName,
    //     firstName: fname,
    //     gender: "male",
    //     imageUrl: "..//image.html",
    //     joiningDate: joiningDate,
    //     lastname: lname,
    //     mobileNumber: Contact,
    //     motherName: motherName,
    //    password: password,
    //     qualification: qualification,
    //    roles: "Teacher",
    //    whatsappNumber: whatsappNumber
              
    };
    const sendData = () => {
        if (password != confirmpassword) {
            setMessageinfo("Password Does not Match");
            handleMessage();
        }
        
        else {
            console.log("first",data)
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.post('https://65.2.31.39/erpdev/user-authenticate/sign-up', data)
                    .then(response => {
                        console.log(response);
                        console.log(response.data.id);
                        setfname();
                        setlname();
                        setContact();
                        setAddress();
                        setlemail();
                        setGender();
                        setPassword();
                        handleClose();
                        reload();
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else {
                setMessageinfo("Enter Valid Email")
                handleMessage();
            }

        }
    }
    const update = (id) => {
        axios.get(``)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data);
                setAddress(response.data.address)
                setfname(response.data.first_name)
                setlname(response.data.last_name)
                setContact(response.data.contact)
                setlemail(response.data.email)
                setGender(response.data.gender)
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
        if (fname == '') {
            setMessageinfo("Enter First Name")
            handleMessage();
        }
        else if (lname == '') {
            setMessageinfo("Enter Last Name")
            handleMessage();
        }
         else {
            
                axios.post(``, {
                    
                    fistname: fname,
                    lastname: lname,
                       
                

                })
                    .then(response => {
                        console.log(response);
                        setPrevdata('');
                        setfname('');
                        setlname('');
                        setContact('');
                        setAddress('');
                        setlemail('');
                        setGender('');
                        setPassword('');
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
    const logOut = () => {
        localStorage.clear();
        history.push("/")
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
              {/* <Link class="nav-link" to="/adminresult">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Calendar</div>
                </div>
              </Link> */}
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
                                <div class="big-inbox">
                                     Employee
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                      

                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add Employee</button>
                            </div>
                            <Modal size="lg" show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Employee</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setfname(e.target.value)} label="First Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setlname(e.target.value)} label="Last Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                                </div>
                                                
                                           
                                            <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setlemail(e.target.value)} label="E-mail" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled" />

                                            </div>
                                            <div class="col-6 billing-box">
                                                
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setfatherName(e.target.value)} label="Father Name" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="email" onChange={(e) => setmotherName(e.target.value)} label="MotherName" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setwhatsappNumber(e.target.value)} label="Whatsapp Number" variant="filled" />
                                                </div>
                                               

                                           
                                            <div class="col-6 billing-box">
                                            
                                                <TextField className="pb-3 bg-white" type="date" onChange={(e) => setjoiningDate(e.target.value)} label="Joining Date" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="date" onChange={(e) => setadmissionDate(e.target.value)} label="AdmissionDate" variant="filled" />
                                                </div>
                                                <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setqualification(e.target.value)} label="Qualificatio" variant="filled" />
                                                
                                                
                                            </div>
                                            <div class="col-6 billing-box">
                                            
                                                
                                                <TextField className="pb-3" type="text" onChange={(e) => setdesignation(e.target.value)} label="Designation" variant="filled" />
                                                
                                                

                                            </div>
                                            <div class="col-6 billing-box">
                                                
                                            <TextField className="pb-3 bg-white" type="date" onChange={(e) => setdateOfBirth(e.target.value)} label="Date Of Birth" variant="filled" />
                                               
                                                

                                            </div>
                                            <div className="">
                                                <FormLabel component="legend">Class Teacher</FormLabel>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" onChange={(e) => setClassTeacher(e.target.value)} value="true" />
                                                    <label class="form-check-label" for="inlineRadio1">True</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" onChange={(e) => setClassTeacher(e.target.value)} value="false" />
                                                    <label class="form-check-label" for="inlineRadio2">False</label>
                                                </div>
                                            </div>
                                            <div className="">
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" onChange={(e) => setGender(e.target.value)} value="Male" />
                                                    <label class="form-check-label" for="inlineRadio3">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" onChange={(e) => setGender(e.target.value)} value="Female" />
                                                    <label class="form-check-label" for="inlineRadio4">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={handleClose}>
                                        Close
                                            </button>
                                    <button onClick={sendData} className="btn btn-primary">Create</button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={show6} onHide={handleClose6}>
                  <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
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
   </Stack>
                
                    <div className="row" style={{ margin:"0", marginTop: "20px" }}>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>E-mail:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                          Sagar K
                          </h4>
                        </div>
                      </div>

                      

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Qualification :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            Masters
                          </h4>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Designation:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            Teacher
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
                          <h4 style={{ fontSize: "20px",color: "green" }}>Father Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                          Ram k
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green",color: "green" }}>Mother Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62", color: "#F0BB62" }}>
                            Pre k
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Date Of Birth:</h4>
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
                          <h4 style={{ fontSize: "20px",color: "green" }}>Address:</h4>
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
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update  Employee</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.first_name} onChange={(e) => setfname(e.target.value)} label="First Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.contact} onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled" />
                                            <TextField className="TextField" defaultValue={prevdata.address} onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />

                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="text" defaultValue={prevdata.last_name} onChange={(e) => setlname(e.target.value)} label="Last Name" variant="filled" />
                                            <TextField className="pb-3" type="email" defaultValue={prevdata.email} onChange={(e) => setlemail(e.target.value)} label="Email" variant="filled" />

                                        </div>
                                        {
                                            gender == "male" ?
                                                <div className="mt-2">
                                                    <FormLabel component="legend">Gender</FormLabel>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio1" onChange={(e) => setGender(e.target.value)} value="male" />
                                                        <label class="form-check-label" for="inlineRadio1">Male</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onChange={(e) => setGender(e.target.value)} value="female" />
                                                        <label class="form-check-label" for="inlineRadio2">Female</label>
                                                    </div>
                                                </div>
                                                :
                                                <div className="mt-2">
                                                    <FormLabel component="legend">Gender</FormLabel>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onChange={(e) => setGender(e.target.value)} value="male" />
                                                        <label class="form-check-label" for="inlineRadio1">Male</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio2" onChange={(e) => setGender(e.target.value)} value="female" />
                                                        <label class="form-check-label" for="inlineRadio2">Female</label>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={handleClose1}>
                                        Close
                                            </button>
                                    <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={show2} onHide={remove}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 className="text-center">Are You Sure You Want To Delete?</h2>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={remove}>
                                        Close
                                            </button>
                                    <button onClick={deleteData} className="btn btn-primary">Yes</button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={show3} onHide={remove1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Change Password</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row billing-main">
                                        <div className="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                            <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />

                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={remove1}>
                                        Close
                                            </button>
                                    <button onClick={changePassword} className="btn btn-primary">Change</button>
                                </Modal.Footer>
                            </Modal>
                            
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            {/* <th class="border-top-0">Gender</th> */}
                                            <th class="border-top-0">Phone</th>
                                            <th class="border-top-0">E-mail</th>
                                            <th class="border-top-0">Date Of Birth</th>
                                            <th class="border-top-0">&ensp;Details&ensp;&ensp;&ensp;&ensp;Update&ensp;&ensp; Delete</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {employeedata.map((val, i) => {
                                            return (
                                                <>

                                                    {
                                                        
                                                            <tr key={i}>
                                                                <td>{`${count = 1 + count}`}</td>
                                                                <td class="txt-oflo print-capitalize">{`${val.user.firstName} ${val.user.lastName}`}</td>
                                                                {/* <td className="print-capitalize">{val.user.gender}</td> */}
                                                                <td>{val.mobileNumber}</td>
                                                                <td class="txt-oflo">{val.user.email}</td>
                                                                <td class="txt-oflo">{val.user.dateOfBirth}</td>
                                                                
                                                                
                                                                <td>
                                                                    <ButtonGroup disableElevation variant="contained" color="primary">
                                                                        {/* <Button className="student-btn-up" onClick={() => handleShow1(val.id)}  ><UpdateIcon className="text-white" /></Button> */}
                                                                        <Button className="student-btn-del" onClick={() => handleClick(val.teacherId)} ><DeleteIcon className="text-white" /></Button>
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                            
                                                    }
                                                </>
                                            )
                                        })}



                                    </tbody>
                                    <tbody>
                  
        {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
              <td>{`${count = 1 + count}`}</td>
              <td>{val.firstname}{" "}{val.lastname} </td>
              
              <td>9{val.id}9{val.id}9{val.id}999{val.id}</td> 
              <td> {val.email}</td>
              <td>2014-05-1{val.id}</td> 
              <td>
                     <ButtonGroup disableElevation variant="contained" color="primary">
                     <Button variant="contained"color="secondary" onClick={() => handleClick6(val)}>
                                view
                                  
                                </Button>
                         <Button className="student-btn-up" onClick={() => handleShow1(val.id)}  ><UpdateIcon className="text-white" /></Button>
                         <Button className="student-btn-del" onClick={() => handleClick(val.teacherId)} ><DeleteIcon className="text-white" /></Button>
                     </ButtonGroup>
                 </td>
            </tr>
          ))}
      
                  </tbody>
                                </table>
                            </div>
                        </div>
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
        </>
    );

};
export default Finance;