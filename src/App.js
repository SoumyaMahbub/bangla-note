import "./App.css";
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


function App() {
    return (
		<LocalizationProvider dateAdapter={DateAdapter}>
		<Router>
		<div className="App">
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>
				<SideBar/>
				<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
					<NavBar/>
					<Switch>
						<Route key="edit-author" path="/authors/:id/edit">
							<AuthorForm />	
						</Route>
						<Route path="/authors/:id">
							<Author />	
						</Route>
						<Route path="/authors">
							<Authors />
						</Route>
						<Route path="/questions">
							<Questions />
						</Route>
						<Route path="/quiz">
							<Quiz />
						</Route>
						<Route path="/mcq-quiz">
							<McqQuiz />
						</Route>
						<Route key="add-author" path="/add-author">
							<AuthorForm />
						</Route>
					</Switch>
				</Box>
			</Box>
		</div>
		</Router>
		</LocalizationProvider>
    );
}

export default App;
