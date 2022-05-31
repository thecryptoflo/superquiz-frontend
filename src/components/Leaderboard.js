import React, {useEffect, useState} from "react";
import {CircularProgress, List, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import API from "../utils/API";
import GameListItem from "./GameListItem";

function Leaderboard(){
    //TODO For now display best scores overall and then later by category and difficulty

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        API.get("/leaderboard")
            .then(res => {
                setLeaderboard(res.data)
                console.log(res.data)
            })
            .catch(e => console.log(e))
    }, [setLeaderboard]);

    return (
        <Box>
            <Typography variant="h2" m={2}>Leaderboard</Typography>
            {
                leaderboard.length ?
                    <List>
                        {leaderboard.map((game, index) =>
                            <GameListItem key={index} game={game} index={index}/>)}
                    </List>
                    :
                    <CircularProgress color="inherit" />
            }
        </Box>
    );
}

export default Leaderboard;