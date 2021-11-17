import React, {useState} from 'react';
import api from '../api/data.js';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { Redirect } from 'react-router';

const QuestionAccordion = (props) => {
    const generatedOptions = [];
    const [redirect, setRedirect] = useState();

    const editAuthorHandler = async () => {
        const editedAuthor = {...props.author};
        editedAuthor['questions'].splice(props.id, 1);
        console.log(editedAuthor);
        const response = await api.put(`/authors/${editedAuthor.id}`, editedAuthor);
        
        setRedirect('/questions');
    };

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >   
                {props.result ? props.result == "correct" ?
                    <CheckIcon sx={{color: '#28a745', marginRight: '20px'}}/>
                    : <ClearIcon sx={{color: '#dc3545', marginRight: '20px'}}/> : ""
                }
                <Typography sx={{ width: '100%', textAlign: 'left', flexShrink: 0 }}>
                    {props.questionObj['question']}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{ width: '100%', textAlign: 'left', color: '#929292'}}>
                        উত্তর: {props.questionObj['answer']}
                    </Typography>
                    {!props.result ?
                    <Tooltip onClick={editAuthorHandler} title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> : ""
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default QuestionAccordion
