import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import App from './app';

import './bootstrap.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
