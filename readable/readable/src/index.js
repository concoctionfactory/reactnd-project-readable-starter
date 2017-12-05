import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route  } from 'react-router-dom'

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux'


const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )

    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
        <Route path="/:category?/:post_id?"  component={App} />
        </Router>
    </Provider>, document.getElementById('root'));
    registerServiceWorker();

