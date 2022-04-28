import React, { useEffect } from "react";
import styled from "styled-components";
import Analytics from "./Analytics";
import Earnings from "./Earnings";
import FAQ from "./FAQ";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Expenses from "./Expenses";
import scrollreveal from "scrollreveal";
import "../student.css"
import Helmet from 'react-helmet';
export default function Dashboard() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
 
  return (
    <Section>
      <Helmet bodyAttributes={{style: 'background-color : #57CC99'}}/>
    
      <Navbar   />
      <div className="grid">
        <div className="row__one">
          <Analytics  />
          <FAQ />
        </div>
        
        <div className="row__two">
        <Expenses/>
        <Earnings />
          {/* <Profile /> */}
          
        </div>
         </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 35%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    magin-top:6px
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
