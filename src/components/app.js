import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Navigation from 'components/header/navigation';

import 'styles/app.scss';

import centhris from "../img/maps/Centhris-small.png";
import centhrisFull from "../img/maps/Centhris-full.png";

class App extends Component {
  render() {
    return (
      <main className="content">
      <Navigation/>
        <h2 className="sectionTitle">A Wiki for the Fantasy World of Centhris</h2>
        <article className="description">
          { 
            WikiUtils.linkContent({},["The world of Centhris is a homebrew world in the vast cosmos of planes that make up the Dungeons & Dragons multiverse. This wiki acts as a central point of information for the various people, places, and things that can be found upon it."])
          }
          <a href={centhrisFull}>
            <img alt="World Map of Centhris" className="worldMap" src={centhris}/>
          </a>
        </article>
      </main>
    );
  }
}

export default App;
