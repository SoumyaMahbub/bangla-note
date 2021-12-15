import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';

const Quiz = () => {
    return (
        <Box sx={{marginTop: "100px"}}>
            <Toolbar/>
            <Stack sx={{width: "75%", margin: "auto"}} spacing={2}>
                <Typography variant="h3" sx={{marginBottom: "30px"}}>কোন ধরণের কুইজে অংশ নিতে চান?</Typography>
                <Link to="/mcq-quiz-options">
                    <Button sx={{width: "100%"}} size="large" variant="outlined">এম.সি.কিউ. কুইজ</Button>
                </Link>
                <Link to="/general-quiz">
                    <Button sx={{width: "100%"}} size="large" variant="outlined">সাধারণ কুইজ</Button>
                </Link>
            </Stack>
        </Box>
    )
}

export default Quiz
