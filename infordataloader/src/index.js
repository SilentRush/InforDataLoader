import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MemoryRouter  } from 'react-router'

ReactDOM.render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>, document.getElementById('root'));
registerServiceWorker();
