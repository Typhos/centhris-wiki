import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavList extends Component {

  render() {
    const loc = window.location.pathname;

    return (
      <ul className="navigationList">
        <li className={`navigationListItem ${ (loc === '/curated-links') ? "active" : "" }`} navid="curated">
          <Link to="/curated-links" onClick={this.props.onClick}>Campaign Links</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/map') ? "active" : "" }`} navid="map">
          <Link to="/map" onClick={this.props.onClick}>Map</Link>
        </li>

        <hr/>

        <li className={`navigationListItem ${ (loc === '/creaturesCategory') ? "active" : "" }`} navid="creatures">
          <Link to="/creaturesCategory" onClick={this.props.onClick}>Creatures</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/characters') ? "active" : "" }`} navid="characters">
          <Link to="/characters" onClick={this.props.onClick}>Characters</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/cosmos') ? "active" : "" }`} navid="cosmos">
          <Link to="/cosmos" onClick={this.props.onClick}>Cosmos</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/pantheon') ? "active" : "" }`} navid="gods">
          <Link to="/pantheon" onClick={this.props.onClick}>Gods</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/items') ? "active" : "" }`} navid="items">
          <Link to="/items" onClick={this.props.onClick}>Items & Vehicles</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/loreCategory') ? "active" : "" }`} navid="lore">
          <Link to="/loreCategory" onClick={this.props.onClick}>Lore</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/organizationsCategory') ? "active" : "" }`} navid="organizations">
          <Link to="/organizationsCategory" onClick={this.props.onClick}>Organizations</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/people') ? "active" : "" }`} navid="people">
          <Link to="/people" onClick={this.props.onClick}>People</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/placesCategory') ? "active" : "" }`} navid="places">
          <Link to="/placesCategory" onClick={this.props.onClick}>Places</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/runes') ? "active" : "" }`} navid="runes">
          <Link to="/runes" onClick={this.props.onClick}>Runes</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/spellsCategory') ? "active" : "" }`} navid="runes">
          <Link to="/spellsCategory" onClick={this.props.onClick}>Spells</Link>
        </li>
        <li className={`navigationListItem ${ (loc === '/timeline') ? "active" : "" }`} navid="timeline">
          <Link to="/timeline" onClick={this.props.onClick}>Timeline</Link>
        </li>        
      </ul>
    )
  }

}

