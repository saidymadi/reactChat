import React, { PropTypes, Component} from 'react';
import Header from './common/Header';
import Home from './home/Home';
import { connect } from 'react-redux';

import io from 'socket.io-client';


const socket = io.connect();

class App extends Component {

	constructor(props) {
		super(props);
		

	}

	render(){
		return (
		    <div className="container-fluid main-container">
		      <Header />
		      <Home  {...this.props} socket={socket}/>
		      {this.props.children}
		    </div>
  		);
	}
}



App.propTypes = {
  messages: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state){
  return {  messages: state.messages,
  			users : state.users,
 	 		selectedUserId: state.selectedUserId
		};
}

export default connect(mapStateToProps)(App);



