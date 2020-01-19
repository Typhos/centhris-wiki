import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import "./personArticle.scss";

export default class PeopleArticle extends Component {

  constructor (props) {
    super(props);

    this.linkContent = this.linkContent.bind(this);
  }

  render () {
    const person = this.props.entry;

    return (
      <article className="person" id={person.name.replace(/\s/g,"-")}>
        <h3 className="fullName">{person.name}</h3>
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
          <div className="info">
            <p className="key">Affiliation(s)</p>
            <p className="values">{person.affiliations}</p>
          </div>
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

    function checkNestedArray(array, name) {
      let test = false;

      for (let i in array) {
        if (Array.isArray(array[i])) {
          test = checkNestedArray(array[i], name);
        }

        if (typeof array[i] === 'string') {
          if (array[i].includes(name)) {
            test = true;
          }
        }
      }

      return test;
    }

    function replaceNestedValue(array, name, link) {
      
      for (let i in array) {
        if (Array.isArray(array[i])) {
          replaceNestedValue(array[i], name, link);
        }

        if (typeof array[i] === 'string') {
          if ( array[i].includes(name) ) {

            let strReplace = array[i].replace(name, `|${name}|`);
            strReplace = strReplace.split("|");

            strReplace = strReplace.map( str => {
              return ( str === name ) ? link : str;
            });

            array[i] = strReplace;
          }
        }
      }

      return array    
    }

    let mapped = descriptionArray.map( (paragraph,i) => {
      paragraph = [paragraph];

      for ( let [key, obj] of Object.entries(peopleData) ) {
        const name = obj.name;
        const nickname = obj.nickname;

        const namesObj = {
          name: name, 
          nickname: nickname
        };

        for ( let [key, nameValue] of Object.entries(namesObj) ) {

          if ( checkNestedArray(paragraph,  'Akad') && currentPerson.nickname !== "Akad" ) {
            console.log(paragraph)
          }

          const link = <a key={`key-${i}-${currentPerson}`} href={`/person/${name.replace(/\s/g,"-")}`}>{nameValue}</a>;

          if ( checkNestedArray(paragraph, nameValue) && nameValue !== currentPerson[key] ) {

            paragraph = replaceNestedValue(paragraph, nameValue, link);

          }
        }
      }

      return <p key={currentPerson+i}>{paragraph}</p>;
    });

    return mapped;
  }
}