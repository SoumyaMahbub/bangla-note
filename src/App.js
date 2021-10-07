import "./App.css";
import Box from '@mui/material/Box';
import Authors from "./Components/Authors";
import Quiz from "./Components/Quiz";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import CssBaseline from '@mui/material/CssBaseline';
import PoetForm from './Components/PoetForm';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";

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
						<Route path="/authors">
							<Authors />
						</Route>
						<Route path="/quiz">
							<Quiz />
						</Route>
						<Route path="/add-poet">
							<PoetForm />
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
