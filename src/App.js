import React from 'react';
import {
  Route,
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
      <Route path='/generos/novo' exact component={NewGenre} />
      <Route path='/generos' exact component={Genres}/>
      <Route path='/' exact component={Home}/>
    </Router>
  );
}

export default App;
