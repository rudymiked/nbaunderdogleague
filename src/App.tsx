import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RootProvider } from './services/Stores/RootStore';
import { AppAuthWrapper } from './AppAuthWrapper';

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
					<AppAuthWrapper />
				</RootProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;