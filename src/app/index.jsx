import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import createLogger from 'redux-logger';
import './components/bundle.scss';
import rootReducer from './components/common/reducers/index';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
const rootElement = document.getElementById('app-container');

ReactDOM.render(
  <Provider store={store}>
    <Router	history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , rootElement);
