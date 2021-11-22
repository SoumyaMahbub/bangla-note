import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Redirect, useParams } from 'react-router';
import api from "../api/data.js";
import banglaLifespan from '../functions/banglaLifespan.js';
import englishToBanglaNumber from '../functions/englishToBanglaNumber.js';
import { Link } from 'react-router-dom';
const Author = (props) => {
    const { id } = useParams();
    const [author, setAuthor] = useState();
    const [redirect, setRedirect] = useState(false);
    const retrieveAuthor = async () => {
        const response = await api.get(`/authors/${id}`);
        return response.data;
    }
    const deleteAuthorHandler = async() => {
        const response = await api.delete(`/authors/${id}`);
        setRedirect("/authors");
    }
    useEffect(() => {
        const getAuthor = async () => {
            const author = await retrieveAuthor();
            if (author) setAuthor(author);
        }
        getAuthor()
    }, [])

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    return (
        <Box>
            <Toolbar/>
            {author ? 
            <Box sx={{width: '95%', display: 'flex'}} m="20px auto" container>
                <Stack sx={{textAlign: 'center', width: "25%"}}>
                    <div style={{textAlign: 'left'}}>
                        <Link to="/authors">
                            <Button variant="outlined" startIcon={<ArrowBackIcon/>}>ফিরে যান</Button>
                        </Link>
                    </div>
                    <h1 style={{marginBottom: "0px"}}>{author['name']}</h1>
                    {
                        author['pseudonym'] ? <h1 style={{marginTop: "0px", marginBottom: "0px"}}>{ "(" + author['pseudonym'] + ")"}</h1> : ""
                    }
                    <Typography variant="p">{author['textbookWritings']}</Typography>
                    <div>
                        <img style={{maxWidth: '100%', maxHeight: '350px'}} src={author['imageUrl']}/>
                    </div>
                    <Typography sx={{marginBottom:'20px'}} variant="p">{banglaLifespan(author)}</Typography>
                    {author['birthPlace']?
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{marginLeft: '10px',fontWeight: 700}} variant="body2">জন্মস্থানঃ </Typography>
                        <Typography sx={{textAlign: "left"}} variant="body2">{author['birthPlace']}</Typography>
                    </Stack>:
                    ""}
                    {author['deathPlace']?
                    <Stack direction="row" spacing={1}>
                        <Typography sx={{marginLeft: '10px',fontWeight: 700}} variant="body2">মৃত্যুস্থানঃ </Typography>
                        <Typography sx={{textAlign: "left"}} variant="body2">{author['deathPlace']}</Typography>
                    </Stack>:
                    ""}
                </Stack>
                <Box style={{textAlign:'center',flexGrow: 1}}>
                    <div style={{textAlign:'right'}}>
                        <Link to={`/authors/${author['id']}/edit`}>
                            <Button variant="outlined" sx={{marginRight: "20px"}} startIcon={<EditIcon />}>পরিবর্তন করুন</Button>
                        </Link>
                        <Button onClick={deleteAuthorHandler} variant="outlined" color="error" startIcon={<DeleteIcon />}>মুছে দিন</Button>
                    </div>
                    {author['infos'] ?
                    <div style={{marginBottom: '40px'}}>
                        <Typography variant="h4">তথ্য</Typography> 
                        {author['infos'].map((info, index) => {
                            return (
                            <Stack direction="row">
                                <Typography sx={{marginRight: '10px',fontWeight: 700}} variant="h6">{englishToBanglaNumber((index+1).toString()) + "."}</Typography>
                                <Typography style={{textAlign:'left'}} variant="h6">{info}</Typography>
                            </Stack>
                            )
                        })}
                    </div>
                    : ""}
                    {author['educations'] ? 
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px"}} variant="h4">শিক্ষাসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ডিগ্রী</TableCell>
                                        <TableCell>বিষয়</TableCell>
                                        <TableCell>স্থান</TableCell>
                                        <TableCell>সাল</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['educations'].map((education) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{education['degree'] ? education['degree'] : "--------" }</TableCell>
                                                <TableCell>{education['topic'] ? education['topic'] : "--------" }</TableCell>
                                                <TableCell>{education['place'] ? education['place'] : "--------" }</TableCell>
                                                <TableCell>{education['year'] ? education['year'] : "--------" }</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : ""}
                    {author['jobs'] ? 
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px"}} variant="h4">কর্মসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>নাম</TableCell>
                                        <TableCell>স্থান</TableCell>
                                        <TableCell>সাল</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['jobs'].map((jobs) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{jobs['name'] ? jobs['name'] : "--------" }</TableCell>
                                                <TableCell>{jobs['place'] ? jobs['place'] : "--------" }</TableCell>
                                                <TableCell>{jobs['year'] ? jobs['year'] : "--------" }</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : ""}
                    {author['writings'] ? 
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px"}} variant="h4">লেখাসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>নাম</TableCell>
                                        <TableCell>ধরণ</TableCell>
                                        <TableCell>সাল</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['writings'].map((writing) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{writing['name'] ? writing['name'] : "--------" }</TableCell>
                                                <TableCell>{writing['type'] ? writing['type'] : "--------" }</TableCell>
                                                <TableCell>{writing['year'] ? writing['year'] : "--------" }</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : ""}
                    {author['awards'] ? 
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px"}} variant="h4">পদকসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>নাম</TableCell>
                                        <TableCell>সাল</TableCell>
                                        <TableCell>কারণ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['awards'].map((award) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{award['name'] ? award['name'] : "--------" }</TableCell>
                                                <TableCell>{award['year'] ? award['year'] : "--------" }</TableCell>
                                                <TableCell>{award['reason'] ? award['reason'] : "--------" }</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    : ""}
                </Box>
            </Box>:
            ""
            }
        </Box>
    )
}

export default Author
