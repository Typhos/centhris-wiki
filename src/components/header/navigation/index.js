import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navigation.scss';

class Navigation extends Component {

  render () {
    const loc = window.location.pathname;

    return (
      <nav>
        <ul id="navigationList">
          <li className={`navigationListItem ${ (loc === '/people') ? "active" : "" }`} navid="people"><Link to="/people">People</Link></li>
          <li className={`navigationListItem`} navid="places">Places</li>
          <li className={`navigationListItem`} navid="Organizations">Organizations</li>
          <li className={`navigationListItem`} navid="lore">Lore</li>
          <li className={`navigationListItem ${ (loc === '/runes') ? "active" : "" }`} navid="runes"><Link to="/runes">Runes</Link></li>
        </ul>
      </nav>      
    )
  }

  navigate(e) {

  }
}

export default Navigation;
