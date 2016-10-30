import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';


import reducers from './reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);
const rootElement = document.getElementById('app-container');


ReactDOM.render(
  <Provider store={store}>
    <Router /*onUpdate={() => window.scrollTo(0, 0)}*/ history={browserHistory}>
      <Route path="/" component={App}>
    
       
      </Route>
    </Router>
  </Provider>
  ,rootElement);
