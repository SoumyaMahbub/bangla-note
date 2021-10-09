import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import api from "../api/data.js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AuthorCard from "./AuthorCard";
import banglaLifespan from "../functions/banglaLifespan.js";

const Authors = () => {
    const [authors, setAuthors] = useState()
    const retrieveAuthors = async () => {
        const response = await api.get("/authors");
        return response.data;
    };  
    useEffect(() => {
        const getAllAuthors = async () => {
            const authors = await retrieveAuthors();
            if (authors) setAuthors(authors);
        }
        getAllAuthors();
    }, [])
    return (
        <Box>
            <Toolbar />
            <Grid sx={{width: '90%'}} m="50px auto" container spacing={2}>
                {authors ? authors.map((author) => {
                    const lifespan = banglaLifespan(author);
                    return <AuthorCard key={author['id']} authorState={author} authorId={author['id']} lifespan={lifespan} imageUrl={author['imageUrl']} authorName={author['name']} pseudonym={author['pseudonym'] ? author['pseudonym']: ""}/>
                }): ""}
            </Grid>
        </Box>
    );
};

export default Authors;
