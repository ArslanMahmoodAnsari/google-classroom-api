import React from "react"
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main'
import Home from './components/Home'
import ListUser from './components/ListUser'
import './App.css';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Main} /> 
      <Route path='/home' exact component={Home} /> 
      <Route path='/ListUser' exact component={ListUser} /> 
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
