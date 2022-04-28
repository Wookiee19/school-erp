
/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation,Link } from "react-router-dom";

import  "./main.css";
import Icon from "awesome-react-icons";
import React, { useState } from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import transitions from "@material-ui/core/styles/transitions";

export const NavSidebar = ({childern}) => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user,setUser]=useState(false);
  const [record,setRecord]=useState(false);
  const [section,setSection]=useState(false);
  const [fee,setFee]=useState(false);
  const [admission,setAdmission]=useState(false);
  const [student,setStudent]=useState(false);
  const [finance,setFinance]=useState(false);

  return (
    <React.Fragment>
     
        <div id="sidebar">
          <div class="pt-5 p-4">
            <div class="imgContainer">
              <img
                alt="School Logo"
                class="logo"
                src={
                  "https://fee-management-api.nastechltd.co/api/school_profile/" +
                  localStorage.getItem("school_id")
                }
              />
            </div>
            <ul class="list-unstyled components mb-5">
              
              <li class="active">
                <Link
                  onClick={(e) => user === true ? setUser(false) : setUser(true)}
                  data-toggle="collapse"
                  class="dropdown-toggle"
                  aria-expanded={user}
                  style={{transition:"0.3s"}}
                >
                  Users
                </Link>
                <ul     
                  className={user ===true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}
                  >
                  <li>
                    <Link
                    onClick={(e) => student === true ? setStudent(false) : setStudent(true)}
                    data-toggle="collapse"
                    class="dropdown-toggle"
                    >Students</Link>
                      <ul className={student === true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}>
                        <li><Link>Expanse Tracking</Link></li>
                        <li><Link>Discount</Link></li>
                        <li><Link>Defaulters</Link></li>
                        <li><Link>Attendance</Link></li>
                        <li><Link>Reports</Link></li>
                        <li><Link>Undertaking</Link></li>
                        <li><Link>Fee voucher</Link></li>
                        <li><Link>Student Ledger</Link></li>
                      </ul>
                    
                  </li>
                  <li>
                    <Link
                    onClick={(e) => finance === true ? setFinance(false) : setFinance(true)}
                    data-toggle="collapse"
                    class="dropdown-toggle"
                    >Finance</Link>
                    <ul className={finance===true ? "collapse list-unstyled show" : "collapse list-unstyled"}>
                      <li><Link>Employee</Link></li>
                    </ul>
                  </li>
                  
                </ul>
              </li>
              <li>
                <Link
                  onClick={(e) => section === true ? setSection(false) : setSection(true)}
                  data-toggle="collapse"
                  class="dropdown-toggle"
                  aria-expanded={section}
                  style={{transition:"0.3s"}}
                >
                  Classes and Sections
                </Link>
                <ul style={section === true ? {transition:"0.5s"} : null}
                  className={section ===true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}
                  >
                  <li>
                    <Link >Classes</Link>
                  </li>
                  <li>
                    <Link >Sections</Link>
                  </li>
                  <li>
                    <Link >Term</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={(e) => admission === true ? setAdmission(false) : setAdmission(true)}
                  data-toggle="collapse"
                  class="dropdown-toggle"
                  aria-expanded={admission}
                  style={{transition:"0.3s"}}>Admission</Link>
                <ul 
                  className={admission ===true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}
                  >
                  <li>
                    <Link >Pending Admission</Link>
                  </li>
                  <li>
                    <Link >Admission Charges</Link>
                  </li>
                  <li>
                    <Link >Document Required</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={(e) => fee === true ? setFee(false) : setFee(true)}
                  data-toggle="collapse"
                  class="dropdown-toggle"
                  aria-expanded={fee}
                  style={{transition:"0.3s"}}>Fee</Link>
                <ul 
                  className={fee ===true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}>
                  <li>
                    <Link >Fee Period</Link>
                  </li>
                  <li>
                    <Link >Fee Structure</Link>
                  </li>
                  <li>
                    <Link>Custom Fee Vouchers</Link>
                  </li>
                </ul>
              </li>
              <li class="active">
                <Link
                  onClick={(e) => record === true ? setRecord(false) : setRecord(true)}
                  data-toggle="collapse"
                  class="dropdown-toggle"
                  aria-expanded={record}
                  style={{transition:"0.3s"}}
                >
                  School Records
                </Link>
                <ul
                  
                  className={record ===true ? "collapse list-unstyled show testUl" : "collapse list-unstyled"}
                  id="homeSubmenu"
                  >
                  <li>
                    <Link >Inventory</Link>
                  </li>
                  <li>
                    <Link >School Assets</Link>
                  </li>
                  <li>
                    <Link >School Ledger</Link>
                  </li>
                  <li>
                    <Link >School Account</Link>
                  </li>
                  <li>
                    <Link >Expense Voucher</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      
      
    </React.Fragment>
  );
};
