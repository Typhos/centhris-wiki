import React, { Component } from 'react';

import Header from "./header";
import Footer from "./footer";

import './app.scss';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Header />

        <Footer />
      </main>
    );
  }
}

export default App;
