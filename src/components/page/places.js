import React, { Component } from 'react';

import Header from "../header";
import Footer from "../footer";

import 'styles/people.scss';

class Places extends Component {

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

export { Places };

