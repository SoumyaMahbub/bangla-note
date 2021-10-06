import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: `240px` }}>
                <Toolbar>
                    <Switch>
                        <Route path="/poets">
                            <Typography variant="h6" component="div">Poets</Typography>
                        </Route>
                        <Route path="/quiz">
                            <Typography variant="h6" component="div">Quiz</Typography>
                        </Route>
                        <Route path="/add-poet">
                            <Typography variant="h6" component="div">Add Poet</Typography>
                        </Route>
                    </Switch>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
