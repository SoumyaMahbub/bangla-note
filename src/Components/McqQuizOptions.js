import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, LinearProgress, Toolbar } from '@mui/material';
import $ from 'jquery';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { Redirect } from "react-router";
import axios from 'axios';

const McqQuizOptions = () => {
    const [redirect, setRedirect] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedAuthorNames, setSelectedAuthorNames] = useState([]);
    
    const selectAllAuthors = (authors) => {
        authors.forEach(author => {
            setSelectedAuthorNames(prevState => [...prevState, author.name]);
        })
        setSelectedAuthors(authors);
    }

    useEffect(() => {
       axios.get("http://localhost:5000/authors")
        .then(res => setAuthors(res.data))
    }, [])

    const handleChange = (e) => {
        const authorName = $(e.target).parent().parent().attr('id');
        if (selectedAuthorNames.includes(authorName)) {
            const authorIdx = selectedAuthorNames.indexOf(authorName);
            setSelectedAuthorNames(prevState => [...prevState.slice(0, authorIdx), ...prevState.slice(authorIdx+1)]);
            setSelectedAuthors(prevState => [...prevState.slice(0, authorIdx), ...prevState.slice(authorIdx+1)]);
        } else {
            setSelectedAuthorNames(prevState => [...prevState, authorName]);
            setSelectedAuthors(prevState=> [...prevState, authors.find(author => author.name === authorName)]);
        }
    }
    if (redirect) {
        return <Redirect to={{pathname: redirect, state: selectedAuthors}} />;
    }

    return (
        <div>
            <Box sx={{mt: "20px"}}>
                {authors ? authors.map((author, idx) => {
                    return <FormControlLabel key={idx} id={author.name} label={author.name} control={<Checkbox checked={selectedAuthorNames.includes(author.name)} onChange={handleChange}/>} />
                }): ""}
            </Box>
            <ToggleButton
                value="uncheck"
                selected={selected}
                sx = {{mr: "20px"}}
                onChange={() => {
                    if (selected) {
                        setSelectedAuthorNames([]);
                        setSelectedAuthors([]);
                    } else {
                        selectAllAuthors(authors);
                    }
                    setSelected(!selected);
                }}
                >
                <CheckIcon />
            </ToggleButton>
            <Button variant = "contained" onClick={() => {
                if (selectedAuthors.length == 0) {
                    alert('অনুরোধ করে অন্তত একটি লেখক নির্বাচন করুন');
                } else {
                    setRedirect('/mcq-quiz')
                }
            }}>শুরু করুন</Button>
        </div>
    )
}

export default McqQuizOptions
