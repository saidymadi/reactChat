import { Link } from 'react-router';
import React, { PropTypes , Component } from 'react';

/*
For this challenge I could have gotten away without using any routes (since they are not needed)
but I only added it as practice to touch on the router .
*/
export default class Header extends Component {


  render(){
     return (
      <header>
        <nav>
         <ul>
           <li>
             <Link to="/">Chat Client</Link>
           </li>
         </ul>
       </nav>
      </header>
    );
  }
}