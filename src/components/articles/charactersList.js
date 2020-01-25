import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "styles/personArticle.scss";

export default class CharactersList extends Component {


  render () {
    const person = this.props.entry;

    return (
      <li className="character" id={person.name.replace(/\s/g,"-")}>
      	<Link className="personLink" to={{pathname: `/player-character/${person.name.replace(/\s/g,"-")}`, state: "update"}}>
          <img className="portrait" alt="" src={this.props.image}/>
      		<p className="name">{person.name}</p>
      	</Link>
      </li>
    )
  }
}