import { React, useEffect, useState } from "react";
import styled from "styled-components";
import "../student.css"
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";

import Employeesidebar from "./Employeesidebar";
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
  const [designation,  setdesignation] = useState();
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

  const [address, setAddress] = useState();
  const [contact, setcontact] = useState();
  
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
    axios.get("https://65.2.31.39/erpdev/teacher/search?searchString="+localStorage.getItem("email"))
      .then((response) => {
        
        console.log(response.data.responseBody);
        setFname(response.data.responseBody.user.firstName)
        setLname(response.data.responseBody.user.lastName)
        setEmail(response.data.responseBody.user.email)
        setfatherName(response.data.responseBody.fatherName)
        setLname(response.data.responseBody.motherName)
        setdateOfBirth(response.data.responseBody.dateOfBirth)
        setdesignation(response.data.responseBody.designation)
        setcontact(response.data.responseBody.mobileNumber)
        localStorage.setItem("Tid",response.data.responseBody.teacherId)
        localStorage.setItem("Tname",response.data.responseBody.user.firstName)

        

            
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
        <img src="data:image/png;base64,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" alt="" />
      </div>
      <div className="title">
        <h3>{fname}{" "}{lname}</h3>
        <h3>
       {classid} {" "}{sectionid}
          <h3>{email}</h3>
          <h3>{designation}</h3>
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
