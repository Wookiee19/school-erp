import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";
import Auth from "@aws-amplify/auth";
import PrivateRoute from "./PrivateRoute";
import { Switch, Route } from 'react-router-dom'
import SignIn from "../view/auth-view/SignIn"
import CampusDashboard from '../Components/CampusDashboard';
import EmployeeDashboard from '../Components/EmployeePortal/EmployeeDashboard';
import EmployeeFee from '../Components/EmployeePortal/EmployeeFee';
import EmployeeLedger from '../Components/EmployeePortal/EmployeeLedger';
import EmployeeVoucher from '../Components/EmployeePortal/EmployeeVoucher';
import EmployeeCustomVoucher from '../Components/EmployeePortal/EmployeeCustomVoucher';
import EmployeePeriod from '../Components/EmployeePortal/EmployeePeriod';
import EmployeeDiscount from '../Components/EmployeePortal/EmployeeDiscount';
import EmployeeDefaulters from '../Components/EmployeePortal/EmployeeDefaulters';
import EmployeeStructure from '../Components/EmployeePortal/EmployeeStructure';
import EmployeeBreakdown from '../Components/EmployeePortal/EmployeeBreakdown';
import EmployeeExpense from '../Components/EmployeePortal/EmployeeExpense';
import EmployeeAddStructure from '../Components/EmployeePortal/EmployeeAddStructure';
import Admission from '../Components/Admission';
import MyClass from '../Components/MyClass';
import AdmissionRequest from '../Components/AdmissionRequest';
import Mystudents from '../Components/Mystudents';
import Documents from '../Components/Documents';
import Finance from '../Components/Finance';
import SchoolUndertaking from '../Components/SchoolUndertaking';

import StudentPassword from '../Components/StudentPassword';
import Home from "../Components/Home";
import StudentLedger from "../Components/StudentLedger";
import FeeComponents from '../Components/Fee';
import  TcReport  from '../Components/TcReport'
import StudentDashboard from '../Components/StudentDashboard'
import AdmissionCharges from '../Components/AdmissionCharges';
import StudentProfile from '../Components/StudentProfile';
import Exam  from "../Components/Exam";
import adminresult from "../Components/AdminResult"
import ViewAttendance from '../Components/ViewAttendance';
import StudentLeave from '../Components/StudentLeave';
import Error404 from "../Components/Error404";

import Subject from "../Components/Subject";
import EmployeetimeTable from "../Components/EmployeePortal/EmployeeTimetable";
import Card from "../Components/Payment/Card"
import Result from "../Components/Result";
import StudentAttendance from "../Components/StudentAttendance";
import Studentexam from "../Components/Student/Studentexam"
import  EmployeeProfile from "../Components/EmployeePortal/Employeeprofile";
import Employeeexam from "../Components/EmployeePortal/Employeeexam";




// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "";
// import RTL from "layouts/rtl";
// import Profile from "layouts/profile";

// import SignUp from "layouts/authentication/sign-up";

// // Vision UI Dashboard React icons
// import { IoRocketSharp } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { BsFillPersonFill } from "react-icons/bs";
// import { IoBuild } from "react-icons/io5";
// import { BsCreditCardFill } from "react-icons/bs";
// import { IoStatsChart } from "react-icons/io5";
// import { IoHome } from "react-icons/io5";

