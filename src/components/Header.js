import React from 'react';
import {UserContext} from "../contexts/userContext";

import {AppBar, Box, Button, Divider, IconButton, Link, Toolbar, Typography} from "@mui/material";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from '@mui/icons-material/Logout';
import UserAvatar from "./UserAvatar";

function Header(){

    return (
        <Box>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Link href="/" sx={{flexGrow : 1}}>
                        <Box component='img' src={require("../logo.png")}
                            sx={{
                                height: "2em",
                                imageRendering: "-webkit-optimize-contrast"
                        }}/>
                    </Link>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="leaderboard"
                        sx={{ mr: 2 }}
                        href="/leaderboard"

                    >
                        <LeaderboardIcon />
                    </IconButton>
                    <Divider variant="middle" orientation="vertical" color="white" flexItem/>
                    <Box sx={{
                        ml : 2
                    }}>
                        <UserContext.Consumer>
                            {context => (
                                context.user ?
                                    <>
                                        <IconButton color="inherit" href="/profile">
                                            <UserAvatar username={context.user.username}/>
                                        </IconButton>
                                        <Typography variant="h7">
                                            {context.user.username}
                                        </Typography>
                                        <IconButton color="inherit" href="/logout"><LogoutIcon /></IconButton>
                                    </>
                                    :
                                    <>
                                        <Button color="inherit" href="/login">Login</Button>
                                        <Button color="inherit" href="/register">Register</Button>
                                    </>
                            )}
                        </UserContext.Consumer>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;