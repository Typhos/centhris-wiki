import React, { Component } from 'react';
import Navigation from 'components/header/navigation';

import "styles/runes.scss";

class Runes extends Component {

  render () {
    return (
      <div className="App">
        <Navigation />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { Runes };

