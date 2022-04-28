import React, { useEffect, useState } from "react";

import awsconfig from "../../aws-exports";
import { Link, useHistory } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  Box,
  Hidden,
} from "@material-ui/core";
import login from "../../assets/svg/login.svg";


import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports';

Amplify.configure(awsConfig); //For NoUserPool Found error
console.log(awsConfig);
Auth.configure(awsConfig);
const useStyles = makeStyles((theme) => ({
  right: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textField: {
    width: "70%",
    marginBottom: "20px",
  },
}));
const initialFormState = {
  username: "",
  password: "",
  formType: "signIn",
};

function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [formState, updateFormState] = useState(initialFormState);

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  };
  const { formType } = formState;
  useEffect(() => {
    async function signIn() {
      const { username, password } = formState;
      try {
        
        await Auth.signIn(username, password);
        updateFormState(() => ({ ...formState }));
        localStorage.setItem("auth", username);
        
        Auth.currentSession()
        .then(
          data => 
        {
       
        if(data.accessToken.payload['cognito:groups']['0']=="ROLE_ADMIN") {
          localStorage.setItem("email",data.accessToken.payload.username );
        history.push("/");}
        else if(data.accessToken.payload['cognito:groups']['0']=="ROLE_TEACHER"){
          localStorage.setItem("email",data.accessToken.payload.username );
        history.push("/employeedashboard");}
        else if (data.accessToken.payload['cognito:groups']['0']=="ROLE_STUDENT"){
          localStorage.setItem("email",data.accessToken.payload.username );
        history.push("/studentdashboard");
        }
      });
      } catch (err) {
        alert(err.message);
        console.log("error signing in user...", err.message);
      }
    }
    
  }, []);
  
  async function signIn() {
    const { username, password } = formState;
    try {
      
      await Auth.signIn(username, password);
      updateFormState(() => ({ ...formState }));
      localStorage.setItem("auth", username);
      
      Auth.currentSession()
      .then(
        data => 
      {
     
      if(data.accessToken.payload['cognito:groups']['0']=="ROLE_ADMIN") {
        localStorage.setItem("email",data.accessToken.payload.username );
      history.push("/");}
      else if(data.accessToken.payload['cognito:groups']['0']=="ROLE_TEACHER"){
        localStorage.setItem("email",data.accessToken.payload.username );
      history.push("/employeedashboard");}
      else if (data.accessToken.payload['cognito:groups']['0']=="ROLE_STUDENT"){
        localStorage.setItem("email",data.accessToken.payload.username );
      history.push("/studentdashboard");
      }
    });
    } catch (err) {
      alert(err.message);
      console.log("error signing in user...", err.message);
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Hidden xsDown>
          <Grid item xs={12} sm={5} xl={4} className={classes.right}>
            <img src={login} alt="login" height="300px" width="300px" />
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={7} xl={8}>
          {formType === "signIn" && (
            <Container maxWidth="sm" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Sign In Now!
              </Typography>

              <Box fontWeight={700} style={{ margin: "5px 0px" }}>
                Username
              </Box>
              <TextField
                name="username"
                required
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={onChange}
              />
              <Box fontWeight={700} style={{ margin: "5px 0px" }}>
                Password
              </Box>
              <TextField
                name="password"
                type="password"
                required
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={onChange}
              />
              <Button onClick={signIn} variant="contained" color="primary">
                Sign In
              </Button>
              <br/>
              <div>
                Demo credentials:
                <p>admin</p>
                <p> username: rid123@gmail.com</p>
                <p> password:  Erpw@123</p>
                <p>Teacher</p>
                <p> username:  	atul@gmail.com</p>
                <p> password: Qwerty@123</p>
                <p>student</p>
                <p> username: sagar@gmail.com</p>
                <p> password: Qwerty@123</p>
               
              </div>
            </Container>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default SignIn;
