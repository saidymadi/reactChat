import React from 'react';
import { Link } from 'react-router';

/*
For this challenge I could have gotten away without using any routes (since they are not needed)
but I only added it as practice to touch on the router .
*/
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Elixir Chat</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
