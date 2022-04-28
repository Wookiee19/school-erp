import { React, useEffect, useState } from "react";
import styled from "styled-components";
import "../student.css"
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import { padding } from "@mui/system";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyles } from "./ReusableStyles";
export default function Profile() {
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
  const [sectionid, setsectionid] = useState();
  const [classid, setclassid] = useState();
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
        setsectionid(response.data.responseBody.sectionId)
        setclassid(response.data.responseBody.classId)
        setdateOfBirth(response.data.responseBody.user.dateOfBirth)

        

            
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    });
     
  }, []);

  return (
    <Section >
      <div className="image">
        <img src="https://cdn-icons-png.flaticon.com/512/201/201818.png" alt="student" />
      </div>
      <div className="title">
        <h3>{fname}{" "}{lname}</h3>
        <h3>
       {classid} {" "}{sectionid}
          <h3>{email}</h3>
        </h3>
        </div>
      
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h5 {
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .container {
      text-align: center;
    }
  }
`;