// const routes = [
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     route: "/dashboard",
//     icon: <IoHome size="15px" color="inherit" />,
//     component: Dashboard,
//     noCollapse: true,
//   },
//   {
//     type: "collapse",
//     name: "Tables",
//     key: "tables",
//     route: "/tables",
//     icon: <IoStatsChart size="15px" color="inherit" />,
//     component: Tables,
//     noCollapse: true,
//   },
//   {
//     type: "collapse",
//     name: "Billing",
//     key: "billing",
//     route: "/billing",
//     icon: <BsCreditCardFill size="15px" color="inherit" />,
//     component: Billing,
//     noCollapse: true,
//   },
//   {
//     type: "collapse",
//     name: "RTL",
//     key: "rtl",
//     route: "/rtl",
//     icon: <IoBuild size="15px" color="inherit" />,
//     component: RTL,
//     noCollapse: true,
//   },
//   { type: "title", title: "Account Pages", key: "account-pages" },
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     route: "/profile",
//     icon: <BsFillPersonFill size="15px" color="inherit" />,
//     component: Profile,
//     noCollapse: true,
//   },
  
 
// ];
export default function Routes() {
  
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    getUser();
    const subscription = DataStore.observe(User).subscribe((msg) => {
      getUser();
    });
    return () => subscription.unsubscribe();
  }, []);
  async function getUser() {
    const user = await Auth.currentAuthenticatedUser();
    const currentUser = (await DataStore.query(User)).filter(
      (c) => c.username === user.username
    );
    setCurrentUser(currentUser);
  }
  return (
    <Switch>
      
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
        
          <PrivateRoute path="/documents" component={Documents} />
        <PrivateRoute path="/StudentLeave" component={StudentLeave} />
       
            <Route path="/attendance" component={ViewAttendance} />
            
            <PrivateRoute path="/student-profile" component={StudentProfile} />
            <PrivateRoute path="/adminresult" component={adminresult} />
            <PrivateRoute path="/studentdashboard" component={StudentDashboard} />
            <PrivateRoute path="/studentdashboard" component={StudentDashboard} />
            
            <PrivateRoute path="/admissionrequest" component={AdmissionRequest} />
            <Route path="/campusdashboard" component={CampusDashboard} />
            {/* <Route path="/adminDashboard" component={adminDashboard} /> */}
            <Route path="/feepayment" component={Card} />
            <Route path="/TcReport" component={TcReport}/> 
        
            <Route path="/result" component={Result}/> 
            <PrivateRoute path="/class" component={MyClass} />
            <Route path="/subject" component={Subject}/> 
            <Route path="/Employeeexam" component={Employeeexam}/> 
            <PrivateRoute path="/students" component={Mystudents} />
            <PrivateRoute path="/liveclass" component={StudentLedger} />
            <PrivateRoute path="/studentpassword" component={StudentPassword} />
            <Route path="/EmployeetimeTable" component={EmployeetimeTable} />
            <PrivateRoute path="/schoolundertaking" component={SchoolUndertaking} />
            <Route path="/employee" component={Finance} />
            <PrivateRoute path="/file" component={File}/>
            <PrivateRoute path="/admission" component={AdmissionCharges} />
            <PrivateRoute path="/admissioncomponents" component={Admission} />
            <PrivateRoute path="/feecomponents" component={FeeComponents} />
            <Route path="/studentattendance" component={StudentAttendance} />
            <Route path="/exam" component={Exam} />
            <PrivateRoute path="/studentexam" component={Studentexam} />
            <Route path="/EmployeeProfile" component={EmployeeProfile} />
            <PrivateRoute path="/employeedashboard" component={EmployeeDashboard} />
            <PrivateRoute path="/employeefeecomponents" component={EmployeeFee} />
            <PrivateRoute path="/employeefeevoucheradmin" component={EmployeeVoucher} />
            <PrivateRoute path="/employeeadminledger" component={EmployeeLedger} />
            <PrivateRoute path="/employeeperiod" component={EmployeePeriod} />
            <PrivateRoute path="/employeestructure" component={EmployeeStructure} />
            <PrivateRoute path="/employeeaddstructure" component={EmployeeAddStructure} />
            <PrivateRoute path="/employeebreakdown" component={EmployeeBreakdown} />
            <PrivateRoute path="/employeedefaulter" component={EmployeeDefaulters} />
            <PrivateRoute path="/employeediscount" component={EmployeeDiscount} />
            <PrivateRoute path="/employeeexpense" component={EmployeeExpense} />
            <PrivateRoute path="/employeecustomvoucher" component={EmployeeCustomVoucher} />

      <Route path="*" component={Error404} />
    </Switch>
  );
}
