import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import Home from './Pages/Home';
import Genres from './Pages/Genres';
import NewGenre from './Pages/NewGenre';

import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/generos/novo' exact>
          <NewGenre />
        </Route>
        <Route path='/generos' exact>
          <Genres />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
