import React, { useState } from "react";
import "./Result.css";
import Button from "@material-ui/core/Button";
import Result_data from "./Result_data";

const Result = () => {
  const [sem, setSem] = useState();
  const [result, setResult] = useState();

  return (
    <>
      <div className='Result_area'>
        <div className='Result_upper_area'>
          <h1> {sem} Result</h1>
        </div>
        <div className='Result_down_area'>
          <div className='Result_right_area'></div>
          <div className='Result_left_area'>
            <div className='select_result'>
              <label>Please Select the Semester:</label>
              <select
                onChange={(e) => {
                  setSem(e.target.value);
                }}
                value={sem}
              >
                <optgroup>Select the Sem</optgroup>
                <option>Class test-1</option>
                <option>Class test-2</option>
                <option>Class test-3</option>
                <option>Unit tests-1</option>
                
                <option>Half Yearly</option>
                <option>Unit tests-2</option>
                <option>Final</option>
                
              </select>
             
              <Button
                variant='contained'
                value='result_show'
                name='result_show'
                className='btn1'
                color='disable'
              >
                View
              </Button>
            </div>
            <div className='assignment_tabel'>
              <h2>
                Your {sem} {result} Result Information{" "}
              </h2>

              <Result_data />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
