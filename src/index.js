import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import 'tachyons';
import tipOff from './Components/tipOff'

ReactDOM.render(
    <Router>
        <tipOff />
    </Router>
    , document.getElementById('root'));

