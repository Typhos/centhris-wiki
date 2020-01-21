import React, { Component } from 'react';
import Navigation from './navigation';
import { Link } from 'react-router-dom';

import 'styles/header.scss';

class Header extends Component {

  render () {
    return (
      <header className="appHeader">
        <div className="headerBox">
          <h1>
            <Link className="home" to="/">The World of Centhris</Link>
          </h1>
        </div>
        <Navigation />
      </header>
    )
  }
}

export default Header;