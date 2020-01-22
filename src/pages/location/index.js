import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import placeData from 'data/places';
import characterData from 'data/characters';
import peopleData from 'data/people';

import Page from '../../components/page';
import "styles/locationArticle.scss";

const images = require.context('img/places/', true);
const maps = require.context('img/maps/', true);

class Location extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: placeData[window.location.pathname.split('/location/')[1]]
    }

    this.linkContent = this.linkContent.bind(this);
    this.getArticles = this.getArticles.bind(this);
  }

  render () {
    const location = this.state.location;

    const races = location.races && location.races.map( race => <span className="race commaSeparated">{race}</span> );
    const additionalImages = location.additionalImages && location.additionalImages.map( image => {
      return (
        <div className="info mapBox">
            <img alt="" className="additional" src={images(`./${image}`)}/>
        </div>
      )
    });

    const descriptionEntries = this.getArticles(location.articles);

    return (
      <Page.Location>
        <section id="location" >
          {/*<LocationArticle key={location} data={{placeData}} entry={placeData[location]} image={ images('./' + placeData[location].name.replace(/\s/g,"-") + '.png') }/>*/}
          <article className="location" id={location.name.replace(/\s/g,"-")}>
            
            <Link className="backLink" to='/places'>&laquo; back to Places</Link>

            <h2 className="fullName">{location.name}</h2>
            <aside className="infoBox">
              { (location.nickname) ? 
                <h4 className="nickname">{location.nickname}</h4>: "" 
              }          
              <img className="portrait" alt="" src={ images('./' + location.name.replace(/\s/g,"-") + '.png') }/>
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
                  <p className="key">Location</p>
                  <div className="values">{this.linkContent(location, location.location)}</div>
                </div> : "" 
              }
              { (location.regions) ? 
                <div className="info">
                  <p className="key">Regions</p>
                  <div className="values">{this.linkContent(location, location.regions)}</div>
                </div> : "" 
              }
              { (location.additionalImages) ? additionalImages : ""}
              { (location.map) ? 
                <div className="info mapBox">
                  <a href={ maps(`./${location.map}.png`) }>
                    <img alt="map" className="map" src={maps(`./${location.map}.png`)}/>
                  </a>
                </div> : "" 
              }
            </aside>
            <div className="mainContent">
              { (location.quote) ? <i className="quote">{location.quote}</i> : ""}

              {descriptionEntries}
            </div>

          </article>
        </section>
      </Page.Location>
    )
  }

  getArticles(articles) {
    const location = this.state.location;
    let content = [this.linkContent(location, location.description)];

    if (location.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {this.linkContent(location, array)}
          </React.Fragment>
        );
      }
    }

    return content;
  }

  linkContent(target, descriptionArray) {
    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph,i) => {
      paragraph = [paragraph];

      const dataGroupsObj = {
        //"organization": organizationData,
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

              const link = <a key={`key-${i}-${target}`} href={`/${path}/${name.replace(/\s/g,"-")}`}>{nameValue}</a>;

              if ( nameValue !== target[key] ) {
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

export { Location };

