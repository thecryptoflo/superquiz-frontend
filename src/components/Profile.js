import React, {useContext, useEffect, useState} from "react";
import {
    Chip,
    CircularProgress,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import API from "../utils/API";
import {useParams} from "react-router";
import {UserContext} from "../contexts/userContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Profile(){
    const [user, setUser] = useState({});
    const [history, setHistory] = useState([]);
    const diffToColor = {"easy" : "success", "medium" : "warning", "hard" : "error"}
    const { id } = useParams();

    const userContext = useContext(UserContext);

    useEffect(() => {
        let user_id = id;
        if(user_id){
            API.get("/user/"+id)
                .then((res) => {
                    setUser(res.data)
                    console.log(res.data)
                })
                .catch((e) => console.log(e));
        }
        else{
            user_id = userContext.user._id;
            setUser(userContext.user)
        }

        API.get("/user/"+user_id+"/history")
            .then((res) => {
                setHistory(res.data)
                console.log(res.data)
            })
            .catch((e) => console.log(e));

    },[id, setUser, setHistory])

    return (
        <Box>
            <Typography variant="h2" textAlign="center">Profile : {user.username}</Typography>
            {
                history.length ?
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Box display={{ xs: 'none', sm: 'block' }}>Date</Box></TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Continue</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.map((game) => (
                                    <TableRow
                                        key={game._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell className="hidden-xs" component="th" scope="row"><Box display={{ xs: 'none', sm: 'block' }}>{ (new Date(game.created_at)).toLocaleString()}</Box></TableCell>
                                        <TableCell><Chip color={game.difficulty ? diffToColor[game.difficulty] : "info"} size="small" sx={{mr: 1}} label={game.category ? game.category.name : "All"}/></TableCell>
                                        <TableCell>{game.state === "ENDED" ? game.total : ""}</TableCell>
                                        <TableCell>
                                            { game.state !== "ENDED"? <Button variant="contained" color="success" href={"/game/"+game._id}>Continue</Button>
                                                :
                                                <Button variant="contained" href={"/game/"+game._id}>Summary</Button>
                                            }

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <CircularProgress color="inherit" />
            }
        </Box>
    );
}

export default Profile;