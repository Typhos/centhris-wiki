import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import "styles/loreArticle.scss";

class Lore extends Component {

  constructor(props) {
    super(props);

    const combinedLore = {...DataLoader.gods, ...DataLoader.calendar, ...DataLoader.historical, ...DataLoader.lore, ...DataLoader.misc};

    this.state = {
      pathname: window.location.pathname,
      lore: combinedLore[ decodeURI(window.location.pathname.split('/lore/')[1]) ],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
    this.vesdarianCalendar = this.vesdarianCalendar.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const combinedLore = {...DataLoader.gods, ...DataLoader.calendar, ...DataLoader.historical, ...DataLoader.lore};

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
      <Page.Lore>
        <TitleComponent title={`${lore.name} - Centhris Wiki`} />
        <section id="lore" className="article" >
          <article className="lore" id={lore.name.replace(/\s/g,"-")}>
            <Back/>
            <h2 className="fullName">{lore.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{lore.name}</h4>
              { imgs.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ imgs( imgs.keys().filter(x => x.includes( lore.name.replace(/\s/g,"-") )) )}/>
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
                    <p className="key">Symbol(s)</p>
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
    let content = [WikiUtils.linkContent(lore, WikiUtils.textFormatting( lore.description) )];

    if ( lore.name === "The Vesdarian Calendar" ) {
      content.push( this.vesdarianCalendar() );
    }

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

  vesdarianCalendar () {
    const lore = this.state.lore;
    const runes = require.context('img/runes/', true);

    return (
      <React.Fragment key="vesdarianCalendar">
        <h3 className="subjectArea">The Twelve Months of the Vesdarian Calendar</h3>
        <table id="vesdarianCalendar">
          <thead>
            <tr className="tableHeading">
              <th></th>
              <th>Month</th>
              <th>Days</th>
              <th>Holidays</th>
            </tr>
          </thead>
          <tbody>
            <tr className="month">
              <td rowSpan="3" className="seasonCell spring">
                <p className="season">Spring</p>
              </td>
              <td>Mythosk</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "The Three Sisters Faire (6th)")}
                {WikiUtils.linkContent(lore, "Feast of St. Bastilen (19th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Jeden</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "The Carnival of Masks (12th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Unvar</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Okun lar Ustod (1st)")}
                {WikiUtils.linkContent(lore, "Rites of the Dawn (20th)")}
              </td>
            </tr>
            <tr className="festival">
              <td className="rune">
                <img alt="" src={runes('./80.svg')} />
              </td>
              <td>Yávan Asar</td>
              <td className="days">3</td>
              <td>
                {WikiUtils.linkContent(lore, "Cindercrown")}
              </td>
            </tr>

            <tr className="month">
              <td rowSpan="3" className="seasonCell summer">
                <p className="season">Summer</p>
              </td>
              <td>Tarnia</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Day of Herbs (2nd)")}
                {WikiUtils.linkContent(lore, "Red Blades (10-13th)")}
                {WikiUtils.linkContent(lore, "Starlight Vigil (20th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Singor</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Granting of the Rites (5th)")}
                {WikiUtils.linkContent(lore, "Craftsman’s Faire (22nd)")}
              </td>
            </tr>
            <tr className="month">
              <td>Dusvar</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Spearmoot (3rd)")}
                {WikiUtils.linkContent(lore, "Garron’s Eve (20th)")}
              </td>
            </tr>
            <tr className="festival">
              <td className="rune">
                <img alt="" src={runes('./73.svg')} />
              </td>
              <td>Virya’losse</td>
              <td className="days">3</td>
              <td>
                {WikiUtils.linkContent(lore, "Harvest Festival")}
              </td>
            </tr>
            
            <tr className="month">
              <td rowSpan="3" className="seasonCell autumn">
                <p className="season">Autumn</p>
              </td>
              <td>Ebosk</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Feast of Heroes (11th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Nylwis</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Lantern Vigil (1st)")}
                {WikiUtils.linkContent(lore, "Grey Harvest (16th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Ralshen</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Frostdawn (26th)")}
              </td>
            </tr>
            <tr className="festival">
              <td className="rune">
                <img alt="" src={runes('./41.svg')} />
              </td>
              <td>Merengyrth</td>
              <td className="days">5</td>
              <td>
                {WikiUtils.linkContent(lore, "Feast of the Dead")}
              </td>
            </tr>
            
            <tr className="month">
              <td rowSpan="3" className="seasonCell winter">
                <p className="season">Winter</p>
              </td>
              <td>Heskur</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Day of Mirth (4th)")}
                {WikiUtils.linkContent(lore, "Eve of the Glistening Sky (15th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Serybil</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Day of Absolution (12th)")}
              </td>
            </tr>
            <tr className="month">
              <td>Gonsaar</td>
              <td className="days">28</td>
              <td>
                {WikiUtils.linkContent(lore, "Dragon Dance Festival (9th)")}
                {WikiUtils.linkContent(lore, "Hammersong (28th)")}
              </td>
            </tr>
            <tr className="festival">
              <td className="rune">
                <img alt="" src={runes('./78.svg')} />
              </td>
              <td>Fui’en Velca</td>
              <td className="days">2</td>
              <td>
                {WikiUtils.linkContent(lore, "Festival of the New Life")}
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export { Lore };

