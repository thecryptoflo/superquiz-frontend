import React from 'react';
import Box from "@mui/material/Box";
import {Chip, Typography} from "@mui/material";

function GameHeader({game}){

    return (
        <Box sx={{
            mb: 4
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Box sx={{
                    display: "flex",
                    m : 1,
                    flexDirection: "column"
                }}>
                    <Typography variant="h3">{game.category ? game.category.name : "All categories"}</Typography>
                    <Box sx={{
                        display: "flex"
                    }}>
                        <Chip color="info" size="small" sx={{mr: 1}} label={game.difficulty ? game.difficulty : "Mixed"}/>
                    </Box>
                </Box>
                {game.state !== "CREATED" ? <Chip color="info" label={game.state}/> : ""}
            </Box>
            <Box>
                { game.round_number !== undefined ?
                    <Typography variant="h4" textAlign="center">Round {game.round_number+1}</Typography>
                    :
                    ""
                }
            </Box>
        </Box>
    );
}

export default GameHeader;