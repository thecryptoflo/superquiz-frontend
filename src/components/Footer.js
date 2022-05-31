import React from "react";
import Box from "@mui/material/Box";
import {Divider, Typography} from "@mui/material";

function Footer (){
    return (
        <Box sx={{
            height: '50px',
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography>
                Credits to flo_rizard.
            </Typography>
        </Box>
    );
}
export default Footer;