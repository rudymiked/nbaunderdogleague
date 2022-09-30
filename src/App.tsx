import React from 'react';
import './App.css';
import { AppNav } from './Components/Shared/AppNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Teams } from './Pages/Teams';
import { GroupStandings } from './Pages/GroupStandings';
import { Draft } from './Pages/Draft';
import { Home } from './Pages/Home';
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
					<Route path="/" element={<Home />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/standings" element={<GroupStandings />} />
					<Route path="/draft" element={<Draft />} />
				</Routes>
				</main>
			</RootProvider>
		</BrowserRouter>
	</div>
	);
}

export default App;