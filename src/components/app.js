import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from "./header";
import Footer from "./footer";

import './app.scss';

import centhris from "../img/maps/Centhris-small.png";
import centhrisFull from "../img/maps/Centhris-full.png";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Header />
          <h2 className="sectionTitle">A Wiki for the Fantasy World of Centhris</h2>
          <article className="description">
            <p>The world of Centhris is a homebrew world in the vast cosmos of planes that make up the Dungeons & Dragons multiverse. This wiki acts as a central point of information for the various people, places, and things that can be found upon it.</p>
            
            <a href={centhrisFull}>
              <img className="worldMap" src={centhris}/>
            </a>
          </article>
        <Footer />
      </main>
    );
  }
}

export default App;
