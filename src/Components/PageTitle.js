import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import api from "../api/data";

const PageTitle = (props) => {
    const { id } = props.match.params;
    const [pageTitle, setPageTitle] = useState();
    useEffect(()=> {
        const retrieveAuthor = async() => {
            const response = await api.get(`/authors/${id}`);
            setPageTitle(response.data.name);
        }
        retrieveAuthor();
    },[])
    return (
        <Typography variant="h6" component="div">{props.location.pathname.endsWith('edit') ? pageTitle + " পরিবর্তন" : pageTitle}</Typography>
    )
}

export default PageTitle
