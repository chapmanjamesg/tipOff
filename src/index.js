import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import 'tachyons';
import TipOff from './Components/TipOff'

ReactDOM.render(
    <Router>
        <TipOff />
    </Router>
    , document.getElementById('root'));

