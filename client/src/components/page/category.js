import React, { Component } from 'react';
import Navigation from 'components/navigation';

import "styles/categories.scss";

class Category extends Component {

  render () {
    return (
      <div className="app">
        <Navigation />
        <main className="content category">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { Category };

