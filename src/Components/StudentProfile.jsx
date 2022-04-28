import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";

import Sidebar from "../Components/Student/Sidebar";
import { padding } from "@mui/system";


const StudentProfile = () => {
  const [src , setSRC]= useState("")
 
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  const [messageinfo, setMessageinfo] = useState("");
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
   const handleMessage = () => {
    setMessage({ open: true, vertical: "top", horizontal: "right" });
  };

  const [profile_pic, setProfilePic] = useState("");
  const [student_data, setStudentData] = useState("");
  const { studentid } = useParams();
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
  
  const [email, setEmail] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [mname, setMname] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  useEffect(() => {
    // axios
    //   .get(``)
    //   .then((response) => {
    //     localStorage.setItem("profile pic of student", response.config.url);
    //     setProfilePic(response.config.url);
    //     console.log("pro", profile_pic);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       // alert(error.response.data.message)
    //     }
    //   });
    console.log("email",localStorage.getItem("email"));
    axios.get(`https://65.2.31.39/erpdev/student/search?searchString=`+localStorage.getItem("email"))
      .then((response) => {
        console.log(response.data.responseBody);
        setStudentData(response.data.responseBody);
        setFname(response.data.responseBody.user.firstName)
        setLname(response.data.responseBody.user.lastName)
        setEmail(response.data.responseBody.user.email)
        setfatherName(response.data.responseBody.fatherName)
        setMname(response.data.responseBody.motherName)
        setdateOfBirth(response.data.responseBody.user.dateOfBirth)
        setcity(response.data.responseBody.user.permanentaddress.city)
        localStorage.setItem("stid",response.data.responseBody.studentId)
        console.log(localStorage.getItem("stid"));
        setProfilePic("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg");

            
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    });
     
  }, []);

 

  return (
    <>
      <div class="dashboard">
        <div class="left" >
          <div class="navigation">
            
              
              <Sidebar />
           
          </div>
        </div>
        <div class="right-side" style={{marginLeft: '4%'}}>
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox" >Student Profile</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div className="right-body" >
            <div className="row" >
              <div className="col-xl-12" >
                <div
                  className="background"
                  style={{
                    backgroundColor: "#fff",
                    margin: "auto",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="col-xl-2"
                    style={{ display: "flex", justifyContent: "center",marginLeft: '-2%' }}
                  >
                    <img src={profile_pic} height="100px" width="100px" />
                  </div>
                  <div className="col-xl-8" style={{ marginLeft: '-4%' }}>
                    <div className="">
                      <h2 style={{ fontSize: "40px",color: "green" }}>
                        {fname}{" "}{lname}
                      </h2>
                    </div>
                    <div className="">
                      <h6 style={{ display: "flex", marginLeft: '5%' }}>{email}</h6>
                    </div>
                  </div>
                  <div className="col-xl-2">
                  <img src={src} />
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div
                  className="background"
                  style={{
                    backgroundColor: "#fff",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    height: "auto",
                  }}
                >
                  <div className="col-xl-12">
                    <div className="col-xl-12">
                      <h2>Personal Information</h2>
                    </div>
                    <div className="row" style={{ margin:"0", marginTop: "20px" }}>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>E-mail:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            {email}
                          </h4>
                        </div>
                      </div>

                      

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Class :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            {student_data.classId}
                          </h4>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Section:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            {student_data.sectionId}
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
                            {fatherName}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green",color: "green" }}>Mother Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62", color: "#F0BB62" }}>
                            {mname}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px",color: "green" }}>Date Of Birth:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", color: "#F0BB62" }}>
                            {dateOfBirth}
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
                            {city}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentProfile;
