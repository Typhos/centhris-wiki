import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import Page from 'components/page';
import getImgPath from "components/utils/getImgPath.js";

class Location extends Component {

  constructor(props) {
    super(props);

    

    console.log(window.location)

    this.state = {
      "combinedPlaces": DataLoader.places,
      "pathname": window.location.pathname,
      "entry": DataLoader.places[ decodeURI(window.location.pathname.split('/location/')[1]) ],
      "dmView": localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  // TODO - update this in all places where unsafe componentWillMount is used
  static getDerivedStateFromProps (nextProps, prevState){
    if ( nextProps.location.pathname !== prevState.pathname ) {
      return {
        "pathname": nextProps.location.pathname,
        "entry": DataLoader.places[ decodeURI(nextProps.location.pathname.split('/lore/')[1]) ]
      };
    }
    return null;
  }

  render () {
    const {entry} = this.state;

    if (!entry) {
      return (
        <Redirect to="/404" />
      )
    }

    const images = require.context('img/location/', true);
    const location = entry;

    const additionalImages = location.additionalImages && location.additionalImages.map( image => {
      const img = images.keys().filter( name => name.includes(image) );
      return (
        <div className="info mapBox" key={image}>
          <a className="link" href={ images(img) }>
            <img alt="" className="additional" src={images(img)}/>
          </a>
        </div>
      )
    });

    const map = location.map && 
        <div className="info mapBox">
          <a href={ new getImgPath(location.map.replace(/\s/g,"-") ).src }>
            <img alt="map" className="map" src={ new getImgPath(location.map.replace(/\s/g,"-") ).src }/>
            {/*<img alt="map" className="map" src={ maps( maps.keys().filter( name => name.includes(location.map)) ) }/>*/}
          </a>
        </div>      

    function nickname() {
      if (location.nickname) {
        if ( Array.isArray(location.nickname) ) {
          return ( <h4 className="nickname">{location.nickname[0]}</h4> )
        }
        return ( <h4 className="nickname">{location.nickname}</h4> )
      }
    }

    const descriptionEntries = this.getArticles(location.articles);
    const currencyImg = location.currency && new getImgPath(location.currency.replace(/\s/g,"-")).src;

    return (
      <Page.Article>
        <TitleComponent title={`${location.name} - Centhris Wiki`} />
        <section id="location" className="article" >

          <article className="location" id={location.name.replace(/\s/g,"-")}>
            
            <Back/>

            <h2 className="fullName">{location.name}</h2>
            <aside className="infoBox">
              { nickname() }          
              
              { 
                <div className="container">
                  <img className="portrait" alt="" src={ new getImgPath(location.name.replace(/\s/g,"-"), location ).src }/>
                </div>
              }

              { location.type &&  
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{location.type}</p>
                </div>
              }

              { location.alignment &&  
                <div className="info">
                  <p className="key">Alignment</p>
                  <p className="values">{location.alignment}</p>
                </div>
              }

              { location.area && 
                <div className="info">
                  <p className="key">Area</p>
                  <p className="values">{location.area}</p>
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
                  <p className="values">
                    {location.currency}
                    { !currencyImg.includes("placeholder") && 
                      <img className="coinImage" alt="" src={ currencyImg }/>
                    }
                  </p>
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
                map
              }
            </aside>
            <div className="mainContent">
              { WikiUtils.stubCheck(location) }
              { (location.quote) ? <i className="quote">{location.quote}</i> : ""}

              { descriptionEntries }

              { location.monsters && this.state.dmView &&
                <React.Fragment>
                  <h3 className="subjectArea">Monsters</h3>
                  <ul className="monsters">
                    {location.monsters.map( mon => <li className="monster" key={mon}>{mon.name} ({mon.source})</li>)}
                  </ul>
                </React.Fragment>
              }
            </div>

          </article>
        </section>
      </Page.Article>
    )
  }

  getArticles(articles) {
    const {entry} = this.state;

    let content = [WikiUtils.linkContent(entry, WikiUtils.textFormatting(entry.description) )];

    if (entry.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 id={heading.replace(/\s/g,"-")} className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(entry, WikiUtils.textFormatting(array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && entry.dmArticles ) {
      for ( let [heading, array] of Object.entries(entry.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 id={heading.replace(/\s/g,"-")} className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(entry, WikiUtils.textFormatting(array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Location };

