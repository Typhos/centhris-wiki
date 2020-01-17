import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import App from './components/App';
import {People} from './pages/People/index';
import {Runes} from './pages/Runes/index';

// import * as serviceWorker from './components/serviceWorker';
// serviceWorker.unregister();

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/runes" component={Runes} />
      <Route path="/people" component={People} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// <Route path="/places" component={Places} />
// <Route path="/maps" component={Maps} />
// <Route path="/lore" component={Lore} />
// <Route path="/organizations" component={Organizations} />
// <Route path="/gods" component={Gods} />