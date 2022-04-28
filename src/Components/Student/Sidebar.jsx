import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard, FaTaxi } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi"

import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';




export default function Sidebar() {
  const history = useHistory();
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  const logOut = () => {

    localStorage.clear();
    history.push("/");
  };
  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            
          <div class="abilan">
                <img alt="Logo" src={"https://d2jg2pri5bpndu.cloudfront.net/schools/250_d2d38ff6daa4f91f7fbfd664553d068a.png"} style={{ marginLeft:"25%" }} />
              </div>
          </div>
         
         


          <div className="toggle">
            {/* {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )} */}
          </div>
          <div className="links">
            <ul>
            <Link class="nav-link" to="/studentdashboard">
            <li
                className={localStorage.getItem("cLink")==1 ? "active" : "none"}
                onClick={() => localStorage.setItem("cLink",1)}
              >
                
                  <BsFillChatTextFill />
                  <span>   Student Dashboard </span>
                
                
              </li>
              </Link>
              <Link class="nav-link" to="/student-profile">
              <li
                className={localStorage.getItem("cLink")==2 ? "active" : "none"}
                onClick={() => localStorage.setItem("cLink",2)}
              >
                
                  <MdSpaceDashboard />
                  <span> Student Profile</span>
                
                
              </li>
              </Link>
              <Link class="nav-link" to="/attendance">
              <li
                
                className={localStorage.getItem("cLink") ==3 ? "active" : "none"}
                onClick={() => localStorage.setItem("cLink",3)}
              >
                
                  <RiDashboard2Fill />
                  <span> View Attendance</span>
               
                
              </li>
              </Link>
              <Link class="nav-link" to="/studentexam">
              <li
                className={localStorage.getItem("cLink") ==4 ? "active" : "none"}
                onClick={() => localStorage.setItem("cLink",4)}
              >
                
                  <GiTwirlCenter />
                  <span>Exam</span>
                
               
              </li>
              </Link>
              <Link class="nav-link" to="/feepayment">
              <li
                className={localStorage.getItem("cLink") ==5 ? "active" : "none"}
                onClick={() => localStorage.setItem("cLink",5)}
              >
                
                  <IoSettings />
                  <span> Fees</span>
               
              </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="logout">
          <a onClick={logOut}>
            <FiLogOut />
            <span className="logout">Logout</span>
          </a>
        </div>
      </Section>
      {/* <ResponsiveNav state={"ture"} className={navbarState ? "show" : ""}>
      <ProSidebar>
  <Menu iconShape="square">
    <MenuItem >Dashboard</MenuItem>
    <SubMenu title="Components" >
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar>;
</ResponsiveNav> */}
      
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      // display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker";
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links
     {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;
