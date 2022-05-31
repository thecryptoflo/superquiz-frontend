import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

export default function NewGameDialog({open, categories, onSubmitCB, handleClose}) {
    const [difficulty, setDifficulty] = useState("all");
    const [category, setCategory] = useState(0);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
            <DialogTitle>New Game</DialogTitle>
            <DialogContent>
                <InputLabel htmlFor="demo-dialog-select-category">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-category"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ width: '100%'}}
                >
                    <MenuItem value={0}>All</MenuItem>
                    {categories ? categories.map((cat) => {
                        return <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                    }) : ""}
                </Select>

                <InputLabel htmlFor="demo-dialog-select-diff" sx={{mt:2}}>Difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-diff"
                    id="demo-simple-select"
                    value={difficulty}
                    label="Difficulty"
                    onChange={(e) => setDifficulty(e.target.value)}
                    sx={{ width: '100%'}}
                >
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value='easy'>Easy</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='hard'>Hard</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => onSubmitCB(difficulty, category)}>Create Game</Button>
            </DialogActions>
        </Dialog>
    );
}