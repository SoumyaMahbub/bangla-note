import React, { useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import api from "../api/data.js";
import AuthorQuestionsCard from './AuthorQuestionsCard';
import Typography from '@mui/material/Typography';

const Questions = () => {
    const [totalQuestions, setTotalQuestion] = useState(false);
    const [authors, setAuthors] = useState();
    const retrieveAuthors = async () => {
        const response = await api.get("/authors");
        return response.data;
    };  
    useEffect(() => {
        const getAllAuthors = async () => {
            const authors = await retrieveAuthors();
            if (authors) {
                let counter = 0;
                authors.forEach(author => {
                    counter += author['questions'].length;
                })
                setTotalQuestion(counter);
                setAuthors(authors);
            };
        }
        getAllAuthors();
    }, [])
    return (
        <Box sx={{width: "95%"}} m="30px auto">
            <Toolbar/>
            {authors ? authors.map(author => {
                return <AuthorQuestionsCard key={author.id} authorName={author['name']} authorQuestions={author['questions']}></AuthorQuestionsCard>
            }): ""}
            <Typography sx={{marginTop: "20px"}}>Total Questions: {totalQuestions}</Typography>
        </Box>
    )
}

export default Questions
