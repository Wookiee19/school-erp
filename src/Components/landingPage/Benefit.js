import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { Typography } from "@material-ui/core";

function Benefit() {
  const classes = useStyles();

  return (
    <Grid container align="center" className={classes.container}>
      <Grid item xs={12} md={12}>
        <Typography variant="h3">Who will benefit</Typography>
      </Grid>
      <Grid item xs={12} md={4} aign="center" className={classes.grid}>
        
        <Typography variant="h4">Student</Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} align="center">
       
        <Typography variant="h4">Teacher</Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} align="center">
       
        <Typography variant="h4">University/School</Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Benefit;

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
    height: "120vh",
    background: "white",
    padding: "30px",
  },
  grid: {},
}));
