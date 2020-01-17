import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './navigation.scss';

class Navigation extends Component {

  render () {
    return (
      <nav>
        <ul id="navigationList">
          <li className={`navigationListItem`} onClick={this.navigate} navid="runes"><Link to="/runes">Runes</Link></li>
          <li className={`navigationListItem`} onClick={this.navigate}  navid="people"><Link to="/people">People</Link></li>
          <li className={`navigationListItem`} onClick={this.navigate}  navid="places">Places</li>
          <li className={`navigationListItem`} onClick={this.navigate}  navid="maps">Maps</li>
          <li className={`navigationListItem`} onClick={this.navigate}  navid="lore">Lore</li>
        </ul>
      </nav>      
    )
  }

  navigate(e) {

  }
}

export default Navigation;
