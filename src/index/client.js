// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

const store = null;

ReactDOM.hydrate(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    , document.querySelector('#root'));
