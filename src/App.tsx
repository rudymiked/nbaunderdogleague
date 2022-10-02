import React from 'react';
import './App.css';
import { AppNav } from './Components/Shared/AppNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Teams } from './Pages/Teams';
import { GroupStandings } from './Pages/GroupStandings';
import { Draft } from './Pages/Draft';
import { Profile } from './Pages/Profile';
import { RootProvider } from './services/Stores/RootStore';

export interface IEntity {
	partitionKey: string;
	rowKey: string;
	timestamp: Date;
	eTag: any;
}

export const App: React.FunctionComponent = () => {
	return (
	<div className="App">
		<BrowserRouter>
			<RootProvider>
				<AppNav />
				<main id="main" tabIndex={-1}>
				<Routes>
					<Route path="/" element={<GroupStandings />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/standings" element={<GroupStandings />} />
					<Route path="/draft" element={<Draft />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
				</main>
			</RootProvider>
		</BrowserRouter>
	</div>
	);
}

export default App;