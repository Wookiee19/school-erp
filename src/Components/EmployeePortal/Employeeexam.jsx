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

const Employeeexam = () => {
  const { success, error, loading } = useFaker()
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
    classId: class_id,
    examDate: "02-05-2022",
    examName: examName,
  };

  const sendData = () => {
    if (classId === "") {
      setMessageinfo("Enter classid");
      handleMessage();
    } else {
      axios
        .post("https://65.2.31.39/erpdev/exam/add-exam", data)
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
  
  const sendResult = () => {
    const marks = subjectData.map((subject) => {
      if (subject.marks) {
        return {
          marksobtained: subject.marks,
          subjectId: subject.subjectId
           
        }
      }
      return null;
    }).filter((mark) => mark);

    const data1 = {   
      classId: localStorage.getItem("c_id"),
      examId: localStorage.getItem("e_id"),
      marks,
      studentId: "0a212cc2-34d0-4a28-bcb9-67a6ce13d394",
      totalMarks: "50"
    };
    console.log("data1",data1)
      axios
        .post("https://65.2.31.39/erpdev/result/add-result", data1)
        .then((response) => {
          handleClose4();
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
      .get(`https://65.2.31.39/erpdev/exam?page=0&size=25`)
      .then((response) => {
        console.log("hi", response.data.responseBody.getExamResponseList);
        setExamdata(response.data.responseBody.getExamResponseList);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `https://65.2.31.39/erpdev/subject/linked-subject/12/Section_D`
      )
      .then((response) => {
        console.log("subjectdata",response.data.responseBody);
        setsubjectData(response.data.responseBody);
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
        // console.log(response);
        setUserdata(response.data);
        // setStudentdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }, []);

  const reload = () => {
    axios
      .get(``)
      .then((response) => {
        // console.log(response);
        setStudentdata(response.data);
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

  const deleteData = () => {
    // console.log(localStorage.getItem("user_id"))
    axios
      .delete(
        `https://65.2.31.39/erpdev/exam/` + localStorage.getItem("exam_id")
      )
      .then((response) => {
        // console.log(response);
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

  const sendUpdated = () => {
    {
      axios
        .patch(`https://65.2.31.39/erpdev/exam/edit-exam`, {
          classId: localStorage.getItem("exam_id"),
          examDate: "01-01-2022",
          examId: localStorage.getItem("class_id"),
          examName: examname,
          examResultPublished: isresult,
        })
        .then((response) => {
          console.log(response);
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
  const active = (id) => {
    console.log(id);
    axios
      .patch(`https://65.2.31.39/erpdev/exam/disable-exam/` + id)
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
  function updateStudent(id) {
    localStorage.setItem("reg_no", id);
    history.push("/studentparticular");
  }

  const setSubjectMarks = (index, marks) => {
    const _subjectData = [...subjectData];
    _subjectData[index].marks = marks;
    setsubjectData(_subjectData);
  };
  var count = 0;
  return (
    <>
      <div class="dashboard">
        <Employeesidebar />
        <div class="right-side" style={{ marginLeft: "17%" }}>
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

            {/* <button
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
              <AddIcon /> Create New Exam
            </button> */}
            <br />

            <div class="message">
              <div class="add-student">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Exam</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="date"
                          placeholder="mm-dd-yyyy"
                          onChange={(e) => setdate(e.target.value)}
                          label=""
                          variant="filled"
                        />
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          onChange={(e) => setexamName(e.target.value)}
                          label="examName"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          onChange={(e) => setclass_id(e.target.value)}
                          label="class id"
                          variant="filled"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Create
                    </button>
                  </Modal.Footer>
                </Modal>

                <Modal show={show4} onHide={handleClose4}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Result</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        {subjectData.map((val, i) => {
                          return (
                            <TextField
                              className="pb-3 bg-white"
                              type="text"
                              onChange={(e) =>
                                setSubjectMarks(i, e.target.value)
                              }
                              label={val.subjectName}
                              value={val.marks}
                              variant="filled"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose4}>
                      Close
                    </button>
                    <button onClick={sendResult} className="btn btn-primary">
                      Create
                    </button>
                  </Modal.Footer>
                </Modal>

                <Modal show={show5} onHide={handleClose5}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Exam</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.first_name}
                          onChange={(e) => setexamname(e.target.value)}
                          label="Exam name"
                          variant="filled"
                        />
                      </div>

                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="date"
                          defaultValue={prevdata.contact}
                          onChange={(e) => setdate(e.target.value)}
                          label=""
                          variant="filled"
                        />
                      </div>

                      <div className="mt-2">
                        <FormLabel component="legend">
                          Exam Result Published
                        </FormLabel>
                        <div class="form-check form-check-inline">
                          &ensp;
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            checked
                            id="inlineRadio1"
                            onChange={(e) => setisresult(e.target.value)}
                            value="True"
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            True
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            onChange={(e) => setisresult(e.target.value)}
                            value="False"
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            False
                          </label>
                        </div>
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
              {/* <div className="row">
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
                
              </div> */}
              <div class="table-responsive">
                <table class="table no-wrap">
                  <thead>
                    <tr>
                      <th class="border-top-0">#</th>

                      <th class="border-top-0">Calss</th>
                      <th class="border-top-0">Section</th>
                      <th class="border-top-0">Exam Name</th>

                      
                      <th class="border-top-0">Change Status</th>
                      <th class="border-top-0">Exam Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {Examdata.filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (
                        `${val.examId}`
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((val, i) => {
                      return (
                        <tr key={i}>
                          <td>{`${(count = 1 + count)}`}</td>
                          <td>{val.classNumber}</td>
                          <td>{val.sectionName}</td>
                          <td>{val.examName}</td>
                          
                          <td width="15%">
                            {val.examstatus == "Active" ? (
                              <Switch
                                onChange={() => active(val.examId)}
                                checkedChildren="ACTIVE"
                                unCheckedChildren="NOT ACTIVE"
                                defaultChecked
                              />
                            ) : (
                              <Switch
                                onChange={() => active(val.examId)}
                                checkedChildren="ACTIVE"
                                unCheckedChildren="NOT ACTIVE"
                                default
                              />
                            )}
                          </td>
                          <td>{val.examDate}</td>
                          

                          <td>
                            <ButtonGroup
                              disableElevation
                              variant="contained"
                              color="primary"
                            >
                              <Button
                                className="student-btn-up"
                                onClick={() =>
                                  handleClick5(val.examId, val.classId)
                                }
                              >
                                <UpdateIcon className="text-white" />
                              </Button>

                              <Button
                                className="student-btn-del"
                                onClick={() => handleClick(val.examId)}
                              >
                                <DeleteIcon className="text-white" />
                              </Button>
                              {val.examstatus == "Active" ? (
                                <Button
                                  className="student-btn-up"
                                  onClick={() =>
                                    handleClick4(val.examId, val.classId)
                                  }
                                >
                                  <BorderColorIcon className="text-white" />
                                </Button>
                              ) : null}
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody>
                  
        {loading &&
          success.map((val, id) => (
            <tr key={val.uuid}>
              <td>{`${count = 1 + count}`}</td>
             
              <td>{val.id}</td> 
              <td>Section_D</td> 
              <td> {val.firstname} Test </td>
              <td>
              <Switch  checkedChildren="ACTIVE" unCheckedChildren="NOT ACTIVE" defaultChecked />
              </td>
              <td>2014-05-{val.id}</td> 
              <td>
                            <ButtonGroup
                              disableElevation
                              variant="contained"
                              color="primary"
                            >
                              <Button
                                className="student-btn-up"
                               
                              >
                                <UpdateIcon className="text-white" />
                              </Button>

                              <Button
                                className="student-btn-del"
                                
                              >
                                <DeleteIcon className="text-white" />
                              </Button>
                              
                                <Button
                                  className="student-btn-up"
                                  
                                >
                                  <BorderColorIcon className="text-white" />
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
export default Employeeexam;
