import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from './pages/Callback';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
