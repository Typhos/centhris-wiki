import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";

import Page from 'components/page';
import godsData from 'data/lore/gods';
import racesData from 'data/lore/races';
import eventsData from 'data/lore/events';
import creaturesData from 'data/lore/creatures';

import "styles/loreArticle.scss";

class Lore extends Component {

  constructor(props) {
    super(props);

    const combinedLore = {...godsData, ...racesData, ...eventsData, ...creaturesData};

    this.state = {
      pathname: window.location.pathname,
      lore: combinedLore[window.location.pathname.split('/lore/')[1]],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    const combinedLore = {...godsData, ...racesData, ...eventsData};

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        lore: combinedLore[window.location.pathname.split('/lore/')[1]]
      });
    }
    
  }

  render () {
    const lore = this.state.lore;
    const descriptionEntries = this.getArticles(lore.articles);

    const loreImg = require.context('img/lore/', false);
    const creatures = require.context('img/lore/creatures/', false);
    const gods = require.context('img/lore/gods/', false);

    return (
      <Page.Lore>
        <section id="lore" >
          <article className="lore" id={lore.name.replace(/\s/g,"-")}>

            <h2 className="fullName">{lore.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{lore.name}</h4>
              { loreImg.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ loreImg('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { creatures.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ creatures('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { gods.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ gods('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { (lore.type) ? 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{lore.type}</p>
                </div> : "" 
              }
              { (lore.population) ? 
                <div className="info">
                  <p className="key">Population</p>
                  <p className="values">{lore.population}</p>
                </div> : "" 
              }
              { (lore.government) ? 
                <div className="info">
                  <p className="key">Government</p>
                  <p className="values">{lore.government}</p>
                </div> : "" 
              }
              { (lore.currency) ? 
                <div className="info">
                  <p className="key">Currency</p>
                  <p className="values">{lore.currency}</p>
                </div> : "" 
              }
              { (lore.capital) ? 
                <div className="info">
                  <p className="key">Capital City</p>
                  <p className="values">{WikiUtils.linkContent(lore, lore.capital)}</p>
                </div> : "" 
              }
              { (lore.leaders) ? 
                <div className="info">
                  <p className="key">Leader(s)</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.leaders)}</div>
                </div> : "" 
              }
              { (lore.members) ? 
                <div className="info">
                  <p className="key">Members(s)</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.members)}</div>
                </div> : "" 
              }
              { (lore.races) ? 
                <div className="info">
                  <p className="key">Race(s)</p>
                  <div className="races values">{WikiUtils.linkContent(lore, lore.races)}</div>
                </div> : "" 
              }
              { (lore.location) ? 
                <div className="info">
                  <p className="key">Location</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.location)}</div>
                </div> : "" 
              }
              { (lore.lore) ? 
                <div className="info">
                  <p className="key">lore</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.lore)}</div>
                </div> : "" 
              }
              { (lore.regions) ? 
                <div className="info">
                  <p className="key">Regions</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.regions)}</div>
                </div> : "" 
              }
            </aside>
            <div className="mainContent">
              { (lore.quote) ? <i className="quote">{lore.quote}</i> : ""}

              {descriptionEntries}
            </div>

          </article>
        </section>
      </Page.Lore>
    )
  }

  getArticles(articles) {
    const lore = this.state.lore;
    let content = [WikiUtils.linkContent(lore, lore.description)];

    if (lore.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(lore, array)}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && lore.dmArticles ) {
      for ( let [heading, array] of Object.entries(lore.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(lore, array)}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Lore };

