import React from 'react'
import {Avatar} from "@mui/material";
import {colorHash} from "../utils/general";

function UserAvatar({username}) {
    return(
        <Avatar sx={{bgcolor : colorHash.hex(username)}}>{username.slice(0,1).toUpperCase()}</Avatar>
    );
}

export default UserAvatar;