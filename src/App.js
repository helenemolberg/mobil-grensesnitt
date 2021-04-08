import React from "react";
import "./App.css";
import Opplastning from './components/pages/Upload';
import Kart from './components/pages/Map';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Opplastning} />
        <Route path='/kart' component={Kart} />
      </Switch>
    </Router>
  )
}

export default App;
