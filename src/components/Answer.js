import React from 'react';
import {Button, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

var Answer = ({index, answer, isCorrect, isUserAnswer, callback}) => {
    let color;
    if(isCorrect)
        color = "success";
    else if(isCorrect === false)
        color = "error";
    else
        color = "info";

    return (
        <Button key={index} variant="contained" color={color} onClick={isCorrect !== undefined ? () => {} : () => callback(answer)}>
            <Typography>
                {answer}
            </Typography>
            {isUserAnswer ? <PersonIcon />: ""}
        </Button>
    );
}
export default Answer;