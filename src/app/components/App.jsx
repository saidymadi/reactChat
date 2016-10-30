import React, { PropTypes, Component} from 'react';
import Header from './common/Header';
import Home from './home/Home';

export default class App extends Component {

	render(){
		return (
		    <div className="container-fluid main-container">
		      <Header />
		      <Home/>
		      {this.props.children}
		    </div>
  		);
	}
}




