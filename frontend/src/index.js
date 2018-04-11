import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.js';
import LogIn from './LogIn/LogIn.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LogIn/>, document.getElementById('root'));
registerServiceWorker();
