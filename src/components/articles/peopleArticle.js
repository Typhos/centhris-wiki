import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import "./personArticle.scss";

export default class PeopleArticle extends Component {


  render () {
    const person = this.props.entry;

    return (
      <li className="person" id={person.name.replace(/\s/g,"-")}>
      	<Link className="personLink" to={`/person/${person.name.replace(/\s/g,"-")}`}>
          	<img className="portrait" alt="" src={this.props.image}/>
      		<p className="name">{person.name}</p>
      	</Link>
      </li>
    )
  }
}