import React, { Component } from 'react';
import Navigation from './Navigation';

import './header.scss';

class Header extends Component {

  render () {
    return (
      <header className="appHeader">
        <div className="headerBox">
          <p>Centhris Wiki</p>
        </div>
        <Navigation />
      </header>
    )
  }
}

export default Header;