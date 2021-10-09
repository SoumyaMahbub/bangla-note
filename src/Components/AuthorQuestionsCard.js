import React from 'react'
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import QuestionAccordion from './QuestionAccordion';

const AuthorQuestionsCard = (props) => {
    return (
        <Card sx={{ width: '100%', margin:"auto" }}>
            <CardContent>
                <Typography gutterBottom sx={{textAlign:'left'}} variant="h5" component="div">
                {props.authorName}
                </Typography>
                {props.authorQuestions ? props.authorQuestions.map((questionObj, idx) => {
                    return <QuestionAccordion key={idx} question={questionObj['question']} answer={questionObj['answer']}></QuestionAccordion>
                }) : ""
                }   
            </CardContent>
        </Card>
    )
}

export default AuthorQuestionsCard
