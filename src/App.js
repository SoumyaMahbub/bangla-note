import "./App.css";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Authors from "./Components/Authors";
import Quiz from "./Components/Quiz";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import CssBaseline from '@mui/material/CssBaseline';
import AuthorForm from './Components/AuthorForm';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Author from "./Components/Author";
import Questions from "./Components/Questions";
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import McqQuiz from "./Components/McqQuiz";
import McqQuizOptions from "./Components/McqQuizOptions";
import { Toolbar } from "@mui/material";
import { useState } from "react";


function App() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		}
	})
	const [authorsRefresher, setAuthorsRefresher] = useState(0);
	const [authorRefresher, setAuthorRefresher] = useState(0);
    return (
		<ThemeProvider theme={darkTheme}>
		<LocalizationProvider dateAdapter={DateAdapter}>
		<Router>
		<div className="App">
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>
				<SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
				<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
					<NavBar setMobileOpen={setMobileOpen}/>
					<Toolbar/>
					<Switch>
						<Route key="edit-author" path="/authors/:id/edit">
							<AuthorForm setAuthorRefresher={setAuthorRefresher}/>	
						</Route>
						<Route path="/authors/:id">
							<Author authorRefresher={authorRefresher} setAuthorsRefresher={setAuthorsRefresher}/>	
						</Route>
						<Route path="/authors">
							<Authors authorsRefresher={authorsRefresher}/>
						</Route>
						<Route path="/questions">
							<Questions />
						</Route>
						{/* <Route path="/quiz">
							<Quiz />
						</Route> */}
						<Route path="/mcq-quiz-options">
							<McqQuizOptions />
						</Route>
						<Route path="/mcq-quiz">
							<McqQuiz />
						</Route>
						<Route key="add-author" path="/add-author">
							<AuthorForm setAuthorsRefresher={setAuthorsRefresher}/>
						</Route>
					</Switch>
				</Box>
			</Box>
		</div>
		</Router>
		</LocalizationProvider>
		</ThemeProvider>
    );
}

export default App;
