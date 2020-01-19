import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import placeData from '../../data/places';
import peopleData from '../../data/people';

import "./locationArticle.scss";

export default class LocationArticle extends Component {

  constructor (props) {
    super(props);

    this.linkContent = this.linkContent.bind(this);
    this.checkNestedArray = this.checkNestedArray.bind(this);
    this.replaceNestedValue = this.replaceNestedValue.bind(this);
  }

  render () {
    const location = this.props.entry;

    const races = location.races && location.races.map( race => <span className="race commaSeparated">{race}</span> );
    // const leaders = location.leaders && location.leaders.map( leader => <span className="leader commaSeparated">{  }</span> );
    // const regions = location.regions && location.regions.map( region => <span className="region commaSeparated">{  }</span> );

    return (

      <article className="location" id={location.name.replace(/\s/g,"-")}>

        <Link className="backLink" to='/places'>&laquo; back to Places</Link>

        <h3 className="fullName">{location.name}</h3>
        <aside className="infoBox">
          <h4 className="nickname">{location.nickname}</h4>
          <img className="portrait" alt="" src={this.props.image}/>
          { (location.type) ? 
            <div className="info">
              <p className="key">Type</p>
              <p className="values">{location.type}</p>
            </div> : "" 
          }
          { (location.population) ? 
            <div className="info">
              <p className="key">Population</p>
              <p className="values">{location.population}</p>
            </div> : "" 
          }
          { (location.government) ? 
            <div className="info">
              <p className="key">Government</p>
              <p className="values">{location.government}</p>
            </div> : "" 
          }
          { (location.leaders) ? 
            <div className="info">
              <p className="key">Leader(s)</p>
              <div className="values">{this.linkContent(location, location.leaders)}</div>
            </div> : "" 
          }
          { (location.races) ? 
            <div className="info">
              <p className="key">Race(s)</p>
              <p className="values">{races}</p>
            </div> : "" 
          }
          { (location.nation) ? 
            <div className="info">
              <p className="key">State</p>
              <div className="values">{this.linkContent(location, location.nation)}</div>
            </div> : "" 
          }
          { (location.location) ? 
            <div className="info">
              <p className="key">Geographic Location</p>
              <div className="values">{this.linkContent(location, location.location)}</div>
            </div> : "" 
          }
          { (location.regions) ? 
            <div className="info">
              <p className="key">Regions</p>
              <div className="values">{this.linkContent(location, location.regions)}</div>
            </div> : "" 
          }
        </aside>
        <div className="mainContent">
          { (location.quote) ? 
            <i className="quote">{location.quote}</i> : ""
          }
          {this.linkContent(location, location.description)}

        </div>
        <div className="clear"></div>
      </article>
    )
  }

  linkContent(target, descriptionArray) {
    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph,i) => {
      paragraph = [paragraph];

      const dataGroupsObj = {
        "person": peopleData,
        "location": placeData
      };

      for ( let [path, dataSet] of Object.entries(dataGroupsObj) ) {

        for ( let [key, obj] of Object.entries(dataSet) ) {

          const name = obj.name;
          const nickname = obj.nickname;
          const show = dataSet[name.replace(/\s/g,"-")].playerKnown;

          const namesObj = {
            name: name, 
            nickname: nickname
          };

          if ( show ) {
            for ( let [key, nameValue] of Object.entries(namesObj) ) {

              const link = <a key={`key-${i}-${target}`} href={`/${path}/${name.replace(/\s/g,"-")}`}>{nameValue}</a>;


              if ( this.checkNestedArray(paragraph, nameValue) && nameValue !== target[key] ) {

                paragraph = this.replaceNestedValue(paragraph, nameValue, link);

              }
            }
          }
        }
      }

      return <p className="linkedContent" key={target+i}>{paragraph}</p>;
    });

    return mapped;
  }

  checkNestedArray(array, name) {
    let test = false;

    for (let i in array) {
      if (Array.isArray(array[i])) {
        test = this.checkNestedArray(array[i], name);
      }

      if (typeof array[i] === 'string') {
        if (array[i].includes(name)) {
          test = true;
        }
      }
    }

    return test;
  }

  replaceNestedValue(array, name, link) {
      
      for (let i in array) {
        if (Array.isArray(array[i])) {
          this.replaceNestedValue(array[i], name, link);
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
}