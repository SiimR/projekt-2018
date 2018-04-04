import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.js';
import Main from './Main/Main';
import registerServiceWorker from './registerServiceWorker';
import CreateQuiz from './CreateQuiz/CreateQuiz.js'
//import Survey from 'survey-react';

ReactDOM.render(<CreateQuiz />, document.getElementById('root'));
registerServiceWorker();
