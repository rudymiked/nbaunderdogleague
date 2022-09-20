import React from 'react';
import './App.css';
import { AppNav } from './Components/Shared/AppNav';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Team } from './Pages/Team';
import { Standings } from './Pages/Standings';

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
          <AppNav />
          <main id="main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/standings" element={<Standings />} />
            </Routes>
          </main>
    </div>
  );
}

export default App;