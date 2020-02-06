import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Back from '../../components/back';

import Page from '../../components/page';
import "styles/locationArticle.scss";

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures from 'data/places/structures';
import worldRegions from 'data/places/worldRegions';
import politicalStates from 'data/places/politicalStates';
import cityDistricts from 'data/places/cityDistricts';
import cityStates from 'data/places/cityStates';
import settlements from 'data/places/settlements';
import dungeons from 'data/places/dungeons';
import fortifications from 'data/places/fortifications';
import dwarfHolds from 'data/places/dwarfHolds';
import mythic from 'data/places/mythic';

class Location extends Component {

  constructor(props) {
    super(props);

    const combinedPlaces = {...cityDistricts, ...dungeons, ...structures, ...settlements, ...cityStates, ...politicalStates, ...worldRegions, ...fortifications, ...dwarfHolds, ...mythic};

    this.state = {
      combinedPlaces: combinedPlaces,
      pathname: window.location.pathname,
      location: combinedPlaces[ decodeURI(window.location.pathname.split('/location/')[1]) ],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const combinedPlaces = {...cityDistricts, ...structures,...dungeons, ...settlements, ...cityStates, ...politicalStates, ...worldRegions, ...fortifications, ...dwarfHolds};

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        location: combinedPlaces[ decodeURI(nextProps.location.pathname.split('/location/')[1])]
      });
    }
  }

  render () {
    const crests = require.context('img/crests/', true);
    const images = require.context('img/places/', false);
    const maps = require.context('img/maps/', true);
    const currency = require.context('img/currency/', false);

    const location = this.state.location;

    // const races = location.races && location.races.map( race => <span className="race commaSeparated">{ WikiUtils.linkContent(location, race) }</span> );
    const additionalImages = location.additionalImages && location.additionalImages.map( image => {
      return (
        <div className="info mapBox">
            <img alt="" className="additional" src={images(`./${image}`)}/>
        </div>
      )
    });

    function nickname() {
      if (location.nickname) {
        if ( Array.isArray(location.nickname) ) {
          return ( <h4 className="nickname">{location.nickname[0]}</h4> )
        }
        return ( <h4 className="nickname">{location.nickname}</h4> )
      }
    }

    const descriptionEntries = this.getArticles(location.articles);

    return (
      <Page.Location>
        <section id="location" className="article" >

          <article className="location" id={location.name.replace(/\s/g,"-")}>
            
            <Back/>

            <h2 className="fullName">{location.name}</h2>
            <aside className="infoBox">
              { nickname() }          
              { images.keys().some(x => x.includes( location.name.replace(/\s/g,"-") )) &&
                <div className="container">
                  <img className="portrait" alt="" src={ images('./' + location.name.replace(/\s/g,"-") + '.png') }/>
                  { crests.keys().some(x => x.includes( location.name.replace(/\s/g,"-") )) &&
                    <img className="crest" alt="" src={ crests('./' + location.name.replace(/\s/g,"-") + '.png') }/>
                  }
                </div>
              }
              { location.type &&  
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{location.type}</p>
                </div>
              }
              { location.population && 
                <div className="info">
                  <p className="key">Population</p>
                  <p className="values">{location.population}</p>
                </div> 
              }
              { location.government &&
                <div className="info">
                  <p className="key">Government</p>
                  <p className="values">{location.government}</p>
                </div>
              }
              { location.currency && 
                <div className="info currency">
                  <p className="key">Currency</p>
                  <p className="values">{location.currency}</p>
                  { currency.keys().some(x => x.includes( location.currency.replace(/\s/g,"-") )) &&
                      <img className="coinImage" alt="" src={ currency('./' + location.currency.replace(/\s/g,"-") + '.png') }/>    
                  }
                </div>
              }
              { location.capital && 
                <div className="info">
                  <p className="key">Capital City</p>
                  <div className="values">{WikiUtils.linkContent(location, location.capital)}</div>
                </div>
              }
              { location.leaders && 
                <div className="info">
                  <p className="key">Leader(s)</p>
                  <div className="values">{WikiUtils.linkContent(location, location.leaders)}</div>
                </div>
              }
              { location.river && 
                <div className="info">
                  <p className="key">River</p>
                  <div className="values">{WikiUtils.linkContent(location, location.river)}</div>
                </div>
              }
              { location.lake && 
                <div className="info">
                  <p className="key">Lake</p>
                  <div className="values">{WikiUtils.linkContent(location, location.lake)}</div>
                </div>
              }
              { location.districts && 
                <div className="info">
                  <p className="key">Districts</p>
                  <div className="values">{WikiUtils.linkContent(location, location.districts)}</div>
                </div>
              }
              { location.cities && 
                <div className="info">
                  <p className="key">Major Cities</p>
                  <div className="values">{WikiUtils.linkContent(location, location.cities)}</div>
                </div>
              }
              { location.races && 
                <div className="info">
                  <p className="key">Race(s)</p>
                  <div className="races values">{WikiUtils.linkContent(location, location.races)}</div>
                </div>
              }
              { location.nation &&  
                <div className="info">
                  <p className="key">State</p>
                  <div className="values">{WikiUtils.linkContent(location, location.nation)}</div>
                </div>
              }
              { location.location && 
                <div className="info">
                  <p className="key">Location</p>
                  <div className="values">{WikiUtils.linkContent(location, location.location)}</div>
                </div>
              }
              { location.regions && 
                <div className="info">
                  <p className="key">Regions</p>
                  <div className="values">{WikiUtils.linkContent(location, location.regions)}</div>
                </div>
              }
              { location.additionalImages && additionalImages }
              { location.map && 
                <div className="info mapBox">
                  <a href={ maps(`./${location.map}.png`) }>
                    <img alt="map" className="map" src={maps(`./${location.map}.png`)}/>
                  </a>
                </div>
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
    let content = [WikiUtils.linkContent(location, location.description)];

    if (location.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(location, WikiUtils.textFormatting(array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && location.dmArticles ) {
      for ( let [heading, array] of Object.entries(location.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(location, WikiUtils.textFormatting(array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Location };

