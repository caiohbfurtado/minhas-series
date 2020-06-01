import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import Home from './Pages/Home';
import Series from './Pages/Series';
import NewSerie from './Pages/NewSerie';
import InfoSerie from './Pages/InfoSerie';
import Genres from './Pages/Genres';
import NewGenre from './Pages/NewGenre';
import EditGenre from './Pages/EditGenre';

import Header from './Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/series' exact component={Series} />
        <Route path='/series/novo' exact component={NewSerie} />
        <Route path='/series/info/:id' exact component={InfoSerie} />
        <Route path='/series' exact component={Series} />
        <Route path='/generos/novo' exact component={NewGenre} />
        <Route path='/generos' exact component={Genres} />
        <Route path='/generos/editar/:id' exact component={EditGenre} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
