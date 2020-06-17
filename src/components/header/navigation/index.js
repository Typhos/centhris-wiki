import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from "components/search";
import NavList from "components/header/navigation/navList";

import 'styles/navigation.scss';

class Navigation extends Component {

  constructor (props) {
    super(props);

    this.state = {
      menu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  render () {

    return (
      <nav>
        <div className="desktopNav">
          <div className="alignmentShell">
            <div className="menuHousing">
              <input className="menuTrigger" type="checkbox" checked={this.state.menu} onChange={this.toggleMenu}/>
              <button className="menuButton" ><span className="icon">&equiv;</span> Menu</button>
              <div className="overlay">
                <h3 className="navHeading">navigation</h3>
                <NavList/>
                <div className="closeMenu">
                  <span onClick={this.closeMenu}>x</span>
                </div>
              </div>
            </div>
            <Search />
          </div>
        </div>

        <div className="mobileNav">
          <div id="menuToggle">
            <input className="menuTrigger" type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <NavList/>
          </div>
        </div>
      </nav>
    )
  }

  toggleMenu(e) {
    this.setState({menu: e.target.checked});
  }

  closeMenu() {
    if ( this.state.menu === true ) {
      this.setState({menu: false})
    }
  }
}

export default Navigation;
