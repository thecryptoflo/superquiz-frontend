import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Question from "./Question";
import API from "../utils/API";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import GameHeader from "./GameHeader";
import Summary from "./Summary";

var Game = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [game, setGame] = useState({});
    const [summary, setSummary] = useState(false);
    const [txtButton, setTxtButton] = useState("Summary");

    useEffect(() => {
        API.get('/game/'+id)
            .then((res) => {
                console.log(res.data);
                setGame(res.data);
            })
            .catch((e) => {
                console.log(e);
                //TODO redirect to home with an snackbar error popping
                navigate("/");
            })
    }, [id, navigate]);

    function onStartClick(){
        API.post('/game/'+id+'/start')
            .then(res => setGame(res.data))
            .catch(e => console.log(e))
    }

    function onAnswerClick(answer){
        API.post('/game/'+id+'/answer',{answer : answer})
            .then(res => setGame(res.data))
            .catch(e => console.log(e))
    }

    function onNextClick(){
        API.post('/game/'+id+'/next')
            .then((res) => {
                setGame(res.data)
            })
            .catch(e => console.log(e))
    }

    return (
        <Box sx={{
            boxShadow : 3,
            borderRadius : 2,
            display : "flex",
            flexDirection: "column",
            padding: 2
        }}>
            {game.state ?
                <>
                    <GameHeader game={game}/>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        {game.state === "CREATED" ?
                            <Button variant="contained" onClick={onStartClick}>Start Game</Button>
                            :
                            game.state === "ENDED" && summary? <Summary game={game}/> :
                            <Question key={game.round_number} round={game.rounds[game.round_number]} callback={onAnswerClick}/>}
                        {game.state === "PAUSED" ? <Button variant="contained" onClick={onNextClick}>Next</Button> : ""}
                        {game.state === "ENDED" ?
                            (summary ? <Button variant="contained" id="endButton" href="/">Leave</Button>
                                :
                            <Button variant="contained" id="endButton" onClick={() => setSummary(true)}>Summary</Button>) : ""}
                    </Box>
                </>
            :
                <CircularProgress color="inherit" />
            }
        </Box>
    );
}
export default Game;