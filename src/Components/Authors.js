import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AuthorCard from "./AuthorCard";
import banglaLifespan from "../functions/banglaLifespan.js";

const Authors = () => {
    const [authors, setAuthors] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/authors')
            .then(res => {
                setAuthors(res.data);
            })
    }, [])
    return (
        <Box>
            {authors ? "" : <LinearProgress/>}
            <Grid sx={{width: '90%'}} m="50px auto" container spacing={2}>
                {authors ? authors.map((author) => {
                    const lifespan = banglaLifespan(author);
                    return <AuthorCard key={author['_id']} authorState={author} authorId={author['_id']} lifespan={lifespan} imageUrl={author['imageUrl']} authorName={author['name']} pseudonym={author['pseudonym'] ? author['pseudonym']: ""}/>
                }): ""}
            </Grid>
        </Box>
    );
};

export default Authors;
