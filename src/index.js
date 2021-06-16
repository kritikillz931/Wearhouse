import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Wearhouse } from './Wearhouse';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Wearhouse />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
