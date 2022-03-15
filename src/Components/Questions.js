import React, { useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import axios from "axios";
import AuthorQuestionsCard from './AuthorQuestionsCard';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const Questions = () => {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [authors, setAuthors] = useState();
    const [refresher, setRefresher] = useState(0);

    const updateRefresher = () => {
        setRefresher(refresher+1);
    }

    useEffect(() => {
        let counter = 0;
        axios.get("http://localhost:5000/authors")
        .then(res => {
            const authors = res.data;
            if (authors) {
                authors.forEach(author => {
                    counter += author['questions'].length;
                })
                setTotalQuestions(counter);
                setAuthors(authors);
            };
            setAuthors(res.data)
        })
    }, [refresher])
    return (
        <Box>
            {authors ? "" : <LinearProgress/>}
            <Box sx={{width:'95%'}} m="0 auto">
                {authors ? authors.map(author => {
                    return <AuthorQuestionsCard updateRefresher={updateRefresher} key={author['_id']} author={author}></AuthorQuestionsCard>
                }): ""}
                <Typography sx={{marginTop: "20px"}}>Total Questions: {totalQuestions}</Typography>
            </Box>
        </Box>
    )
}

export default Questions
