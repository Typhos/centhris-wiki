import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WikiUtils from "components/utils/wikiUtils";

import placeData from "../../data/places";
import characterData from '../../data/characters';

import "styles/personArticle.scss";

export default class PeopleArticle extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  render () {
    const person = this.props.entry;
    const descriptionEntries = this.getArticles(person);

    return (

      <article className="person" id={person.name.replace(/\s/g,"-")}>

        <Link className="backLink" to='/people'>&laquo; back to People</Link>

        <h2 className="fullName">{person.name}</h2>
        <aside className="infoBox">
          <h4 className="nickname">{person.nickname}</h4>
          <img className="portrait" alt="" src={this.props.image}/>
          { (person.titles) ? 
            <div className="info">
              <p className="key">Title(s)</p>
              <p className="values">{person.titles}</p>
            </div> : "" 
          }
          <div className="info">
            <p className="key">Age</p>
            <p className="values">{person.age}</p>
          </div>
          <div className="info">
            <p className="key">Gender</p>
            <p className="values">{person.gender}</p>
          </div>
          <div className="info">
            <p className="key">Race</p>
            <p className="values">{person.race}</p>
          </div>
          { (person.occupation) ? 
            <div className="info">
              <p className="key">Occupation</p>
              <p className="values">{person.occupation}</p>
            </div> : "" 
          }
          { (person.class) ? 
            <div className="info">
              <p className="key">Character class</p>
              <p className="values">{person.class}</p>
            </div> : "" 
          }
          { (person.affiliations) ? 
            <div className="info affiliations">
              <p className="key">Affiliation(s)</p>
              <div className="values">{WikiUtils.linkContent(person, person.affiliations)}</div>
            </div> : "" 
          }
        </aside>
        <div className="mainContent">
          { (person.quote) ? 
            <i className="quote">{person.quote}</i> : ""
          }
          {descriptionEntries}
        </div>
        <div className="clear"></div>
      </article>
    )
  }

  getArticles(person) {
    const personData = this.props.data;
    let content = [WikiUtils.linkContent(person, person.description)];

    if (person.articles) {
      for ( let [heading, array] of Object.entries(person.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(person, array)}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && person.dmArticles ) {
      for ( let [heading, array] of Object.entries(person.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(person, array)}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}