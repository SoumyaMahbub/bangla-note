import React, {useState} from 'react';
import api from "../api/data.js";
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import QuestionAccordion from './QuestionAccordion';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import $ from 'jquery';
import { Redirect } from 'react-router';
import banglaToEnglishNumber from '../functions/banglaToEnglishNumber.js';

const AuthorQuestionsCard = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [redirect, setRedirect] = useState();
    const [questionObj, setQuestionObj] = useState({
        authorName: props.author['name']
    });
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    
    const editAuthorHandler = async () => {
        const editedAuthor = {...props.author};
        editedAuthor['questions'].push(questionObj);
        await api.put(`/authors/${editedAuthor.id}`, editedAuthor);
        const response = await api.get(`/options`);
        const options = response.data;
        const matchedOption = options.filter(option => option.type === questionObj['type'] && option.option === questionObj['answer']);
        if (!matchedOption.length) {
            if (banglaToEnglishNumber(questionObj['answer']) && questionObj['answer'].length == 4) {
                const optionObjOne = {
                    type: "year",
                    option: questionObj['answer'],
                }
                const optionObjTwo = {
                    type: "date",
                    option: questionObj['answer'],
                }
                await api.post(`/options`, optionObjOne);
                await api.post(`/options`, optionObjTwo);
            } else {
                const optionObj = {
                    type: questionObj['optionType'],
                    option: questionObj['answer']
                }
                await api.post(`/options`, optionObj);
            }
        }
        setRedirect('/questions');
    };

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    const textFieldChangeHandler = (e) => {
        const keyName = e.target.id.split("-")[0];
        setQuestionObj(prevState => {
            if (e.target.value != "") {
                return {...prevState, [keyName] : e.target.value};
            } else {
                delete prevState[keyName];
                return {...prevState};
            }
        });
    }

    const addQuestionHandler = () => {
        if ($('#question-input').val() === "" || $('#answer-input').val() === "" || $('#optionType-input').val() === "") {
            alert('all the fields must be filled');
        } else {

        }
    }

    return (
        <Box>
            <Card sx={{ width: '100%', margin:"20px auto" }}>
                <CardContent>
                    <Typography gutterBottom sx={{textAlign:'left'}} variant="h5" component="div">
                    {props.author['name']}
                    </Typography>
                    {props.author['questions'] ? props.author['questions'].map((questionObj, idx) => {
                        return <QuestionAccordion author={props.author} questionId={idx} key={idx} questionObj={questionObj}></QuestionAccordion>
                    }) : ""
                    }
                    <Box sx={{marginTop:'20px', textAlign: 'right'}}>
                        <Button onClick={handleOpen} variant="outlined">Add question</Button>
                    </Box>
                </CardContent>
            </Card>
            <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {questionObj['authorName']}
                    </Typography>
                    <Stack sx={{margin: '20px auto'}} spacing={2}>
                        <TextField onChange={textFieldChangeHandler} value={questionObj['question']} id="question-input" label="প্রশ্ন" variant="outlined" size="small" />
                        <TextField onChange={textFieldChangeHandler} value={questionObj['answer']} id="answer-input" label="উত্তর" variant="outlined" size="small" />
                        <TextField onChange={textFieldChangeHandler} value={questionObj['optionType']} id="optionType-input" label="অপশনের ধরণ" variant="outlined" size="small" />
                    </Stack>
                    <Button onClick={editAuthorHandler} variant="outlined">Add question</Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default AuthorQuestionsCard;
