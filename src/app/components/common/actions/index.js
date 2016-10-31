import * as types from '../constants/ActionTypes';


export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}


export function recieveMessage(message) {
  return {
    type: types.RECIEVED_MESSAGE,
    message
  };
}



export function addUser(user) {
  return {
    type: types.ADD_USER,
    user
  };
}


export function loadUser(user) {
  return {
    type: types.RECEIVED_USER,
    user
  };
}


export function selectUser(user) {
  return {
    type: types.SELECT_USER,
    user
  };
}