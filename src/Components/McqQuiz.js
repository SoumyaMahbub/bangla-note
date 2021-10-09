import React, {useEffect, useState} from "react";
import api from "../api/data.js";
import { Card, Toolbar } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Radio } from "@mui/material";
import { Box } from "@mui/material";

const McqQuiz = () => {
    const [questions, setQuestions] = useState([])
    const retrieveAuthors = async () => {
        api.get("/authors")
            .then(response => {
                const authors = response.data;
                authors.forEach(author => {
                    setQuestions(prevState => [...prevState, author['questions']]);
                })
            });
    };  
    useEffect(() => {
        const getAllAuthors = async () => {
            await retrieveAuthors();
        }
        getAllAuthors();
    }, []);
    return (
        <Box di>
            <Toolbar/>
            <Card variant="outlined" sx={{ width: "70%", margin: "50px auto 20px auto"}}>
                <CardContent sx={{width:"90%", margin: "10px auto"}}>
                    <Typography variant="h6" sx={{textAlign:'left', marginBottom: "20px"}} component="div">
                        Here is supposed to be a very big large afsufaiusfhashf
                        gsdgiudhsgiudshgi ghsudhgidhsfdhsgihsghdish question?
                    </Typography>
                    <RadioGroup
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                        />
                    </RadioGroup>
                </CardContent>
                <CardActions>
                    <Button sx={{marginLeft: 'auto'}} variant="outlined" size="large">Next</Button>
                </CardActions>
            </Card>
            <Box>
                <Typography variant="h3">62/65</Typography>
                <Button variant="outlined">View History</Button>
            </Box>
        </Box>
    );
};

export default McqQuiz;
