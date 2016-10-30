import React, { PropTypes } from 'react';
import Header from './common/Header';
import Home from './home/Home';

function App({ children }) {
  return (
    <div className="container-fluid main-container">
      <Header />
      <Home/>
      {children}
    </div>
  );
}

App.propTypes = { children: PropTypes.object };

export default App;
