import React, { Component } from 'react';
import Runes from './Runes';
import Places from './Places';
import Maps from './Maps';
import People from './People';
import Lore from './Lore';

import '../styles/App.scss';


class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      nav: {
        runes: false,
        places: false,
        maps: false,
        people: false,
        lore: false,
      }
    };

    this.navigate = this.navigate.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    let section;

    if ( this.state.nav.runes === true) {
      section = <Runes />;
    } else if ( this.state.nav.places === true) {
      section = <Places />;
    } else if ( this.state.nav.maps === true) {
      section = <Maps />;
    } else if ( this.state.nav.people === true) {
      section = <People />;
    } else if ( this.state.nav.lore === true) {
      section = <Lore />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>Tales of Ulfwyst Wiki</p>
        </header>

        <nav>
          <ul id="navigationList">
            <li className="navigationListItem" onClick={this.navigate} navid="runes">Runes</li>
            <li className="navigationListItem" onClick={this.navigate}  navid="people">People</li>
            <li className="navigationListItem" onClick={this.navigate}  navid="places">Places</li>
            <li className="navigationListItem" onClick={this.navigate}  navid="maps">Maps</li>
            <li className="navigationListItem" onClick={this.navigate}  navid="lore">Lore</li>
          </ul>
        </nav>

        {section}
      </div>
    );
  }

  navigate(e) {
    const navigationState = this.state.nav;
    let newNav = {};

    for( let [key, value] of Object.entries(navigationState ) ) {
      if ( key === e.target.attributes.navid.value ) {
        newNav[key] = true;
      } else {
        newNav[key] = false;
      }
    }

    this.setState({nav: newNav})
  }
}

export default App;
