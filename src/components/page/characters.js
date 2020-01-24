import React, { Component } from 'react';

import Header from "../header";
import Footer from "../footer";

class Characters extends Component {

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.location.state === 'update') {
      
    }
  }
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

export { Characters };

