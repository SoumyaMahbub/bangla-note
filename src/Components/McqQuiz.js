import React, {useEffect, useState} from "react";

import { Card, Modal, Toolbar } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Radio } from "@mui/material";
import { Box } from "@mui/material";
import shuffleArray from "../functions/shuffleArray.js";
import QuestionAccordion from "./QuestionAccordion.js";
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';
import axios from "axios";

const McqQuiz = () => {
    const [radioDisabled, setRadioDisabled] = React.useState(false);
    const [marksCounter, setMarksCounter] = useState(0);
    const [authors, setAuthors] = useState(true);
    const [questionCounter, setQuestionCounter] = useState(0);
    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [questionObj, setQuestionObj] = useState({});
    const [result, setResult] = useState();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [questionsHistory, setQuestionsHistory] = useState([]);
    const [optionValue, setOptionValue] = useState("");

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    
    const location = useLocation();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        maxHeight: '95vh',
        bgcolor: 'background.paper',
        overflowY: 'scroll',
        boxShadow: 24,
        p: 4,
    };

    const retrieveAuthorsAndOptions = (authors) => {
        let tempQuestions = [];
        authors.forEach(authorObj => {
            tempQuestions = [...tempQuestions, ...authorObj['questions']];
            setQuestions(prevState => [...prevState, ...authorObj['questions']]);
        });
        const question = tempQuestions[Math.floor(Math.random()*tempQuestions.length)];
        axios.get("http://localhost:5000/options")
            .then(response => {
                const options = response.data;
                setOptions(options);
                question['options'] = [];
                let matchedOptions = [];
                let correctAnswer;
                if (Array.isArray(question['answer'])) {
                    const correctAnswers = [...question['answer']];
                    const answeridx = Math.floor(Math.random()*correctAnswers.length);
                    correctAnswer = correctAnswers[answeridx];
                    matchedOptions = options.filter(optionObj => optionObj.type == question.optionType && !correctAnswers.includes(optionObj.option));
                } else {
                    correctAnswer = question['answer'];
                    matchedOptions = options.filter(optionObj => optionObj.type == question.optionType && optionObj.option !== question['answer']);
                }
                if (matchedOptions.length > 5) {
                    matchedOptions = matchedOptions.slice(0, 5);
                }
                matchedOptions.push({
                    "type": question.optionType, 
                    "option": correctAnswer
                });
                shuffleArray(matchedOptions);
                matchedOptions.forEach(optionObj => {
                    question['options'].push(optionObj['option']);
                })
                setQuestionObj({...question, "answer": correctAnswer});
            })
    };  
    const verifyAnswer = (e) => {
        setRadioDisabled(true);
        setOptionValue(e.target.value);
        setQuestionCounter(prevState => prevState + 1);
        if(e.target.value == questionObj['answer']) {
            setResult("correct");
            setMarksCounter(prevState => prevState + 1);
        } else {
            setResult("incorrect");
        }
    }

    const resetQuestion = () => {
        setRadioDisabled(false);
        setOptionValue("");
        const question = questions[Math.floor(Math.random()*questions.length)];
        question['options'] = [];
        let matchedOptions = [];
        let correctAnswer;
        if (Array.isArray(question['answer'])) {
            const correctAnswers = [...question['answer']];
            const answeridx = Math.floor(Math.random()*correctAnswers.length);
            correctAnswer = correctAnswers[answeridx];
            matchedOptions = options.filter(optionObj => optionObj.type == question.optionType && !correctAnswers.includes(optionObj.option));
        } else {
            correctAnswer = question['answer'];
            matchedOptions = options.filter(optionObj => optionObj.type == question.optionType && optionObj.option !== question['answer']);
        }
        if (matchedOptions.length > 5) {
            matchedOptions = matchedOptions.slice(0, 5);
        }
        matchedOptions.push({
            "type": question.optionType, 
            "option": correctAnswer
        });
        shuffleArray(matchedOptions);
        matchedOptions.forEach(optionObj => {
            question['options'].push(optionObj['option']);
        })
        const answeredQuestionObj = {...questionObj, result: result};
        setQuestionObj({...question, "answer": correctAnswer});
        setQuestionsHistory(prevState => [...prevState, answeredQuestionObj]);
        setResult();
    }

    useEffect(() => {
        console.log(location); 
        const authors = location.state;
        setAuthors(authors);
        if (!authors) {
            return
        }
        retrieveAuthorsAndOptions(authors);
    }, []);

    if (!authors) {
        return <Redirect to='/mcq-quiz-options'/>
    }
    return (
        <Box>
            <Card variant="outlined" sx={{ width: "70%", margin: "50px auto 20px auto"}}>
                <CardContent sx={{width:"90%", margin: "10px auto 0px auto"}}>
                    <Typography variant="h6" sx={{textAlign:'left', marginBottom: "20px"}} component="div">
                        {questionObj['question']}
                    </Typography>
                    <RadioGroup
                        name="options-group"
                        value = {optionValue}
                        onChange={verifyAnswer}
                    >
                        {
                            questionObj ?
                            questionObj['options'] ?
                            questionObj['options'].map(option => {
                                return <FormControlLabel disabled={radioDisabled} value={option}control={<Radio />} label={option}/>
                            }) : "" : ""
                        }
                    </RadioGroup>
                    {
                        result ?
                            result == "correct" ?
                                <Typography sx={{color: "#28a745"}}>আপনার উত্তর সঠিক ছিলো।</Typography>
                            : <Typography sx={{color: "#dc3545"}}>আপনার উত্তর ভুল ছিলো। সঠিক উত্তর ছিলো {questionObj['answer']}</Typography>
                        : ""
                    }
                </CardContent>
                <CardActions>
                    {result ? <Button onClick={resetQuestion} sx={{marginLeft: 'auto'}} variant="outlined" size="large">Next</Button> : ""}
                </CardActions>
            </Card>
            <Box>
                <Typography sx={{marginBottom: '10px'}} variant="h3">{marksCounter + "/" + questionCounter}</Typography>
                {questionsHistory.length > 0 ? <Button variant="outlined" onClick={handleOpen}>View History</Button> : ""}
            </Box>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {questionsHistory.map(questionObj => {
                        return <QuestionAccordion questionObj={questionObj} result={questionObj['result']}/>
                    })}
                </Box>
            </Modal>
        </Box>
    );
};

export default McqQuiz;
