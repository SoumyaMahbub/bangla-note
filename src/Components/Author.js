import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import banglaLifespan from '../functions/banglaLifespan.js';
import englishToBanglaNumber from '../functions/englishToBanglaNumber.js';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
const Author = (props) => {
    const { id } = useParams();
    const [author, setAuthor] = useState();
    const [redirect, setRedirect] = useState(false);
    const deleteAuthorHandler = () => {
        axios.delete("http://localhost:5000/authors/" + id)
        .then(() => {
            props.setAuthorsRefresher(prev => prev+1);
            setRedirect("/authors")
        });
    }
    useEffect(() => {
        axios.get("http://localhost:5000/authors/" + id)
            .then(res => {
                setAuthor(res.data);
            })
    }, [props.authorRefresher])

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    if (!author) {
        return <LinearProgress/>
    } 

    return (
        <Box sx={{width: {sm:'95%', xs:'85%'}, m:"20px auto"}}>
            <Box sx={{textAlign:{sm:'left', xs: 'center{sm:'}, display:{sm:'flex'}}}>
                <Link to="/authors">
                    <Button sx={{display:{xs:'none',sm:'inline-flex'}}} variant="outlined" startIcon={<ArrowBackIcon />}>ফিরে যান </Button>
                </Link>
                <Box sx={{ml: 'auto'}}>
                    <Link to={`/authors/${author['_id']}/edit`}>
                        <Button variant="outlined" sx={{marginRight: "20px"}} startIcon={<EditIcon />}>পরিবর্তন করুন</Button>
                    </Link>
                    <Button onClick={deleteAuthorHandler} variant="outlined" color="error" startIcon={<DeleteIcon />}>মুছে দিন</Button>
                </Box>
            </Box>
            <Box sx={{display: {sm:'flex'}}} mt="20px" container>
                <Card sx={{ maxWidth: {sm: '345px'}, mb:{xs:'20px'}, mx:{xs:'auto'}}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {author['name']}
                        </Typography>
                        <img style={{maxWidth:'95%', maxHeight:'400px'}} src={author['imageUrl']}/>
                        <TableContainer>
                            <Table sx={{width:'100%', margin:'0'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{textAlign:'center'}}>{banglaLifespan(author)}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['pseudonym'] != "" ? 
                                        <TableRow>
                                            <TableCell sx={{textAlign:'left'}}>অন্য নামঃ</TableCell>
                                            <TableCell sx={{textAlign:'left'}}>{author['pseudonym']}</TableCell>
                                        </TableRow>
                                    :""}
                                    {author['birthPlace'] != ""? 
                                        <TableRow>
                                            <TableCell sx={{textAlign:'left'}}>জন্মস্থানঃ</TableCell>
                                            <TableCell sx={{textAlign:'left'}}>{author['birthPlace']}</TableCell>
                                        </TableRow>
                                    :""}
                                    {author['deathPlace'] != ""? 
                                        <TableRow>
                                            <TableCell sx={{textAlign:'left'}}>মৃত্যুস্থানঃ</TableCell>
                                            <TableCell sx={{textAlign:'left'}}>{author['deathPlace']}</TableCell>
                                        </TableRow>
                                    :""}
                                    {author['fatherName'] != ""? 
                                        <TableRow>
                                            <TableCell sx={{textAlign:'left'}}>পিতার নামঃ</TableCell>
                                            <TableCell sx={{textAlign:'left'}}>{author['fatherName']}</TableCell>
                                        </TableRow>
                                    :""}
                                    {author['motherName'] != ""? 
                                        <TableRow>
                                            <TableCell sx={{textAlign:'left'}}>মাতার নামঃ</TableCell>
                                            <TableCell sx={{textAlign:'left'}}>{author['motherName']}</TableCell>
                                        </TableRow>
                                    :""}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Box sx={{textAlign:'center',marginLeft:{sm:"20px",xs:"none"},flexGrow: 1}}>
                    {/* <div style={{textAlign:'right'}}>
                        <Link to={`/authors/${author['_id']}/edit`}>
                            <Button variant="outlined" sx={{marginRight: "20px"}} startIcon={<EditIcon />}>পরিবর্তন করুন</Button>
                        </Link>
                        <Button onClick={deleteAuthorHandler} variant="outlined" color="error" startIcon={<DeleteIcon />}>মুছে দিন</Button>
                    </div> */}
                    {author['infos'].length > 0 ?
                    <div style={{marginBottom: '40px'}}>
                        <Typography variant="h4" sx={{marginBottom: '20px', textAlign: 'left'}}>তথ্য</Typography> 
                        {author['infos'].map((info, idx) => {
                            return (
                            <Stack key={idx} direction="row">
                                <Typography sx={{marginRight: '10px',fontWeight: 700}} variant="p">{englishToBanglaNumber((idx+1).toString()) + "."}</Typography>
                                <Typography style={{textAlign:'left'}} variant="p">{info}</Typography>
                            </Stack>
                            )
                        })}
                    </div>
                    : ""}
                    {author['educations'].length > 0 ? 
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px", textAlign: 'left'}} variant="h4">শিক্ষাসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ডিগ্রী</TableCell>
                                        <TableCell>বিষয়</TableCell>
                                        <TableCell>স্থান, প্রতিষ্ঠানের নাম</TableCell>
                                        <TableCell>সাল</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['educations'].map((education, idx) => {
                                        return (
                                            <TableRow key={idx}>
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
                    {author['jobs'].length > 0 ?
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px", textAlign: 'left'}} variant="h4">কর্মসমূহ</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>নাম</TableCell>
                                        <TableCell>স্থান, প্রতিষ্ঠানের নাম</TableCell>
                                        <TableCell>সাল</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {author['jobs'].map((jobs, idx) => {
                                        return (
                                            <TableRow key={idx}>
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
                    {author['writings'].length > 0 ?
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px", textAlign: 'left'}} variant="h4">লেখাসমূহ</Typography>
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
                                    {author['writings'].map((writing, idx) => {
                                        return (
                                            <TableRow key={idx}>
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
                    {author['awards'].length > 0 ?
                    <div style={{marginBottom: '40px'}}>
                        <Typography sx={{marginBottom: "20px", textAlign: 'left'}} variant="h4">পদকসমূহ</Typography>
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
                                    {author['awards'].map((award, idx) => {
                                        return (
                                            <TableRow key={idx}>
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
            </Box>
        </Box>
    )
}

export default Author
