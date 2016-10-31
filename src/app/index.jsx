import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import createLogger from 'redux-logger';
import './components/bundle.scss';




///////////Reducers /////////////////////
//ideally this would have lived in its own dir
const messages = (state = [] , action) => {
	switch(action.type){
		case 'ADD_MESSAGE' :
		debugger;
			return [...state , action.message];
		break;
		

		default:
		return state;
		break;

	}

};
const users = (state = [] , action) => state; 
const selectedUserId = (state = null , action) => state; 


const reducers = combineReducers({messages , users , selectedUserId });
const logger = createLogger();
/////////////////////////////////////////////

const store = createStore(reducers,applyMiddleware(logger));
const rootElement = document.getElementById('app-container');


ReactDOM.render(
  <Provider store={store}>
    <Router	history={browserHistory}>
      <Route path="/" component={App} >
    
       
      </Route>
    </Router>
  </Provider>
  ,rootElement);
