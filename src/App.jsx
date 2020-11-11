import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Home/>
        <About/>
      </Switch>
      
    </div>
  );
}

export default App;
