import React, {useContext, useEffect, useState} from "react";

import {Box, Button, Typography} from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import API from "../utils/API";
import NewGameDialog from "./NewGameDialog";
import {useNavigate} from "react-router";
import {UserContext} from "../contexts/userContext";

function Home(){
    //TODO add multiple categories selection
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {
        API.get("/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    },[]);

    function createGame(difficulty, category){
        let query = {}
        console.log("Creating game... diff :",difficulty,"category :",category);
        setOpenDialog(false);
        if(category >= 0)
            query.category = category
        if(difficulty !== "all")
            query.difficulty = difficulty

        API.post('/game', {query : query})
            .then((res) => {
                navigate("/game/"+res.data._id);
            })
            .catch(err => console.log(err))
    }

    function handleButtonClick(){
        if(!userContext.user)
            navigate("/login");
        setOpenDialog(true);
    }

    return(
        <Box sx={{display: "flex", flexDirection : "column", justifyContent: "space-evenly", height : "100%"}}>
            <Typography variant="h1" sx={{flexGrow : 3, display: "flex", alignItems: "center"}}>SuperQuiz</Typography>
            <Box sx={{flexGrow : 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                <Button variant="contained" onClick={handleButtonClick}>Play a Quiz</Button>
                <Button variant="contained" href="/leaderboard"><LeaderboardIcon sx={{mr : 1}}/> Best Score</Button>
            </Box>
            <NewGameDialog open={openDialog} categories={categories} onSubmitCB={createGame} handleClose={ () => setOpenDialog(false)}/>
        </Box>
    );
}

export default Home;