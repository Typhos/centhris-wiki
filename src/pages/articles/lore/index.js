import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

class Lore extends Component {

  constructor(props) {
    super(props);

    const combinedLore = {...DataLoader.gods, ...DataLoader.holidays, ...DataLoader.historical, ...DataLoader.lore, ...DataLoader.misc};

    this.state = {
      pathname: window.location.pathname,
      lore: combinedLore[ decodeURI(window.location.pathname.split('/lore/')[1]) ],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const combinedLore = {...DataLoader.gods, ...DataLoader.holidays, ...DataLoader.historical, ...DataLoader.lore};

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        lore: combinedLore[ decodeURI(window.location.pathname.split('/lore/')[1]) ]
      });
    }
    
  }

  render () {
    const lore = this.state.lore;

    if ( !lore ) {
      return (
        <Redirect to="/404" />
      )
    }

    const descriptionEntries = this.getArticles(lore.articles);
    const imgs = require.context('img/', true);

    const arrayToLi = function(value) {
      return value.map( val => <li className="value" key={val} >{val}</li>);
    }

    const shrineImg = lore.shrineImg && lore.shrineImg.map( image => {

      if ( imgs.keys().some(x => x.includes( image.replace(/\s/g,"-") )) ) {
        return (
          <div key={lore.name} className="info mapBox">
            <p className="key">Shrine</p>
            <img alt="" className="additional" src={ imgs(imgs.keys().filter(x => x.includes( image.replace(/\s/g,"-") ))) }/>
          </div>
        )
      }

      return undefined;
    });

    return (
      <Page.Default>
        <TitleComponent title={`${lore.name} - Centhris Wiki`} />
        <section id="lore" className="article" >
          <article className="lore" id={lore.name.replace(/\s/g,"-")}>
            <Back/>
            <h2 className="fullName">{lore.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{lore.name}</h4>
              { imgs.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ imgs( imgs.keys().filter(x => x.includes( lore.name.replace(/\s/g,"-") ))[0] ) }/>
              }
              { lore.name === "The Vesdarian Calendar" && 
                <div className="info">
                  <p className="key">
                    <a href={imgs( imgs.keys().filter(x => x.includes( lore.name.replace(/\s/g,"-") )) )} target="_blank"  rel="noopener noreferrer">Full Size Image</a>
                  </p>
                </div>
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
                    <p className="values">{lore.alignment}</p>
                  </div>
              }
              { lore.trueName && 
                  <div className="info">
                    <p className="key">True Name</p>
                    <p className="values">{lore.trueName}</p>
                  </div>
              }
              { lore.gender && 
                  <div className="info">
                    <p className="key">Gender</p>
                    <p className="values">{lore.gender}</p>
                  </div>
              }
              { lore.symbol && 
                  <div className="info">
                    <p className="key">Symbol(s)</p>
                    <p className="values">{lore.symbol}</p>
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
              {lore.type !== "Ship" && lore.class &&
                <div className="info">
                  <p className="key">Class</p>
                  <div className="values">
                    {WikiUtils.linkContent(lore, lore.class)}
                  </div>
                </div>
              }
      {/* WEAPON RELATED */}
              {lore.type === "Weapon" && lore.cost &&
                <div className="info">
                  <p className="key">Cost</p>
                  <div className="values">{lore.cost}</div>
                </div>
              }
              {lore.type === "Weapon" && lore.weight &&
                <div className="info">
                  <p className="key">Weight</p>
                  <div className="values">{lore.weight}</div>
                </div>
              }
              {lore.type === "Weapon" && lore.damage &&
                <div className="info">
                  <p className="key">Damage</p>
                  <div className="values">{lore.damage}</div>
                </div>
              }
              {lore.type === "Weapon" && lore.properties &&
                <div className="info">
                  <p className="key">Properties</p>
                  <div className="values">
                    {WikiUtils.linkContent(lore, lore.properties)}
                  </div>
                </div>
              }
      {/* SHIP RELATED */}
              {lore.type === "Ship" && lore.class &&
                <div className="info">
                  <p className="key">Ship Class</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.class)}</div>
                </div>
              }
              {lore.type === "Ship" && lore.speed &&
                <div className="info">
                  <p className="key">Speed</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.speed)}</div>
                </div>
              }
      {/* CALENDAR EVENTS & RELATED */}
              {
                lore.dates && 
                <div className="info dates">
                  <p className="key">Date(s)</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.dates)}</div>
                </div>
              }
              {
                lore.date && 
                <div className="info">
                  <p className="key">Date</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.date)}</div>
                </div>
              }
              {
                lore.associations && 
                <div className="info">
                  <p className="key">Associated with</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.associations)}</div>
                </div>
              }
              { 
                shrineImg 
              }
            </aside>
            <div className="mainContent">
              { WikiUtils.stubCheck(lore) }
              { (lore.quote) ? <i className="quote">{lore.quote}</i> : ""}

              {descriptionEntries}
            </div>

          </article>
        </section>
      </Page.Default>
    )
  }

  getArticles(articles) {
    const lore = this.state.lore;
    let content = [WikiUtils.linkContent(lore, WikiUtils.textFormatting( lore.description) )];

    if (lore.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(lore,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && lore.dmArticles ) {
      for ( let [heading, array] of Object.entries(lore.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(lore,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }

}

export { Lore };

