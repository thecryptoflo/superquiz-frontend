import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Box from '@mui/material/Box';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Game from './components/Game';
import Logout from "./components/Logout";

import {UserContext} from "./contexts/userContext";
import {isJSON} from "./utils/general";
import {Divider, ThemeProvider} from "@mui/material";
import theme from "./styles/Theme";
import API from "./utils/API";

function App() {
    if(!isJSON(localStorage.user))
        localStorage.removeItem("user");
    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        console.log("Updating user : ",user);
    }
    useEffect(() => {
        if(user)
            API.get("/user/"+user._id)
                .then(res => console.log("Still connected server-side"))
                .catch((e) => {
                    console.log("Not connected server-side, we logout client")
                    setUser(undefined);
                    localStorage.removeItem("user");
                });
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user: user,
                        setUserContext: updateUserData
                    }}>

                        <Header/>

                        <Box sx={{
                            display: "flex",
                            flex: '1 0 auto',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/logout" element={<Logout/>}/>
                                <Route path="/leaderboard" element={<Leaderboard/>}/>

                                <Route path="/profile/">
                                    <Route path=":id" element={<Profile/>}/>
                                    <Route path="" element={<Profile/>}/>
                                </Route>

                                <Route path="/game/:id" element={<Game/>}/>

                                <Route path="*" element={<Home/>}/>
                            </Routes>
                        </Box>

                        <Divider />

                        <Footer/>

                    </UserContext.Provider>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
