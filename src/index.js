import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './components/app';
import {Characters} from './pages/characters/index';
import {Player} from './pages/player/index';
import {People} from './pages/peopleGroups/index';
import {Person} from './pages/person/index';
import {Runes} from './pages/runes/index';
import {Places} from './pages/placeGroups/index';
import {Location} from './pages/location/index';
import {OrganizationGroups} from './pages/organizationGroups/index';
import {Group} from './pages/group/index';

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

if ( localStorage.getItem('dmView') === true ) {
  console.log(
    '%c Warning: You are currently in the Dungeon Master view. All content is linked, even if players cannot see it. \n To revert to standard view, clear the dmView property in your localStorage.',
    'background: #222; color: #bada55; line-height: 20px; padding: 1.5em 25px;'
  );
}

const routing = (
  <Router>
    <div>
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
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));