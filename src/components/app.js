import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Navigation from 'components/header/navigation';

import 'styles/app.scss';

import centhris from "../img/maps/map-projection.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>

        <main className="content">
          <article className="description">
            <h2 className="sectionTitle">A Wiki for the Fantasy World of Centhris</h2>
            { 
              WikiUtils.linkContent({},["The world of Centhris is a homebrew world in the vast cosmos of planes that make up the Dungeons & Dragons multiverse. This wiki acts as a central point of information for the various people, places, and things that can be found upon it."])
            }
            <a href={centhris}>
              <img alt="World Map of Centhris" className="worldMap" src={centhris}/>
            </a>
          </article>
        </main>
      </div>
    );
  }
}

export default App;
