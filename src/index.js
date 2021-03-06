import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from "components/header";
import Footer from "components/footer";

import ScrollToTop from 'components/scrollToTop';
import Accountability from 'components/accountability';

import HomePage from './pages/homepage';

import {Article} from './pages/articles/index';
import {SortedCategory} from './pages/sortedCategory/index';
import {GroupedCategory} from './pages/groupedCategory/index';

import {Cosmos} from './pages/articles/cosmos/index';
import {Curated} from './pages/campaign-links/index';
import {Error404} from './pages/404/index';
import {History} from './pages/articles/history/index';
import {InteractiveMap} from './pages/articles/map/index';
import {Pantheon} from './pages/articles/pantheon/index';
import {Runes} from './pages/articles/runes/index';
import {SpellCategories} from './pages/spellsCategory/index';
import {Timeline} from './pages/articles/timeline/index';
import {VesdarianCalendar} from './pages/articles/calendar/index';

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

if ( localStorage.getItem('dmView') === "true" ) {
  console.info(
    '%c You are currently in the Dungeon Master view. All content is linked, even if players cannot see it. \n To revert to standard view, clear the dmView property in your localStorage.',
    'background: #222; color: #bada55; line-height: 20px; padding: 1.5em 25px;'
  );

  Accountability();
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
        <Route exact path="/" component={HomePage} />
        <Route path="/lore/The-Vesdarian-Calendar" component={VesdarianCalendar} />

        <Route path="/player-character" component={Article} />
        <Route path="/creature" component={Article} />
        <Route path="/location" component={Article} />
        <Route path="/lore/" component={Article} />
        <Route path="/item" component={Article} />
        <Route path="/organization" component={Article} />
        <Route path="/person" component={Article} />
        <Route path="/spell/" component={Article} />

        <Route path="/curated-links/" component={Curated} />

        <Route path="/people" component={SortedCategory} />
        <Route path="/characters" component={SortedCategory} />
        
        <Route path="/items" component={GroupedCategory} />
        <Route path="/loreCategory" component={GroupedCategory}/>
        <Route path="/organizationsCategory" component={GroupedCategory} />
        <Route path="/placesCategory" component={GroupedCategory} />
        <Route path="/creaturesCategory" component={GroupedCategory} />

        <Route path="/cosmos/" component={Cosmos} />
        <Route path="/history/" component={History} />
        <Route path="/map" component={InteractiveMap} />
        <Route path="/pantheon/" component={Pantheon} />
        <Route path="/runes/" component={Runes} />
        <Route path="/spellsCategory" component={SpellCategories} />
        <Route path="/timeline/" component={Timeline} />

        <Route component={Error404} />
      </Switch>
      <Footer/>
    </ScrollToTop>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
