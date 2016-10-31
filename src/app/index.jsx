import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/home/Home';
import createLogger from 'redux-logger';
import './components/bundle.scss';

import { ADD_MESSAGE , RECEIVED_MESSAGE , ADD_USER , RECEIVED_USER , SELECT_USER } from './components/common/constants/ActionTypes';


///////////Reducers /////////////////////
//ideally this would have lived in its own dir
const messages = (state = [] , action) => {
	switch(action.type){
		case ADD_MESSAGE :
			return [...state , action.message];
		break;
		case RECEIVED_MESSAGE :
			return [...state , action.message];
		break;

		default:
		return state;
		break;

	}

};
const users = (state = [{name : 'Chat Admin', id:'LixarAdmin'}] ,action) => {
	switch(action.type){
		case ADD_USER :
			return [...state , action.user];
		break;
		case RECEIVED_USER :
			return [...state , action.user];
		break;
		

		default:
		return state;
		break;

	}

};
const selectedUserId = (state = 'LixarAdmin' , action) => {
	switch(action.type){
		case SELECT_USER :
			return [...state , action.userId];
		break;
		

		default:
		return state;
		break;

	}

};


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
