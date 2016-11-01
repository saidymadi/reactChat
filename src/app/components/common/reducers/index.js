import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import { ADD_MESSAGE , RECEIVED_MESSAGE , ADD_USER , RECEIVED_USER , SELECT_USER } from '../constants/ActionTypes';


// I also could have combined them all in one but I wanted to showcase the combine producers func
//default user (the chat will have at least 1 user)
const chatAdmin = {
	name : 'Lixar Chat Admin',
	id:'LixarAdmin-Unique-ID'};

/*const initialMsg = {user: chatAdmin ,
  msg : "welcome to the Lixar Chat Hope that you enjoy!",
  id : "welcome-msg-id" ,
  socketId : ""};*/

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
const users = (state = [chatAdmin] ,action) => {
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
const selectedUser = (state = chatAdmin , action) => {
	switch(action.type){
		case SELECT_USER :
			let user = action.user;
			return {...state , name : user.name , id : user.id };
		break;
		
		default:
		return state;
		break;

	}

};


const rootReducer = combineReducers({
	messages, 
	users , 
	selectedUser});

export default rootReducer;