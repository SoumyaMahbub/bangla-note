import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageTitle from './PageTitle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";

const NavBar = ({setMobileOpen}) => {
    return (
        <div>
            <AppBar position="fixed" sx={{ width: {sm:`calc(100% - 240px)`}, ml: { sm: `240px` }}}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={()=>setMobileOpen(true)}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'left'}}>
                        <Switch>
                            <Route path="/authors/:id" render={(props) => <PageTitle {...props}></PageTitle>}>
                            </Route>
                            <Route path="/authors/:id/edit" render={(props) => <PageTitle {...props}></PageTitle>}>
                            </Route>
                            <Route path="/authors">
                                <Typography variant="h6" component="div">লেখকসমূহ</Typography>
                            </Route>
                            <Route path="/questions">
                                <Typography variant="h6" component="div">প্রশ্নসমূহ</Typography>
                            </Route>
                            <Route path="/quiz">
                                <Typography variant="h6" component="div">কুইজ</Typography>
                            </Route>
                            <Route path="/mcq-quiz">
                                <Typography variant="h6" component="div">এম.সি.কিউ. কুইজ</Typography>
                            </Route>
                            <Route path="/add-author">
                                <Typography variant="h6" component="div">নতুন লেখক</Typography>
                            </Route>
                        </Switch>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
