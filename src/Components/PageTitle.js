import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const PageTitle = (props) => {
    const { id } = props.match.params;
    const [pageTitle, setPageTitle] = useState();
    useEffect(()=> {
        axios.get(`http://localhost:5000/authors/${id}`)
            .then(res => setPageTitle(res.data.name))
    },[])
    return (
        <Typography variant="h6" component="div">{props.location.pathname.endsWith('edit') ? pageTitle + " পরিবর্তন" : pageTitle}</Typography>
    )
}

export default PageTitle
