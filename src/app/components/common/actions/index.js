import * as types from '../constants/ActionTypes';


export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}


export function recieveMessage(message) {
  return {
    type: types.RECIEVE_MESSAGE,
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
    type: types.RECEIVE_USER,
    user
  };
}


export function selectUSer(user) {
  return {
    type: types.SELECT_USER,
    user
  };
}