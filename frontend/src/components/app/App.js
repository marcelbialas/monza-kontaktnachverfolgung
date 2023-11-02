import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './../../layout/Theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import ScrollToTop from './../utils/ScrollToTop';

import Intro from '../../pages/Intro';
import Rules from '../../pages/Rules';
import Form from '../../pages/Form';
import Finish from '../../pages/Finish';

function App() {
	const [user, setUser] = React.useState({});
	const getUserSkill = (obj) => {
		setUser(obj);
	};
	const getUserData = (obj) => {
		setUser({ ...user, formData: obj });
	};

	return (
		<Router>
			<ScrollToTop />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className='App'>
					<Switch>
						<Route exact path='/rules' render={(props) => <Rules {...props} isSkilledUser={user.returningVisitor} />} />
						<Route exact path='/personalInfo' render={(props) => <Form {...props} user={user} getUserData={getUserData} />} />
						<Route exact path='/finish' render={(props) => <Finish {...props} user={user} />} />
						<Route exact path='/' render={(props) => <Intro {...props} getUserSkill={getUserSkill} user={user} />} />
					</Switch>
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
