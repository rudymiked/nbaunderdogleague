import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('App Loads', () => {
	render(<BrowserRouter><App /></BrowserRouter>);
}); 