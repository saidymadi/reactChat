import React, { PropTypes, Component} from 'react';
import Header from './common/Header';
import Home from './home/Home';
import { connect } from 'react-redux';
import * as actions from './common/actions/index';
import io from 'socket.io-client';
//const socket = io.connect();

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users : [],
			selectedUserId : null
		};

		this.props.dispatch(actions.addMessage("Hello NE"));
	}
	render(){
		return (
		    <div className="container-fluid main-container">
		      <Header />
		      <Home  /*socket={socket}*//>
		      {this.props.children}
		    </div>
  		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);



