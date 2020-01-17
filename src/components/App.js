import React, { Component } from 'react';

import Header from "./Header";
import Footer from "./Footer";

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
