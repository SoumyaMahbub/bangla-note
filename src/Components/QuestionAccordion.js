import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const QuestionAccordion = (props) => {
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
                    {props.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography sx={{ width: '100%', textAlign: 'left', color: '#929292'}}>
                    উত্তর: {props.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default QuestionAccordion
