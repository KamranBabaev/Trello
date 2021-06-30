import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {AppWithReducers} from "./AppWithReducers";

ReactDOM.render(<AppWithReducers/>, document.getElementById('root'));

reportWebVitals();
