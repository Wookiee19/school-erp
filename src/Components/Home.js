import React from "react";
import {makeStyles} from "@material-ui/core";
import LandingPage from "./landingPage/LandingPage";
import {isLoggedIn} from "../routes/isLoggedIn";
import CampusDashboard from '../Components/CampusDashboard';
//Auth.configure(awsconfig); //For NoUserPool Found error
//Amplify.configure(awsconfig);


export default function Account() {
    const classes = useStyles();
    //Auth.currentSession().then(data => console.log(data.accessToken));

    return !isLoggedIn() ? (
        <LandingPage/>
    ) : (


        <CampusDashboard/>


    );

}

const useStyles = makeStyles((theme) => ({
    sidebar: {
        height: "100%",
        background: theme.palette.primary.main,
        [theme.breakpoints.up("md")]: {
            height: "100vh",
        },
    },
}));
