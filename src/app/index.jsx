import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import createLogger from 'redux-logger';
import './components/bundle.scss';
import thunk from 'redux-thunk';
import promiseMiddleware from './components/common/middleware/promiseMiddleware';
import rootReducer from './components/common/reducers/index';

const logger = createLogger();


const store = createStore(rootReducer,applyMiddleware(logger , promiseMiddleware,thunk));
const rootElement = document.getElementById('app-container');


ReactDOM.render(
  <Provider store={store}>
    <Router	history={browserHistory}>
      <Route path="/" component={App} >
    
       
      </Route>
    </Router>
  </Provider>
  ,rootElement);
