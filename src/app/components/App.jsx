import React, { PropTypes, Component} from 'react';
import Header from './common/Header';
import Home from './home/Home';
import { connect } from 'react-redux';

import io from 'socket.io-client';
const socket = io.connect();

export default class App extends Component {

	constructor(props) {
		super(props);
		
	}
	render(){
		return (
		    <div className="container-fluid main-container">
		      <Header />
		      <Home {...this.props} socket={socket}/>
		      {this.props.children}
		    </div>
  		);
	}
}




