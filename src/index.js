import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from "components/header";
import Footer from "components/footer";

import ScrollToTop from 'components/scrollToTop';

import App from './components/app';
import {Characters} from './pages/characters/index';
import {Player} from './pages/player/index';
import {People} from './pages/peopleGroups/index';
import {Person} from './pages/person/index';
import {Runes} from './pages/runes/index';
import {Places} from './pages/placeGroups/index';
import {Location} from './pages/location/index';
import {OrganizationGroups} from './pages/organizationGroups/index';
import {Group} from './pages/organization/index';
import {LoreCategories} from './pages/loreCategories/index';
import {Lore} from './pages/loreArticle/index';
import {History} from './pages/history/index';
import {Timeline} from './pages/timeline/index';
import {Pantheon} from './pages/pantheon/index';
import {Error404} from './pages/404/index';

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

if ( localStorage.getItem('dmView') === true ) {
  console.log(
    '%c Warning: You are currently in the Dungeon Master view. All content is linked, even if players cannot see it. \n To revert to standard view, clear the dmView property in your localStorage.',
    'background: #222; color: #bada55; line-height: 20px; padding: 1.5em 25px;'
  );
}

const dmCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"];
let trackCode = [];
let failTest = {};

document.addEventListener("keydown", event => {
  trackCode.push(event.key);
  checkKeyCode();
});

function checkKeyCode() {

  try {
    trackCode.forEach( (key,i) => {

      if ( i >= dmCode.length - 1 ) {
        let dmView = localStorage.getItem('dmView') === 'true';
        localStorage.setItem('dmView', !dmView);
        window.location.reload();
      } else if ( dmCode[i] !== trackCode[i] ) {
        throw failTest;
      }

    });
  } catch (e) {
    trackCode = [];
    if (e !== failTest) throw e;
  }

}

const routing = (
  <Router>
    <ScrollToTop>
      { localStorage.getItem('dmView') === 'true' && <div id="dmFlag">DM MODE</div>}
      <Header/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/runes" component={Runes} />
        <Route path="/characters" component={Characters} />
        <Route path="/player-character" component={Player} />
        <Route path="/person" component={Person} />
        <Route path="/people" component={People} />
        <Route path="/places" component={Places} />
        <Route path="/location" component={Location} />
        <Route path="/organizations" component={OrganizationGroups} />
        <Route path="/group" component={Group} />
        <Route path="/loreCategories" component={LoreCategories} />
        <Route path="/lore/" component={Lore} />
        <Route path="/history/" component={History} />
        <Route path="/timeline/" component={Timeline} />
        <Route path="/pantheon/" component={Pantheon} />
        <Route component={Error404} />
      </Switch>
      <Footer/>
    </ScrollToTop>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
