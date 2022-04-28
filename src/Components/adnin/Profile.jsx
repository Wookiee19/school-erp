import React from "react";
import styled from "styled-components";import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { cardStyles } from "./ReusableStyles";


const TABLE_LIST = [
  { name: "JAN", pv: 44 },
  { name: "FEB", pv: 53 },
  { name: "MAR", pv: 68 },
  { name: "APR", pv: 29 },
  { name: "MAY", pv: 38 },
  { name: "JUN", pv: 18 },
  { name: "JULY", pv: 93 },
  { name: "SEP", pv: 23 },
  { name: "OCT", pv: 27 },
  { name: "NOV", pv: 54 },
  { name: "DEC", pv: 36 }
];
export default function Earnings() {
  return (
    <Section>
      <div className="top">
      <div className="info">
        <h2>Monthly Fees Tracker </h2>
         
        </div>
      </div>
      <div className="chart">
      <BarChart
        width={600}
        height={300}
        data={TABLE_LIST}
        margin={{ top: 5, right: 30, left: 20, bottom: 95 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
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
