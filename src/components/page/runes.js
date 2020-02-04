import React, { Component } from 'react';

import "styles/runes.scss";

class Runes extends Component {

  render () {
    return (
      <div className="App">
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { Runes };

