import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import $ from "jquery";

const editJsonFile = require("edit-json-file");

const PoetForm = () => {
    const [educationCounter, setEducationCounter] = useState(0);
    const [writingsCounter, setWritingsCounter] = useState(0);
    const [awardsCounter, setAwardsCounter] = useState(0);
    const [infoCounter, setInfoCounter] = useState(0);

    const addToPoets = () => {
        const poetJson = {};
        poetJson["নাম"] = $("#name-input").val();
        if ($("#birth-day-input").val() != "") {
            poetJson["জন্মদিন"] = $("#birth-day-input").val();
        }
        if ($("#birth-month-input").val() != "") {
            poetJson["জন্মমাস"] = $("#birth-month-input").val();
        }
        poetJson["জন্মসাল"] = $("#birth-year-input").val();
        if ($("#birth-place-input").val() != "") {
            poetJson["জন্মস্থান"] = $("#birth-place-input").val();
        }
        if ($("#death-day-input").val() != "") {
            poetJson["মৃত্যুদিন"] = $("#death-day-input").val();
        }
        if ($("#death-month-input").val() != "") {
            poetJson["মৃত্যুমাস"] = $("#death-month-input").val();
        }
        if ($("#death-year-input").val() != "") {
            poetJson["মৃত্যুসাল"] = $("#death-year-input").val();
        }
        if ($("#death-place-input").val() != "") {
            poetJson["মৃত্যুস্থান"] = $("#death-place-input").val();
        }
        if ($("#pseudonym-input").val() != "") {
            poetJson["ছদ্মনাম"] = $("#pseudonym-input").val();
        }
        if ($(".education-input-group").length) {
            poetJson["শিক্ষা"] = [];
            const educationInputGroups = $(".education-input-group");
            for (var i = 0; i < educationInputGroups.length; i++) {
                const educationJson = {};
                const rootTextFields = educationInputGroups.eq(i).children();
                for (var j = 0; j < rootTextFields.length; j++) {
                    const text_input = rootTextFields
                        .eq(j)
                        .children()
                        .eq(1)
                        .children().eq(0);
                    if (text_input.val() != "") {
                        if (j == 0) {
                            educationJson["ডিগ্রি"] = text_input.val();
                        } else if (j == 1) {
                            educationJson["স্থান"] = text_input.val();
                        } else {
                            educationJson['সাল'] = text_input.val();
                        }
                    }
                }
                poetJson["শিক্ষা"].push(educationJson);
            }
        }
        if ($(".writing-input-group").length) {
            poetJson["লেখা"] = [];
            const writingInputGroups = $(".writing-input-group");
            for (var i = 0; i < writingInputGroups.length; i++) {
                const writingJson = {};
                const rootTextFields = writingInputGroups.eq(i).children();
                for (var j = 0; j < rootTextFields.length; j++) {
                    const text_input = rootTextFields
                        .eq(j)
                        .children()
                        .eq(1)
                        .children().eq(0);
                    if (text_input.val() != "") {
                        if (j == 0) {
                            writingJson["নাম"] = text_input.val();
                        } else if (j == 1) {
                            writingJson["ধরণ"] = text_input.val();
                        } else {
                            writingJson['সাল'] = text_input.val();
                        }
                    }
                }
                poetJson["লেখা"].push(writingJson);
            }
        }
        if ($(".award-input-group").length) {
            poetJson["পদক"] = [];
            const awardInputGroups = $(".award-input-group");
            for (var i = 0; i < awardInputGroups.length; i++) {
                const awardJson = {};
                const rootTextFields = awardInputGroups.eq(i).children();
                for (var j = 0; j < rootTextFields.length; j++) {
                    const text_input = rootTextFields
                        .eq(j)
                        .children()
                        .eq(1)
                        .children().eq(0);
                    if (text_input.val() != "") {
                        if (j == 0) {
                            awardJson["নাম"] = text_input.val();
                        } else if (j == 1) {
                            awardJson["সাল"] = text_input.val();
                        } else {
                            awardJson['কারণ'] = text_input.val();
                        }
                    }
                }
                poetJson["পদক"].push(awardJson);
            }
        }
        if ($(".info-input").length) {
            poetJson["তথ্য"] = [];
            const infoInputs = $(".info-input");
            for (var i = 0; i < infoInputs.length; i++) {
                poetJson['তথ্য'].push(infoInputs.eq(i).children().eq(0).children().eq(0).val());
            }
        }
        const file = editJsonFile('poets.json');
        const poets = file.read();
        console.log(poets);
    };

    const verify = () => {
        if (
            $("#name-input").val() == "" ||
            $("#birth-year-input").val() == ""
        ) {
            alert("নাম এবং জন্মসাল ফাঁকা থাকা যাবে না");
        } else {
            addToPoets();
        }
    };

    return (
        <Box sx={{ width: "75%" }} m="50px auto">
            <Toolbar />
            <Stack spacing={3}>
                <TextField
                    id="name-input"
                    label="নাম"
                    variant="outlined"
                    size="small"
                />
                <Stack direction="row" spacing={3}>
                    <TextField
                        id="birth-day-input"
                        label="দিন"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="birth-month-input"
                        label="মাস"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="birth-year-input"
                        label="সাল"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="birth-place-input"
                        label="জন্মস্থান"
                        variant="outlined"
                        size="small"
                    />
                </Stack>
                <Stack direction="row" spacing={3}>
                    <TextField
                        id="death-day-input"
                        label="দিন"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="death-month-input"
                        label="মাস"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="death-year-input"
                        label="সাল"
                        type="number"
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        id="death-place-input"
                        label="মৃত্যুস্থান"
                        variant="outlined"
                        size="small"
                    />
                </Stack>
                <TextField
                    id="pseudonym-input"
                    label="ছদ্মনাম"
                    variant="outlined"
                    size="small"
                />
                {Array.from(Array(educationCounter), (e, i) => {
                    return (
                        <Stack
                            key={i}
                            className="education-input-group"
                            direction="row"
                            spacing={2}
                        >
                            <TextField
                                label="ডিগ্রি"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="স্থান"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="সাল"
                                variant="outlined"
                                type="number"
                                size="small"
                            />
                        </Stack>
                    );
                })}
                <Button
                    onClick={() =>
                        setEducationCounter((prevState) => prevState + 1)
                    }
                    variant="contained"
                >
                    শিক্ষা যোগ করুন
                </Button>
                {Array.from(Array(writingsCounter), (e, i) => {
                    return (
                        <Stack
                            key={i}
                            className="writing-input-group"
                            direction="row"
                            spacing={2}
                        >
                            <TextField
                                label="নাম"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="ধরণ"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="সাল"
                                variant="outlined"
                                type="number"
                                size="small"
                            />
                        </Stack>
                    );
                })}
                <Button
                    onClick={() =>
                        setWritingsCounter((prevState) => prevState + 1)
                    }
                    variant="contained"
                >
                    লেখা যোগ করুন
                </Button>
                {Array.from(Array(awardsCounter), (e, i) => {
                    return (
                        <Stack
                            key={i}
                            className="award-input-group"
                            direction="row"
                            spacing={2}
                        >
                            <TextField
                                label="নাম"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                label="সাল"
                                variant="outlined"
                                type="number"
                                size="small"
                            />
                            <TextField
                                label="কারণ"
                                variant="outlined"
                                size="small"
                            />
                        </Stack>
                    );
                })}
                <Button
                    onClick={() =>
                        setAwardsCounter((prevState) => prevState + 1)
                    }
                    variant="contained"
                >
                    পদক যোগ করুন
                </Button>
                {Array.from(Array(infoCounter), (e, i) => {
                    return (
                        <TextField
                            key={i}
                            className="info-input"
                            variant="outlined"
                            size="small"
                        />
                    );
                })}
                <Button
                    onClick={() => setInfoCounter((prevState) => prevState + 1)}
                    variant="contained"
                >
                    তথ্য যোগ করুন
                </Button>
                <Button
                    onClick={verify}
                    sx={{ width: "12%" }}
                    variant="outlined"
                    color="success"
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
};

export default PoetForm;
