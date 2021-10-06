import React from 'react'
import TextField from '@mui/material/TextField';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const PoetForm = () => {
    return (
        <Box m="50px auto">
            <Toolbar/>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <TextField margin="dense" label="নাম" variant="outlined" size="small" />
                <TextField margin="dense" label="ছদ্মনাম" variant="outlined" size="small" />
            </Box>
        </Box>
    )
}

export default PoetForm
