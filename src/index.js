import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './components/app';
import {Characters} from './pages/characters/index';
import {Player} from './pages/player/index';
import {People} from './pages/people/index';
import {Person} from './pages/person/index';
import {Runes} from './pages/runes/index';
import {Places} from './pages/places/index';
import {Location} from './pages/location/index';

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

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
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// <Route path="/places" component={Places} />
// <Route path="/maps" component={Maps} />
// <Route path="/lore" component={Lore} />
// <Route path="/organizations" component={Organizations} />
// <Route path="/gods" component={Gods} />