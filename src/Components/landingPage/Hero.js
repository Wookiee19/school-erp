import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";


function Hero() {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        align="center"
        style={{ background: "#12355B", color: "white", height: "100vh" }}
      >
        <Grid item xs={12}>
          <Container maxWidth="md" style={{ padding: "20px" }}>
            <Typography variant="h3">
              Everything you need to manage 
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.subtitle}
            >
              
            </Typography>
            
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </Link>
            </Button>
          </Container>
          <div>
            Demo credentials:
            <p>  email: "rid123@gmail.com"</p>
            <p> password: "Erpw@123"</p>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Hero;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "50px 10px 0px 10px",
  },
  subtitle: {
    [theme.breakpoints.up("md")]: {
      padding: "0 120px",
    },
  },
}));
