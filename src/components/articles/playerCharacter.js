import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import placeData from "../../data/places";
import peopleData from "../../data/people";

import "styles/personArticle.scss";

export default class PlayerCharacter extends Component {

  constructor (props) {
    super(props);

    this.linkContent = this.linkContent.bind(this);
    this.checkNestedArray = this.checkNestedArray.bind(this);
    this.replaceNestedValue = this.replaceNestedValue.bind(this);
  }

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
          { (person.gender) ? 
            <div className="info">
              <p className="key">Gender</p>
              <p className="values">{person.gender}</p>
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
              <p className="values">{this.linkContent(person, person.affiliations)}</p>
            </div> : "" 
          }
        </aside>
      </article>
    )
  }

  linkContent(currentPerson, descriptionArray) {

    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph,i) => {
      paragraph = [paragraph];

      const dataGroupsObj = {
        "person": peopleData,
        "location": placeData
      };

      for ( let [path, dataSet] of Object.entries(dataGroupsObj) ) {

        for ( let obj of Object.values(dataSet) ) {

          const name = obj.name;
          const nickname = obj.nickname;
          const show = dataSet[name.replace(/\s/g,"-")].playerKnown;

          const namesObj = {
            name: name, 
            nickname: nickname
          };

          if ( show ) {
            for ( let [key, nameValue] of Object.entries(namesObj) ) {

              const link = <a key={`key-${i}-${currentPerson}`} href={`/${path}/${name.replace(/\s/g,"-")}`}>{nameValue}</a>;


              if ( nameValue !== currentPerson[key] ) {
                paragraph = this.replaceNestedValue(paragraph, nameValue, link);
              }
            }
          }
        }
      }

      return <p className="linkedContent" key={currentPerson+i}>{paragraph}</p>;
    });

    return mapped;
  }
  
  replaceNestedValue( dataset, name, link) {

    for ( let i in dataset ) {
      if ( Array.isArray(dataset[i]) ) {
        dataset[i].map( subArr => {
          this.replaceNestedValue(subArr, name, link);
        });  
      }

      if ( typeof dataset[i] === 'string' ) {
        if ( dataset[i].includes(name) ) {
          let strReplace = dataset[i].replace(name, `|${name}|`);
          strReplace = strReplace.split("|");

          strReplace = strReplace.map( str => {
            return ( str === name ) ? link : str;
          });

          dataset[i] = strReplace;
        }
      }
    }

    return dataset.flat(Infinity)
  }
}