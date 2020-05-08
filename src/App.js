import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import Home from './components/home/home.component';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" component={Home} />
          </Switch>
      </Router>
   </div>
  );
}

export default App;
