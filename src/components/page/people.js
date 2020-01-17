import React, { Component } from 'react';

import Header from "../header";
import Footer from "../footer";

import './people.scss';

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

