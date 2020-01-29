import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";

import Page from 'components/page';
import godsData from 'data/lore/gods';
import racesData from 'data/lore/races';
import eventsData from 'data/lore/events';
import creaturesData from 'data/lore/creatures';
import loreData from 'data/lore/lore';

import "styles/loreArticle.scss";

class Lore extends Component {

  constructor(props) {
    super(props);

    const combinedLore = {...godsData, ...racesData, ...eventsData, ...creaturesData, ...loreData};

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

    const arrayToLi = function(value) {
      return value.map( val => <li className="value" key={val} >{val}</li>);
    }

    return (
      <Page.Lore>
        <section id="lore" className="article" >
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
              { lore.type && 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{lore.type}</p>
                </div>
              }
              { lore.alignment && 
                  <div className="info">
                    <p className="key">Alignment</p>
                    <p className="values big">{lore.alignment}</p>
                  </div>
              }
              { lore.trueName && 
                  <div className="info">
                    <p className="key">True Name</p>
                    <p className="values big">{lore.trueName}</p>
                  </div>
              }
              { lore.gender && 
                  <div className="info">
                    <p className="key">Gender</p>
                    <p className="values big">{lore.gender}</p>
                  </div>
              }
              { lore.symbol && 
                  <div className="info">
                    <p className="key">Symbol</p>
                    <p className="values big">{lore.symbol}</p>
                  </div>
              }
              { lore.portfolio && 
                  <div className="Portfolio info">
                    <p className="key">Portfolio</p>
                    <ul className="values">
                      { arrayToLi(lore.portfolio) }
                    </ul>
                  </div>
              }
              { lore.majorTemples && 
                <div className="Titles info">
                  <p className="key">Major Temple(s)</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.majorTemples)}</div>
                </div>
              }
              { lore.titles && 
                <div className="Titles info">
                  <p className="key">Title(s)</p>
                  <ul className="values">
                    { arrayToLi(lore.titles) }
                  </ul>
                </div>
              }
              {
                lore.worshipers && 
                <div className="Worshipers info">
                  <p className="key">Worshipers</p>
                  <ul className="values">
                    { arrayToLi(lore.worshipers) }
                  </ul>
                </div>
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

