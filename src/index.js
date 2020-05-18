import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from "components/header";
import Footer from "components/footer";

import ScrollToTop from 'components/scrollToTop';

import App from './components/app';
import {Characters} from './pages/categories/characters/index';
import {Creatures} from './pages/articles/creatures/index';
import {CreatureCategories} from './pages/categories/creatures/index';
import {Error404} from './pages/404/index';
import {History} from './pages/articles/history/index';
import {Location} from './pages/articles/location/index';
import {Lore} from './pages/articles/lore/index';
import {LoreCategories} from './pages/categories/lore/index';
import {InteractiveMap} from './pages/articles/map/index';
import {MiscellaneousCategories} from './pages/categories/misc/index';
import {Organization} from './pages/articles/organization/index';
import {OrganizationGroups} from './pages/categories/organizations/index';
import {Pantheon} from './pages/articles/pantheon/index';
import {People} from './pages/categories/people/index';
import {Person} from './pages/articles/person/index';
import {Places} from './pages/categories/places/index';
import {Player} from './pages/articles/player/index';
import {Runes} from './pages/articles/runes/index';
import {Spell} from './pages/articles/spell/index';
import {SpellCategories} from './pages/categories/spells/index';
import {Timeline} from './pages/articles/timeline/index';
import {VesdarianCalendar} from './pages/articles/calendar/index';

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
        <Route path="/lore/The-Vesdarian-Calendar" component={VesdarianCalendar} />
        <Route path="/player-character" component={Player} />
        <Route path="/characters" component={Characters} />
        <Route path="/creature" component={Creatures} />
        <Route path="/creatureTypes/" component={CreatureCategories} />
        <Route path="/history/" component={History} />
        <Route path="/location" component={Location} />
        <Route path="/lore/" component={Lore} />
        <Route path="/loreCategories" component={LoreCategories} />
        <Route path="/map" component={InteractiveMap} />
        <Route path="/miscCategories" component={MiscellaneousCategories} />
        <Route path="/group" component={Organization} />
        <Route path="/organizations" component={OrganizationGroups} />
        <Route path="/pantheon/" component={Pantheon} />
        <Route path="/people" component={People} />
        <Route path="/person" component={Person} />
        <Route path="/places" component={Places} />
        <Route path="/runes/" component={Runes} />
        <Route path="/spell/" component={Spell} />
        <Route path="/spellCategories" component={SpellCategories} />
        <Route path="/timeline/" component={Timeline} />

        <Route component={Error404} />
      </Switch>
      <Footer/>
    </ScrollToTop>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
