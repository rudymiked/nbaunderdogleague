import React from 'react';
import './App.css';
import { AppNav } from './Components/Shared/AppNav';
import { Route, Routes } from 'react-router-dom';
import { Teams } from './Pages/Teams';
import { LeagueStandings } from './Pages/LeagueStandings';
import { Draft } from './Pages/Draft';

export const App: React.FunctionComponent = () => {
	return (
	<div className="App">
		{/* <Header /> */}
		<AppNav />
		<main id="main" tabIndex={-1}>
		<Routes>
			<Route path="/" element={<LeagueStandings />} />
			<Route path="/teams" element={<Teams />} />
			<Route path="/standings" element={<LeagueStandings />} />
			<Route path="/draft" element={<Draft />} />
		</Routes>
		</main>
	</div>
	);
}

export default App;