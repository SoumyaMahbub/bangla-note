import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import QuestionAccordion from "./QuestionAccordion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import $ from "jquery";
import { Redirect } from "react-router";
import banglaToEnglishNumber from "../functions/banglaToEnglishNumber.js";
import axios from "axios";

const AuthorQuestionsCard = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [redirect, setRedirect] = useState();
    const [questionObj, setQuestionObj] = useState({
        authorName: props.author["name"],
        question: "",
        answer: "",
        optionType: "",
    });
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    const editAuthorHandler = () => {
        console.log(questionObj);
        if (questionObj.question == "" || questionObj.answer == "" || questionObj.optionType == "") {
            alert("সকল ঘর পূর্ণ করতে হবে")
        } else {      
            const editedAuthor = { ...props.author };
            editedAuthor["questions"].push(questionObj);
            axios.put(
                `http://localhost:5000/authors/${editedAuthor["_id"]}`,
                editedAuthor
            );
            // const response = await api.get(`/options`);
            // const options = response.data;
            axios.get("http://localhost:5000/options").then((res) => {
                const options = res.data;
                const matchedOption = options.filter(
                    (option) =>
                        option.type === questionObj["optionType"] &&
                        option.option === questionObj["answer"]
                );
                if (!matchedOption.length) {
                    if (
                        banglaToEnglishNumber(questionObj["answer"]) &&
                        questionObj["answer"].length == 4
                    ) {
                        const optionObjOne = {
                            type: "year",
                            option: questionObj["answer"],
                        };
                        const optionObjTwo = {
                            type: "date",
                            option: questionObj["answer"],
                        };
                        axios.post(`http://localhost:5000/options`, optionObjOne);
                        axios.post(`http://localhost:5000/options`, optionObjTwo);
                    } else {
                        const optionObj = {
                            type: questionObj["optionType"],
                            option: questionObj["answer"],
                        };
                        axios.post(`http://localhost:5000/options`, optionObj);
                    }
                }
                setModalOpen(false);
                props.updateRefresher();
            });
        }
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    const textFieldChangeHandler = (e) => {
        const keyName = e.target.id.split("-")[0];
        setQuestionObj((prevState) => {
            if (e.target.value != "") {
                return { ...prevState, [keyName]: e.target.value };
            } else {
                delete prevState[keyName];
                return { ...prevState };
            }
        });
    };

    return (
        <Box>
            <Card sx={{ width: "100%", margin: "20px auto" }}>
                <CardContent sx={{width: "98%", margin: "0 auto"}}>
                    <Typography
                        gutterBottom
                        sx={{ textAlign: "left", margin: '20px 0px' }}
                        variant="h5"
                        component="div"
                    >
                        {props.author["name"]}
                    </Typography>
                    {props.author["questions"]
                        ? props.author["questions"].map((questionObj, idx) => {
                              return (
                                  <QuestionAccordion
                                      author={props.author}
                                      questionId={idx}
                                      key={idx}
                                      questionObj={questionObj}
                                      updateRefresher={props.updateRefresher}
                                  ></QuestionAccordion>
                              );
                          })
                        : ""}
                    <Box sx={{ marginTop: "20px", textAlign: "right" }}>
                        <Button onClick={handleOpen} variant="outlined">
                            Add question
                        </Button>
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
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {questionObj["authorName"]}
                    </Typography>
                    <Stack sx={{ margin: "20px auto" }} spacing={2}>
                        <TextField
                            onChange={textFieldChangeHandler}
                            value={questionObj["question"] || ''}
                            id="question-input"
                            label="প্রশ্ন"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            onChange={textFieldChangeHandler}
                            value={questionObj["answer"] || ''}
                            id="answer-input"
                            label="উত্তর"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            onChange={textFieldChangeHandler}
                            value={questionObj["optionType"] || ''}
                            id="optionType-input"
                            label="অপশনের ধরণ"
                            variant="outlined"
                            size="small"
                        />
                    </Stack>
                    <Button onClick={editAuthorHandler} variant="outlined">
                        Add question
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default AuthorQuestionsCard;
