import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavList extends Component {

  render() {
    const loc = window.location.pathname;

    return (
      <ul className="navigationList">
        <li className={`navigationListItem ${ (loc === '/map') ? "active" : "" }`} navid="map"><Link to="/map">Map</Link></li>
        <li className={`navigationListItem ${ (loc === '/characters') ? "active" : "" }`} navid="characters"><Link to="/characters">Characters</Link></li>
        <li className={`navigationListItem ${ (loc === '/people') ? "active" : "" }`} navid="people"><Link to="/people">People</Link></li>
        <li className={`navigationListItem ${ (loc === '/places') ? "active" : "" }`} navid="places"><Link to="/places">Places</Link></li>
        <li className={`navigationListItem ${ (loc === '/organizations') ? "active" : "" }`} navid="organizations"><Link to="/organizations">Organizations</Link></li>
        <li className={`navigationListItem ${ (loc === '/loreCategories') ? "active" : "" }`} navid="lore"><Link to="/loreCategories">Lore</Link></li>
        <li className={`navigationListItem ${ (loc === '/timeline') ? "active" : "" }`} navid="timeline"><Link to="/timeline">Timeline</Link></li>
        <li className={`navigationListItem ${ (loc === '/creatureTypes') ? "active" : "" }`} navid="creatures"><Link to="/creatureTypes">Creatures</Link></li>
        <li className={`navigationListItem ${ (loc === '/spellCategories') ? "active" : "" }`} navid="runes"><Link to="/spellCategories">Spells</Link></li>
        <li className={`navigationListItem ${ (loc === '/miscCategories') ? "active" : "" }`} navid="misc"><Link to="/miscCategories">Misc</Link></li>
        <li className={`navigationListItem ${ (loc === '/runes') ? "active" : "" }`} navid="runes"><Link to="/runes">Runes</Link></li>
      </ul>
    )
  }

}

