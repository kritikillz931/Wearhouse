import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Wearhouse } from './Wearhouse';



ReactDOM.render(
  <React.Fragment>
    <Router>
      <Wearhouse />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
