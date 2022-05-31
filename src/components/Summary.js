import React from 'react'
import {Container, Step, StepLabel, Stepper, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Summary({game}) {

    return (
        <Container>
            <Stepper mb={2} activeStep={game.round_number} orientation="vertical">
                {game.rounds.map((round, index) => (
                    <Step key={index} completed={true} sx={{color : "green"}}>
                        <StepLabel
                            icon={round.is_correct ? <CheckCircleIcon color="success" /> : <CancelIcon color="error"/>}
                            optional={<Typography variant="caption">{round.question.description} <Typography variant="caption" color="success.main">{round.question.correct_answer}</Typography></Typography>}
                        >
                            Round {index + 1} - Score : {round.score}, Total time : {
                            Math.floor((Date.parse(round.end_time) - Date.parse(round.start_time)) / 1000)} s
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Typography m={2} textAlign="center" variant="h6">Final score : {game.total} points</Typography>
        </Container>
    );
}

export default Summary;