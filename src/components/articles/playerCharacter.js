import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";

import "styles/personArticle.scss";

import peopleData from "data/people";

export default class PlayerCharacter extends Component {

  render () {
    const person = this.props.entry;

    const stats = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.stats) ) { 
        array.push(
          <div className="block">
            <span className="stat">{key}</span> <span className="num">{val}</span>
          </div>
        )
      }
      return array;
    }

    return (
      <article className="person" id={person.name.replace(/\s/g,"-")}>
        {/*<Link className="backLink" to='/characters'>&laquo; back to Characters</Link>*/}

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
          { person.stats && 
            <div className="statblock">
              <p className="heading">Stats</p>
              {stats()}
            </div>
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