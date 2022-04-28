import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";
import {VisaCreditCard as VisaCard} from "react-fancy-visa-card";
import Sidebar from "../../Components/Student/Sidebar";
import { padding } from "@mui/system";


const StudentProfile = () => {
 
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
 

 

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
                <div class="big-inbox" >Fees Payment </div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div className="right-body" >
            
             
            <div className="App">
            
            <VisaCard 
            frontCardColor="linear-gradient(45deg, #f3c680, hsla(179,54%,76%,1))" 
            backCardColor="linear-gradient(45deg, #f3c680, #A8EB12)" 
            />

        </div>
              
           
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentProfile;
