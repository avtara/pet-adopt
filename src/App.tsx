import React, { useState, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  const ThemeHook = useState('darkblue');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={ThemeHook}>
        <div>
          <NavBar />
          <Suspense fallback={<h1>loading routes</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
