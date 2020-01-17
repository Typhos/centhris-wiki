import React, { Component } from 'react';

import Header from "../Header";
import Footer from "../Footer";

import './People.scss';

class People extends Component {

  render () {
    return (
      <div className="App">
        <Header />
        <main className="content">
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}

export { People };

