import React from 'react';
import{Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './page/homepage/homepage.component';

const HatsPage = () => (
  <h1>Hats Page</h1>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route component={HatsPage} path='/hats' />
      </Switch>
    </div>
  );
}

export default App;
