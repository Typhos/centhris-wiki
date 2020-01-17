import React, { Component } from 'react';

import Header from "../Header";
import Footer from "../Footer";

import "./Runes.scss";

class Runes extends Component {

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

export { Runes };

