import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Book from './Book';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <LandingPage />
          </Route>
          <Route path='/book'>
            <Book />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

