import React, {useEffect, useRef, useState} from 'react';
import {Grid, LinearProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Answer from "./Answer";

var Question = ({ round, callback }) => {
    //TODO If boolean, display TRUE, FALSE instead of FALSE TRUE (.reverse())
    const [progress, setProgress] = useState(Math.floor(100*Math.exp(-0.2*((Date.now()- Date.parse(round.start_time)) / 1000))));

    useEffect(() => {
        const interval = setInterval(() => {
            let diff_time = (Date.now()- Date.parse(round.start_time)) / 1000
            setProgress(Math.floor(100*Math.exp(-0.2*(diff_time))));
        }, 100);

        return () => clearInterval(interval);

    }, [])

    return (
        <Box mb={2}>
            <Typography variant="h5" mb={2}>{round.question.description}</Typography>
            <Grid mb={2} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {round.question.answers.map((answer, index) => {
                    if(round.user_answer){
                        return (<Grid key={index} item xs={6} sx={{display:"grid"}}>
                            <Answer index={index} answer={answer} isCorrect={answer === round.question.correct_answer}
                                    isUserAnswer={answer === round.user_answer} callback={callback}/>
                        </Grid>)
                    }

                    return <Grid key={index} item xs={6} sx={{display:"grid"}}><Answer index={index} answer={answer} callback={callback}/></Grid>
                })}
            </Grid>
            {round.score !== undefined ? <Typography mt={2} textAlign="center" variant="h6">{round.score} points</Typography> :
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{progress}</Typography>
                    </Box>
                </Box> }
        </Box>
    );
}
export default Question;