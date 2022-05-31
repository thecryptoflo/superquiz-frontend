import React, {useContext, useState} from "react";
import {UserContext} from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import API from "../utils/API";
import {Alert, Button, Snackbar, TextField, Typography} from "@mui/material";
import {isInputSafe} from "../utils/general";

function Login(){

    const userContext = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);

    const [openSnack, setOpenSnack] = useState(false);

    function changeUsername(e){
        //inputProps={{ pattern: "^[A-Za-z0-9_]*$" }}
        setUsername(e.target.value);
        if(!isInputSafe(e.target.value)){
            setUsernameValid(false);
        }
        else{
            setUsernameValid(true);
        }
    }

    async function checkLogin(e){
        e.preventDefault();

        if(!usernameValid) return;

        API.post('/login', {username: username, password: password})
            .then((res) => {
                if (res.data._id !== undefined) {
                    userContext.setUserContext(res.data)
                }
            }).catch((error) => {
                console.log(error);
                setUsername("");
                setPassword("");
                setError("Invalid username or password");
                setOpenSnack(true);
        });
    }

    return (
        <Box sx={{
            border: 2,
            borderColor: "lightgray",
            borderRadius : 2,
            display : "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "40%"
        }}>
            {userContext.user ? <Navigate replace to="/" /> : ""}
            <Typography
                variant="h4"
                sx={{ m: 2 }}
            >Login</Typography>
            <Box component='form' onSubmit={checkLogin} sx={{
                display : "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%"
            }}>
                <TextField id="outlined-basic" required
                           sx={{ mb: 2 }}
                           label="Username"
                           variant="outlined"
                           value={username}
                           error={!usernameValid}
                           helperText={usernameValid ? "" : "Must be alphanumerics or _"}
                           onChange={(e) => changeUsername(e)}/>
                <TextField id="outlined-password-input" required
                           sx={{ mb: 2 }}
                           label="Password"
                           variant="outlined"
                           type="password"
                           value={password}
                           onChange={(e) => (setPassword(e.target.value))}/>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ mb: 2 }}
                >Log In</Button>
                <Typography sx={{ mb: 2 }} variant="span">Don't have an account ?<Button href="/register">Register</Button></Typography>
            </Box>
            <Snackbar open={openSnack} autoHideDuration={5000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled"  severity="error" sx={{ width: '100%' }} onClose={() => setOpenSnack(false)}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );

}

export default Login;