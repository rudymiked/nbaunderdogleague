import React from 'react';
import './App.css';
import { AppNav } from './Components/Shared/AppNav';
import { Route, Routes } from 'react-router-dom';
import { Teams } from './Pages/Teams';
import { GroupStandings } from './Pages/GroupStandings';
import { Draft } from './Pages/Draft';
import { Home } from './Pages/Home';

export const App: React.FunctionComponent = () => {
	return (
	<div className="App">
		{/* <Header /> */}
		<AppNav />
		<main id="main" tabIndex={-1}>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/teams" element={<Teams />} />
			<Route path="/standings" element={<GroupStandings />} />
			<Route path="/draft" element={<Draft />} />
		</Routes>
		</main>
	</div>
	);
}

export default App;