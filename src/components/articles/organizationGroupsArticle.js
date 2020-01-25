import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "styles/organizationGroupsArticle.scss";

export default class OrganizationGroupsArticle extends Component {

  render () {
    const person = this.props.entry;

    return (
      <li className="person" id={person.name.replace(/\s/g,"-")}>
      	<Link className="personLink" to={{pathname: `/person/${person.name.replace(/\s/g,"-")}`, state: "update"}}>
          <img className="portrait" alt="" src={this.props.image}/>
      		<p className="name">{person.name}</p>
      	</Link>
      </li>
    )
  }
}