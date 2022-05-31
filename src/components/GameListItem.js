import React from "react"
import {Avatar, ListItem, IconButton, ListItemText, ListItemAvatar, Chip, Tooltip} from "@mui/material";
import UserAvatar from "./UserAvatar";
import Box from "@mui/material/Box";

function GameListItem({game, index}){
    let color = "info";

    switch(game.difficulty){
        case "easy":
            color="success";
            break;
        case "medium":
            color="warning";
            break;
        case "hard":
            color="error";
            break;
    }

    return (
        <ListItem
            secondaryAction={
                <Tooltip title={game.user.username} arrow placement="right">
                    <IconButton edge="end" aria-label="delete" href={"/profile/"+game.user._id}>
                            <UserAvatar username={game.user.username}/>
                    </IconButton>
                </Tooltip>
                }>
            <ListItemAvatar><Avatar>{index+1}</Avatar></ListItemAvatar>
            <ListItemText>{game.total} points</ListItemText>
            <ListItemText variant="span">
                <Box display="flex" flexDirection="column">
                    <Chip color={color} size="small" sx={{mr: 1}} label={game.category ? game.category.name : "All"}/>
                </Box>
            </ListItemText>
        </ListItem>
    );
}

export default  GameListItem;