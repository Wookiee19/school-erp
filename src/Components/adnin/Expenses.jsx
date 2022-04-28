import React from "react";
import styled from "styled-components";
import "./styles.css";
import { BarChart, Bar, XAxis, YAxis, 
    CartesianGrid } from 'recharts';

import { cardStyles } from "./ReusableStyles";

const data = [
    { name: 'JAN', x: 12, y: 23, z: 122 },
    { name: 'FEB', x: 22, y: 3, z: 73 },
    { name: 'MAR', x: 13, y: 15, z: 32 },
    { name: 'APR', x: 44, y: 35, z: 23 },
    { name: 'MAY', x: 35, y: 45, z: 20 },
    { name: 'JUN', x: 62, y: 25, z: 29 },
    { name: 'JUL', x: 37, y: 17, z: 61 },
    { name: 'AUG', x: 28, y: 32, z: 45 },
    { name: 'SEP', x: 19, y: 43, z: 93 },
    { name: 'OCT', x: 19, y: 43, z: 93 },
    { name: 'NOV', x: 19, y: 43, z: 93 },
    { name: 'DEC', x: 19, y: 43, z: 93 },
];
export default function Expenses() {
  return (
    <Section>
      <div className="top">
        <div className="info">
        <h2>Monthly Expenses Tracker </h2>
        </div>
      </div>
      <div className="chart">
      <BarChart width={600} height={200} data={data} >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="x" stackId="a" fill="#8884d8" />
            <Bar dataKey="y" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #d7e41e1d;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #AC66CC;
          span {
            color: black;
          }
        }
        span {
          color: #AC66CC;
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
