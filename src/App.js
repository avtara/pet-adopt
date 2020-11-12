import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
//import ThemeContext from './ThemeContext';
import NavBar from './NavBar';
import { Provider } from 'react-redux';
import store from './store';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <NavBar />
          <Suspense fallback={<h1>loading routes</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="details/:id" />
            </Router>
          </Suspense>
        </div>
      </Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
