import React, {useContext, useEffect} from "react";
import {UserContext} from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import API from "../utils/API";

function Logout(){

    let userContext = useContext(UserContext);
    useEffect( () => {

        API.get('/logout')
            .then(res => console.log("Succesfully Disconnected"))
            .catch((err) => {
                console.log(err);
                //Maybe clearing the session cookie if no answer or bad answer
            })
        userContext.setUserContext();
        localStorage.removeItem("user");
    });

    return(
        <Navigate to="/" />
    );
}

export default Logout;