import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WikiUtils from "components/utils/wikiUtils";

import "styles/personArticle.scss";

import peopleData from "data/people";

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures from 'data/places/structures';
import worldRegions from 'data/places/worldRegions';
import politicalStates from 'data/places/politicalStates';
import cityDistricts from 'data/places/cityDistricts';
import cityStates from 'data/places/cityStates';
import settlements from 'data/places/settlements';
import dungeons from 'data/places/dungeons';
import fortifications from 'data/places/fortifications';

const combinedPlaces = Object.assign(structures, worldRegions, politicalStates, cityDistricts, cityStates, settlements, dungeons, fortifications);


export default class PlayerCharacter extends Component {

  render () {
    const person = this.props.entry;

    return (
      <article className="person" id={person.name.replace(/\s/g,"-")}>
        <Link className="backLink" to='/characters'>&laquo; back to Characters</Link>

        <h3 className="fullName">{person.name}</h3>
        <aside className="infoBox">
          <h4 className="nickname">{person.nickname}</h4>
          <img className="portrait" alt="" src={this.props.image}/>
          <div className="info">
            <p className="key">Age</p>
            <p className="values">{person.age}</p>
          </div>
          { (person.gender) ? 
            <div className="info">
              <p className="key">Gender</p>
              <p className="values">{person.gender}</p>
            </div> : "" 
          }
          { (person.class) ? 
            <div className="info">
              <p className="key">Character class</p>
              <p className="values">{person.class}</p>
            </div> : "" 
          }
          { (person.subclass) ? 
            <div className="info">
              <p className="key">Subclass</p>
              <p className="values">{person.subclass}</p>
            </div> : "" 
          }
          { (person.race) ? 
            <div className="info">
              <p className="key">Race</p>
              <p className="values">{person.race}</p>
            </div> : "" 
          }
          { (person.hp) ? 
            <div className="info">
              <p className="key">Hit Points</p>
              <p className="values">{person.hp}</p>
            </div> : "" 
          }
          { (person.stats) ? 
            <div className="statblock">
              <p className="heading">Stats</p>
              <div className="block">
                <span className="stat">STR</span> <span className="num">{person.stats.STR}</span>
                <span className="stat">DEX</span> <span className="num">{person.stats.DEX}</span>
                <span className="stat">CON</span> <span className="num">{person.stats.CON}</span>
                <span className="stat">INT</span> <span className="num">{person.stats.INT}</span>
                <span className="stat">WIS</span> <span className="num">{person.stats.WIS}</span>
                <span className="stat">CHA</span> <span className="num">{person.stats.CHA}</span>
              </div>
            </div> : "" 
          }
          { (person.background) ? 
            <div className="info">
              <p className="key">Background</p>
              <p className="values">{person.background}</p>
            </div> : "" 
          }
          { (person.affiliations) ? 
            <div className="info">
              <p className="key">Affiliations</p>
              <p className="values">{WikiUtils.linkContent(person, person.affiliations)}</p>
            </div> : "" 
          }
        </aside>
      </article>
    )
  }
}