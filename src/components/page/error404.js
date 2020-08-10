import React, { Component } from 'react';
import Navigation from 'components/navigation';

class Error404 extends Component {

  render () {
    return (
      <div className="app">
        <Navigation />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { Error404 };

