import React, { Component } from 'react';
import Navigation from 'components/header/navigation';

class Characters extends Component {

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

export { Characters };

