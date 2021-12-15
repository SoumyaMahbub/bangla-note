import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import api from "../api/data.js";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Toolbar } from '@mui/material';
import $ from 'jquery';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { Link } from 'react-router-dom';

const McqQuizOptions = () => {
    const [selected, setSelected] = React.useState(true);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedAuthorNames, setSelectedAuthorNames] = useState([]);
    const retrieveAuthors = async () => {
        const response = await api.get("/authors");
        return response.data;
    }    
    
    const selectAllAuthors = (authors) => {
        authors.forEach(author => {
            setSelectedAuthorNames(prevState => [...prevState, author.name]);
        })
        setSelectedAuthors(authors);
    }

    useEffect(() => {
        const getAllAuthors = async () => {
            const authors = await retrieveAuthors();
            if (authors) { 
                selectAllAuthors(authors);
                setAuthors(authors) 
            };
        }   
        getAllAuthors();
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

    return (
        <div>
            <Box>
                <Toolbar />
                {authors ? authors.map((author) => {
                    return <FormControlLabel id={author.name} label={author.name} control={<Checkbox checked={selectedAuthorNames.includes(author.name)} onChange={handleChange}/>} />
                }): ""}
            </Box>
            <ToggleButton
                value="check"
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
            <Link to={{
                 pathname: "/mcq-quiz",
                 authors: selectedAuthors
            }}>
                <Button variant="contained">Start Quiz</Button>
            </Link>       
        </div>
    )
}

export default McqQuizOptions
