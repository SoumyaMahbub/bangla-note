import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import englishToBanglaNumber from "../functions/englishToBanglaNumber";
import banglaToEnglishNumber from "../functions/banglaToEnglishNumber";
import api from "../api/data";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import $ from "jquery";
import { useHistory, Link } from "react-router-dom";
import { useParams, Redirect } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import numberToBanglaMonth from "../functions/numberToBanglaMonth";

const AuthorForm = () => {
    const history = useHistory();
    const generatedQuestions = [];
    const generatedOptions = [];
    const { id } = useParams();
    const [author, setAuthor] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [educationsCounter, setEducationsCounter] = useState(0);
    const [jobsCounter, setJobsCounter] = useState(0);
    const [writingsCounter, setWritingsCounter] = useState(0);
    const [options, setOptions] = useState();
    const [awardsCounter, setAwardsCounter] = useState(0);
    const [infosCounter, setInfosCounter] = useState(0);

    const addAuthorHandler = async (author) => {
        console.log(author);
        const response = await api.post("/authors", author);
        setRedirect("/authors");
    };
    const addOptionHandler = async (option) => {
        const response = await api.post("/options", option);
    };
    const editAuthorHandler = async (author) => {
        const response = await api.put(`/authors/${author.id}`, author);
        setRedirect(`/authors/${author.id}`);
    };

    const retrieveAuthor = async () => {
        const response = await api.get(`/authors/${id}`);
        return response.data;
    };
    const retrieveAllOptions = async () => {
        const response = await api.get(`/options`);
        return response.data;
    };
    const getAllOptions = async () => {
        const options = await retrieveAllOptions();
        if (options) setOptions(options);
    };
    useEffect(() => {
        if (id) {
            const getAuthor = async () => {
                const author = await retrieveAuthor();
                if (author) {
                    if (author["educations"]) {
                        setEducationsCounter(author["educations"].length);
                    }
                    if (author["writings"]) {
                        setWritingsCounter(author["writings"].length);
                    }
                    if (author["awards"]) {
                        setAwardsCounter(author["awards"].length);
                    }
                    if (author["infos"]) {
                        setInfosCounter(author["infos"].length);
                    }
                    if (author["jobs"]) {
                        setJobsCounter(author["jobs"].length);
                    }
                    setAuthor(author);
                }
            };
            getAuthor();
        }
        getAllOptions();
    }, []);

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    const makeQuestion = (authorName, question, answer, optionType) => {
        let questionObj;
        questionObj = {
            authorName: authorName,
            question: question,
            answer: answer,
            optionType: optionType,
        };
        generatedQuestions.push(questionObj);
        if (Array.isArray(questionObj['answer'])) {
            questionObj['answer'].forEach(answer => {
                const matchedOption = generatedOptions.filter(optionObj => optionObj.type == questionObj['optionType'] && optionObj.option == answer);
                if (matchedOption.length == 0) {
                    if (banglaToEnglishNumber(answer) && answer.length == 4) {
                        const optionObjOne = {
                            type: "year",
                            option: answer,
                        }
                        const optionObjTwo = {
                            type: "date",
                            option: answer,
                        }
                        generatedOptions.push(optionObjOne, optionObjTwo);
                    } else {
                        const optionObj = {
                            type: questionObj['optionType'],
                            option: answer,
                        }
                        generatedOptions.push(optionObj);
                    }
                }
            })
        } else {
            const matchedOption = generatedOptions.filter(optionObj => optionObj.type == questionObj['optionType'] && optionObj.option == questionObj['answer']);
            if (matchedOption.length == 0) {
                if (banglaToEnglishNumber(questionObj['answer']) && questionObj['answer'].length == 4) {
                    const optionObjOne = {
                        type: "year",
                        option: questionObj['answer'],
                    }
                    const optionObjTwo = {
                        type: "date",
                        option: questionObj['answer'],
                    }
                    generatedOptions.push(optionObjOne, optionObjTwo);
                } else {
                    const optionObj = {
                        type: questionObj['optionType'],
                        option: questionObj['answer'],
                    }
                    generatedOptions.push(optionObj);
                }
            }
        }
    };

    if(typeof(String.prototype.trim) === "undefined")
    {
        String.prototype.trim = function() 
        {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }

    const makeQuestions = () => {
        makeQuestion(
            author["name"],
            author["name"] + " কবে জন্মগ্রহণ করেন?",
            author["birthDay"]
                ? author["birthDay"] +
                      " " +
                      numberToBanglaMonth(author["birthMonth"]) +
                      " " +
                      author["birthYear"]
                : author["birthMonth"]
                ? numberToBanglaMonth(author["birthMonth"]) +
                  " " +
                  author["birthYear"]
                : author["birthYear"],
            "date"
        );
        author['textbookWritings'].split(",").forEach(writing => {
            writing = $.trim(writing);
            makeQuestion(
                author['name'],
                "`" + writing + "` কার লেখা?",
                author['name'],
                'name'
            )
        })
        if (author["birthPlace"]) {
            makeQuestion(
                author["name"],
                author["name"] + " কোথায় জন্মগ্রহণ করেন?",
                author["birthPlace"],
                "place"
            );
        }
        if (author["deathYear"]) {
            makeQuestion(
                author["name"],
                author["name"] + " কবে মৃত্যুবরণ করেন?",
                author["deathDay"]
                    ? author["deathDay"] +
                          " " +
                          numberToBanglaMonth(author["deathMonth"]) +
                          " " +
                          author["deathYear"]
                    : author["deathMonth"]
                    ? numberToBanglaMonth(author["deathMonth"]) +
                      " " +
                      author["deathYear"]
                    : author["deathYear"],
                "date"
            );
        }
        if (author["deathPlace"]) {
            makeQuestion(
                author["name"],
                author["name"] + " কোথায় মৃত্যুবরণ করেন?",
                author["deathPlace"],
                "place"
            );
        }
        if (author["pseudonym"]) {
            makeQuestion(
                author["name"],
                author["name"] + " এর ছদ্মনাম কি?",
                author["pseudonym"],
                "pseudonym"
            );
        }
        if (author["educations"]) {
            author["educations"].forEach((education) => {
                if (education["degree"] && education["topic"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                            " কোন বিষয়ে " +
                            education["degree"] +
                            " পাশ করেন?",
                        education["topic"],
                        "educationTopic"
                    );
                }
                if (education["place"] && education["topic"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                            " " +
                            education["place"] +
                            " হতে কোন বিষয়ে পাশ করেন?",
                        education["topic"],
                        "educationTopic"
                    );
                }
                if (education["degree"] && education["place"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                            " কোন স্থান হতে " +
                            education["degree"] +
                            " পাশ করেন?",
                        education["place"],
                        "place"
                    );
                }
                if (education["degree"] && education["year"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                        " " +
                        education["year"] +
                        " সালে কোন ডিগ্রী লাভ করেন?",
                        education["degree"],
                        "degree"
                    )
                    makeQuestion(
                        author["name"],
                        author["name"] +
                        " কোন সালে " +
                        education["degree"] +
                        " পাশ করেন?",
                        education["year"],
                        "year"
                    )
                }
                if (education["place"] && education["year"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                        " " +
                        education["year"] +
                        " সালে কোন স্থান হতে পাশ করেন?",
                        education["place"],
                        "place"
                    )
                    makeQuestion(
                        author["name"],
                        author["name"] +
                        " কোন সালে " +
                        education["place"] +
                        " হতে পাশ করেন?",
                        education["year"],
                        "year"
                    )
                }
            });
        }
        if (author['jobs']) {
            const firstJob = author['jobs'][0]['name'];
            let sameJob = true;
            author['jobs'].forEach((job) => {
                if (job['name'] && job['name'] != firstJob) {
                    sameJob = false;
                }
                if (job['name'] && job['place']) {
                    makeQuestion(
                        author['name'],
                        author['name'] + " " + job['place'] + " এ কোন পেশায় নিয়জিত ছিলেন?",
                        job['name'],
                        "jobName"
                    )
                }
            })
            if (sameJob) {
                makeQuestion(
                    author['name'],
                    author['name'] + " কোন পেশায় নিয়জিত ছিলেন?",
                    firstJob,
                    "jobName"
                )
            }
        }
        if (author["writings"]) {
            const writingnames = [];
            author['writings'].forEach((writing, idx) => {
                writingnames[idx] = writing['name']
            })
            makeQuestion(
                author['name'],
                "নিচের কোনটি " + author['name'] + " এর লেখা?",
                writingnames,
                "writingName"
            )
            author["writings"].forEach((writing) => {
                makeQuestion(
                    author['name'],
                    "`" + writing["name"] + "` কার লেখা?",
                    author["name"],
                    "name"
                )
                if (writing["type"]) {
                    makeQuestion(
                        author['name'],
                        "`" + writing["name"] + "` কোন ধরণের লেখা?",
                        writing["type"],
                        "writingType"
                    )
                }
                if (writing["year"]) {
                    makeQuestion(
                        author['name'],
                        "`" + writing["name"] + "`" + " কত সালে লেখা হয়?",
                        writing["year"],
                        "year"
                    )
                }
            });
        }
        if (author["awards"]) {
            author["awards"].forEach((award) => {
                if (award["reason"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                        " কিসের জন্য `" +
                        award["name"] +
                        "` পান?",
                        award["reason"],
                        "reason"
                    )
                }
                if (award["year"]) {
                    makeQuestion(
                        author["name"],
                        author["name"] +
                            " কতসালে `" +
                            award["name"] +
                            "` পান?",
                        award["year"],
                        "year"
                    )
                }
            });
        }
        generatedOptions.forEach((generatedOptionObj) => {
            const matchedOption = options.filter(optionObj => optionObj['type'] == generatedOptionObj['type'] && optionObj['option'] == generatedOptionObj['option']);
            if (matchedOption.length == 0) {
                addOptionHandler(generatedOptionObj);
            }
        })
        return generatedQuestions;
    };
    const cutAuthor = () => {
        let modifiedAuthor = {...author}
        if(modifiedAuthor['educations']) {
            if (Object.keys(modifiedAuthor['educations'][0]).length === 0) {
                delete modifiedAuthor['educations']
            } else {
                modifiedAuthor['educations'].forEach((education, idx) => {
                    if(Object.keys(education).length === 0) {
                        modifiedAuthor['educations'].splice(idx, 1)
                    }
                })
            }
        } 
        if (modifiedAuthor['jobs']) {
            if (Object.keys(modifiedAuthor['jobs'][0]).length === 0) {
                delete modifiedAuthor['jobs']
            } else {
                modifiedAuthor['jobs'].forEach((job, idx) => {
                    if(Object.keys(job).length === 0) {
                        modifiedAuthor['jobs'].splice(idx, 1)
                    }
                })
            }
        }
        if (modifiedAuthor['writings']) {
            if (Object.keys(modifiedAuthor['writings'][0]).length === 0) {
                delete modifiedAuthor['writings']
            } else {
                modifiedAuthor['writings'].forEach((writing, idx) => {
                    if(Object.keys(writing).length === 0) {
                        modifiedAuthor['writings'].splice(idx, 1)
                    }
                })
            }
        }
        if (modifiedAuthor['awards']) {
            if (Object.keys(modifiedAuthor['awards'][0]).length === 0) {
                delete modifiedAuthor['awards']
            } else {
                modifiedAuthor['awards'].forEach((award, idx) => {
                    if(Object.keys(award).length === 0) {
                        modifiedAuthor['awards'].splice(idx, 1)
                    }
                })
            }
        }
        if (modifiedAuthor['infos']) {
            if (Object.keys(modifiedAuthor['infos'][0]).length === 0) {
                delete modifiedAuthor['infos']
            } else {
                modifiedAuthor['infos'].forEach((info, idx) => {
                    if(info == "") {
                        modifiedAuthor['infos'].splice(idx, 1)
                    }
                })
            }
        }
        return modifiedAuthor;
    }

    const submitHandler = () => {
        if (
            $("#name-input").val() == "" ||
            $("#birth-year-input").val() == "" ||
            $("#textbook-writings-input").val() == ""
        ) {
            alert("নাম, জন্মসাল বা পাঠ্যপুস্তক রচিত লেখা ফাঁকা থাকা যাবে না");
        } else {
            if (!author.imageUrl) {
                author.imageUrl =
                    "https://alok-mishra.net/wp-content/uploads/2015/11/Know-the-poet-in-you-become-a-poet.jpg";
            }
            const modifiedAuthor = cutAuthor();
            if (id) {
                editAuthorHandler({ ...modifiedAuthor, questions: makeQuestions() });
            } else {
                addAuthorHandler({ ...modifiedAuthor, questions: makeQuestions() });
            }
        }
    };

    const updateObjectedListsOfAuthor = (idx, listName, key, value) => {
        setAuthor((prevState) => {
            if (value != "") {
                return {
                    ...prevState,
                    [listName]: [
                        ...prevState[listName].slice(0, idx),
                        {
                            ...prevState[listName][idx],
                            [key]: value,
                        },
                        ...prevState[listName].slice(idx + 1),
                    ],
                };
            } else {
                delete prevState[listName][idx][key];
                console.log(Object.keys(prevState[listName][idx]).length);
                if (Object.keys(prevState[listName][idx]).length == 0) {
                    delete prevState[listName];
                }
                return { ...prevState };
            }
        });
    };

    const updateKeyValuesOfAuthor = (key, value) => {
        setAuthor((prevState) => {
            if (value != "") {
                return {
                    ...prevState,
                    [key]: value,
                };
            } else {
                delete prevState[key];
                return { ...prevState };
            }
        });
    };

    const textFieldChangeHandler = (e) => {
        if (
            e.target.id == "name-input" ||
            e.target.id == "image-url-input" ||
            e.target.id == "birth-day-input" ||
            e.target.id == "birth-month-input" ||
            e.target.id == "birth-year-input" ||
            e.target.id == "birth-place-input" ||
            e.target.id == "death-day-input" ||
            e.target.id == "death-month-input" ||
            e.target.id == "death-year-input" ||
            e.target.id == "death-place-input" ||
            e.target.id == "textbook-writings-input" ||
            e.target.id == "pseudonym-input"
        ) {
            const splittedId = e.target.id.split("-");
            let keyName;
            let value = e.target.value;
            if (
                e.target.id == "name-input" ||
                e.target.id == "pseudonym-input"
            ) {
                keyName = splittedId[0];
            } else {
                keyName =
                    splittedId[0] +
                    splittedId[1].charAt(0).toUpperCase() +
                    splittedId[1].slice(1);
            }
            if (!isNaN(e.target.value)) {
                value = englishToBanglaNumber(e.target.value);
            }
            updateKeyValuesOfAuthor(keyName, value);
        } else if (
            e.target.id.startsWith("education-degree") ||
            e.target.id.startsWith("education-topic") ||
            e.target.id.startsWith("education-year") ||
            e.target.id.startsWith("education-place") ||
            e.target.id.startsWith("job-name") ||
            e.target.id.startsWith("job-place") ||
            e.target.id.startsWith("job-year") ||
            e.target.id.startsWith("writing-name") ||
            e.target.id.startsWith("writing-type") ||
            e.target.id.startsWith("writing-year") ||
            e.target.id.startsWith("award-name") ||
            e.target.id.startsWith("award-year") ||
            e.target.id.startsWith("award-reason")
        ) {
            const idx = e.target.id.split("-")[2].replace("input", "");
            const splittedId = e.target.id.split("-");
            if (!isNaN(e.target.value)) {
                updateObjectedListsOfAuthor(
                    parseInt(idx),
                    splittedId[0] + "s",
                    splittedId[1],
                    englishToBanglaNumber(e.target.value)
                );
            } else {
                updateObjectedListsOfAuthor(
                    parseInt(idx),
                    splittedId[0] + "s",
                    splittedId[1],
                    e.target.value
                );
            }
        } else if (e.target.id.startsWith("info")) {
            const idx = e.target.id.slice(-1);
            setAuthor((prevState) => {
                return {
                    ...prevState,
                    'infos': [
                        ...prevState['infos'].slice(0,idx),
                        e.target.value,
                        ...prevState['infos'].slice(parseInt(idx) + 1)
                    ]
                }
            });
        }
    };

    return (
        <Box sx={{ width: "95%" }} m="auto">
            <Toolbar />
            {id ? (
                <div style={{ textAlign: "left", marginTop: "20px" }}>
                    <Link to={`/authors/${id}`}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant="outlined"
                        >
                            ফিরে যান
                        </Button>
                    </Link>
                </div>
            ) : (
                ""
            )}
            <Box sx={{ width: "75%" }} m="30px auto">
                <Stack spacing={3}>
                    <TextField
                        id="name-input"
                        label="নাম"
                        variant="outlined"
                        size="small"
                        onChange={textFieldChangeHandler}
                        value={
                            author ? (author["name"] ? author["name"] : "") : ""
                        }
                    />
                    <TextField
                        id="image-url-input"
                        label="ছবির লিংক"
                        variant="outlined"
                        size="small"
                        onChange={textFieldChangeHandler}
                        value={
                            author
                                ? author["imageUrl"]
                                    ?author['imageUrl'] != "https://alok-mishra.net/wp-content/uploads/2015/11/Know-the-poet-in-you-become-a-poet.jpg"
                                        ? author["imageUrl"]
                                        : ""
                                    : ""
                                : ""
                        }
                    />
                    <Stack direction="row" spacing={3}>
                        <TextField
                            id="birth-day-input"
                            label="দিন"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["birthDay"]
                                        ? banglaToEnglishNumber(
                                              author["birthDay"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="birth-month-input"
                            label="মাস"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["birthMonth"]
                                        ? banglaToEnglishNumber(
                                              author["birthMonth"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="birth-year-input"
                            label="সাল"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["birthYear"]
                                        ? banglaToEnglishNumber(
                                              author["birthYear"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="birth-place-input"
                            label="জন্মস্থান"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["birthPlace"]
                                        ? author["birthPlace"]
                                        : ""
                                    : ""
                            }
                        />
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <TextField
                            id="death-day-input"
                            label="দিন"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["deathDay"]
                                        ? banglaToEnglishNumber(
                                              author["deathDay"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="death-month-input"
                            label="মাস"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["deathMonth"]
                                        ? banglaToEnglishNumber(
                                              author["deathMonth"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="death-year-input"
                            label="সাল"
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["deathYear"]
                                        ? banglaToEnglishNumber(
                                              author["deathYear"]
                                          )
                                        : ""
                                    : ""
                            }
                        />
                        <TextField
                            id="death-place-input"
                            label="মৃত্যুস্থান"
                            variant="outlined"
                            size="small"
                            onChange={textFieldChangeHandler}
                            value={
                                author
                                    ? author["deathPlace"]
                                        ? author["deathPlace"]
                                        : ""
                                    : ""
                            }
                        />
                    </Stack>
                    <TextField
                        id="textbook-writings-input"
                        label="পাঠ্যপুস্তকে রচিত লেখা "
                        variant="outlined"
                        size="small"
                        onChange={textFieldChangeHandler}
                        value={
                            author
                                ? author["textbookWritings"]
                                    ? author["textbookWritings"]
                                    : ""
                                : ""
                        }
                    />
                    <TextField
                        id="pseudonym-input"
                        label="ছদ্মনাম"
                        variant="outlined"
                        size="small"
                        onChange={textFieldChangeHandler}
                        value={
                            author
                                ? author["pseudonym"]
                                    ? author["pseudonym"]
                                    : ""
                                : ""
                        }
                    />
                    {Array.from(Array(educationsCounter), (e, i) => {
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
                                    onChange={textFieldChangeHandler}
                                    id={`education-degree-input${i}`}
                                    value={
                                        author
                                            ? author["educations"]
                                                ? author["educations"][i]
                                                    ? author["educations"][i][
                                                          "degree"
                                                      ]
                                                        ? author["educations"][
                                                              i
                                                          ]["degree"]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="বিষয়"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`education-topic-input${i}`}
                                    value={
                                        author
                                            ? author["educations"]
                                                ? author["educations"][i]
                                                    ? author["educations"][i][
                                                          "topic"
                                                      ]
                                                        ? author["educations"][
                                                              i
                                                          ]["topic"]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="স্থান, প্রতিষ্ঠানের নাম"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`education-place-input${i}`}
                                    value={
                                        author
                                            ? author["educations"]
                                                ? author["educations"][i]
                                                    ? author["educations"][i][
                                                          "place"
                                                      ]
                                                        ? author["educations"][
                                                              i
                                                          ]["place"]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="সাল"
                                    variant="outlined"
                                    type="number"
                                    id={`education-year-input${i}`}
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    value={
                                        author
                                            ? author["educations"]
                                                ? author["educations"][i]
                                                    ? author["educations"][i][
                                                          "year"
                                                      ]
                                                        ? banglaToEnglishNumber(
                                                              author[
                                                                  "educations"
                                                              ][i]["year"]
                                                          )
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                            </Stack>
                        );
                    })}
                    <Button
                        onClick={() => {
                            setAuthor(prevState => {
                                if (prevState["educations"]) {
                                    return {
                                        ...prevState,
                                        educations: [...prevState["educations"], {}]       
                                    }
                                }else {
                                    return {
                                        ...prevState,
                                        educations: [{}]
                                    }
                                }
                            })
                            setEducationsCounter((prevState) => prevState + 1)
                            }
                        }
                        variant="contained"
                    >
                        শিক্ষা যোগ করুন
                    </Button>
                    {Array.from(Array(jobsCounter), (e, i) => {
                        return (
                            <Stack
                                key={i}
                                className="job-input-group"
                                direction="row"
                                spacing={2}
                            >
                                <TextField
                                    label="নাম"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`job-name-input${i}`}
                                    value={
                                        author
                                            ? author["jobs"]
                                                ? author["jobs"][i]
                                                    ? author["jobs"][i][
                                                          "name"
                                                      ]
                                                        ? author["jobs"][
                                                              i
                                                          ]["name"]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="স্থান, প্রতিষ্ঠানের নাম"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`job-place-input${i}`}
                                    value={
                                        author
                                            ? author["jobs"]
                                                ? author["jobs"][i]
                                                    ? author["jobs"][i][
                                                          "place"
                                                      ]
                                                        ? author["jobs"][
                                                              i
                                                          ]["place"]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="সাল"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`job-year-input${i}`}
                                    value={
                                        author
                                            ? author["jobs"]
                                                ? author["jobs"][i]
                                                    ? author["jobs"][i][
                                                          "year"
                                                      ]
                                                        ? banglaToEnglishNumber(
                                                            author["jobs"][
                                                              i
                                                          ]["year"]
                                                        )
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                            </Stack>
                        );
                    })}
                    <Button
                        onClick={() =>{
                            setAuthor(prevState => {
                                if (prevState["jobs"]) {
                                    return {
                                        ...prevState,
                                        jobs: [...prevState["jobs"], {}]       
                                    }
                                }else {
                                    return {
                                        ...prevState,
                                        jobs: [{}]
                                    }
                                }
                            })
                            setJobsCounter((prevState) => prevState + 1)
                        }}
                        variant="contained"
                    >
                        কর্ম যোগ করুন
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
                                    onChange={textFieldChangeHandler}
                                    id={`writing-name-input${i}`}
                                    value={
                                        author
                                            ? author["writings"]
                                                ? author["writings"][i]
                                                    ? author["writings"][i][
                                                          "name"
                                                      ]
                                                        ? author["writings"][i][
                                                              "name"
                                                          ]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="ধরণ"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`writing-type-input${i}`}
                                    value={
                                        author
                                            ? author["writings"]
                                                ? author["writings"][i]
                                                    ? author["writings"][i][
                                                          "type"
                                                      ]
                                                        ? author["writings"][i][
                                                              "type"
                                                          ]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="সাল"
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`writing-year-input${i}`}
                                    value={
                                        author
                                            ? author["writings"]
                                                ? author["writings"][i]
                                                    ? author["writings"][i][
                                                          "year"
                                                      ]
                                                        ? banglaToEnglishNumber(author["writings"][i][
                                                              "year"
                                                          ])
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                            </Stack>
                        );
                    })}
                    <Button
                        onClick={() => {
                            setAuthor(prevState => {
                                if (prevState["writings"]) {
                                    return {
                                        ...prevState,
                                        writings: [...prevState["writings"], {}]       
                                    }
                                }else {
                                    return {
                                        ...prevState,
                                        writings: [{}]
                                    }
                                }
                            })
                            setWritingsCounter((prevState) => prevState + 1)
                        }}
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
                                    onChange={textFieldChangeHandler}
                                    id={`award-name-input${i}`}
                                    value={
                                        author
                                            ? author["awards"]
                                                ? author["awards"][i]
                                                    ? author["awards"][i][
                                                          "name"
                                                      ]
                                                        ? author["awards"][i][
                                                              "name"
                                                          ]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="সাল"
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`award-year-input${i}`}
                                    value={
                                        author
                                            ? author["awards"]
                                                ? author["awards"][i]
                                                    ? author["awards"][i][
                                                          "year"
                                                      ]
                                                        ? banglaToEnglishNumber(
                                                              author["awards"][
                                                                  i
                                                              ]["year"]
                                                          )
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                                <TextField
                                    label="কারণ"
                                    variant="outlined"
                                    size="small"
                                    onChange={textFieldChangeHandler}
                                    id={`award-reason-input${i}`}
                                    value={
                                        author
                                            ? author["awards"]
                                                ? author["awards"][i]
                                                    ? author["awards"][i][
                                                          "reason"
                                                      ]
                                                        ? author["awards"][i][
                                                              "reason"
                                                          ]
                                                        : ""
                                                    : ""
                                                : ""
                                            : ""
                                    }
                                />
                            </Stack>
                        );
                    })}
                    <Button
                        onClick={() => {
                            setAuthor(prevState => {
                                if (prevState["awards"]) {
                                    return {
                                        ...prevState,
                                        awards: [...prevState["awards"], {}]       
                                    }
                                }else {
                                    return {
                                        ...prevState,
                                        awards: [{}]
                                    }
                                }
                            })
                            setAwardsCounter((prevState) => prevState + 1)
                        }}
                        variant="contained"
                    >
                        পদক যোগ করুন
                    </Button>
                    {Array.from(Array(infosCounter), (e, i) => {
                        return (
                            <TextField
                                key={i}
                                variant="outlined"
                                size="small"
                                onChange={textFieldChangeHandler}
                                id={`info-input${i}`}
                                value={
                                    author
                                        ? author["infos"]
                                            ? author["infos"][i]
                                                ? author["infos"][i]
                                                : ""
                                            : ""
                                        : ""
                                }
                            />
                        );
                    })}
                    <Button
                        onClick={() => {
                            setAuthor(prevState => {
                                if (prevState["infos"]) {
                                    return {
                                        ...prevState,
                                        infos: [...prevState["infos"], ""]       
                                    }
                                }else {
                                    return {
                                        ...prevState,
                                        infos: [""]
                                    }
                                }
                            })
                            setInfosCounter((prevState) => prevState + 1)
                        }}
                        variant="contained"
                    >
                        তথ্য যোগ করুন
                    </Button>
                    <Button
                        onClick={submitHandler}
                        sx={{ width: "12%" }}
                        variant="outlined"
                        color="success"
                    >
                        জমা করুন
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default AuthorForm;
