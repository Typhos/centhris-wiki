import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import placeData from "../../data/places";
import characterData from '../../data/characters';

import "styles/personArticle.scss";

export default class PeopleArticle extends Component {

  constructor (props) {
    super(props);

    this.linkContent = this.linkContent.bind(this);
    this.replaceNestedValue = this.replaceNestedValue.bind(this);
  }

  render () {
    const person = this.props.entry;

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
              <p className="values">{this.linkContent(person, person.affiliations)}</p>
            </div> : "" 
          }
        </aside>
        <div className="mainContent">
          { (person.quote) ? 
            <i className="quote">{person.quote}</i> : ""
          }
          {this.linkContent(person, person.description)}

        </div>
        <div className="clear"></div>
      </article>
    )
  }

  linkContent(currentPerson, descriptionArray) {
    const {peopleData} = this.props.data;

    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph,i) => {
      paragraph = [paragraph];

      const dataGroupsObj = {
        "person": peopleData,
        "player-character": characterData,
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