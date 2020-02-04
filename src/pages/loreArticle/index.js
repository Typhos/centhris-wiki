import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Back from '../../components/back';

import Page from 'components/page';
import godsData from 'data/lore/gods';
import racesData from 'data/lore/races';
import eventsData from 'data/lore/events';
import creaturesData from 'data/lore/creatures';
import loreData from 'data/lore/lore';
import calendarData    from 'data/lore/calendar';
import itemData    from 'data/lore/items';

import "styles/loreArticle.scss";

class Lore extends Component {

  constructor(props) {
    super(props);

    const combinedLore = {...godsData, ...racesData, ...eventsData, ...creaturesData, ...loreData,...calendarData, ...itemData};

    this.state = {
      pathname: window.location.pathname,
      lore: combinedLore[window.location.pathname.split('/lore/')[1]],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
    this.vesdarianCalendar = this.vesdarianCalendar.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    const combinedLore = {...godsData, ...racesData, ...eventsData, ...creaturesData, ...loreData,...calendarData};

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
    const items = require.context('img/lore/items/', false);

    const arrayToLi = function(value) {
      return value.map( val => <li className="value" key={val} >{val}</li>);
    }

    const shrineImg = lore.shrineImg && lore.shrineImg.map( image => {
      return (
        <div key={lore.name} className="info mapBox">
          <p className="key">Shrine</p>
          <img alt="" className="additional" src={gods(`./${image}`)}/>
        </div>
      )
    });

    return (
      <Page.Lore>
        <section id="lore" className="article" >
          <article className="lore" id={lore.name.replace(/\s/g,"-")}>
            <Back/>
            <h2 className="fullName">{lore.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{lore.name}</h4>
              { loreImg.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ loreImg('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { lore.name === "The Vesdarian Calendar" && 
                <div className="info">
                  <p className="key">
                    <a href={loreImg('./' + lore.name.replace(/\s/g,"-") + '.png')} target="_blank"  rel="noopener noreferrer">Full Calendar</a>
                  </p>
                </div>
              }
              { creatures.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ creatures('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { gods.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ gods('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
              }
              { items.keys().some(x => x.includes( lore.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ items('./' + lore.name.replace(/\s/g,"-") + '.png') }/>
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
      {/* CALENDAR EVENTS & RELATED */}
              {
                lore.date && 
                <div className="Worshipers info">
                  <p className="key">Date</p>
                  <div className="values">{WikiUtils.linkContent(lore, lore.date)}</div>
                </div>
              }
              {
                lore.associations && 
                <div className="Worshipers info">
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
    let content = [WikiUtils.linkContent(lore, lore.description)];

    if ( lore.name === "The Vesdarian Calendar" ) {
      content.push( this.vesdarianCalendar() );
    }

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

  vesdarianCalendar () {
    const lore = this.state.lore;
    const runes = require.context('../../img/runes/', true);

    return (
      <React.Fragment>
        <h3 className="subheading">The Twelve Months of the Vesdarian Calendar</h3>
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
                {WikiUtils.linkContent(lore, "The Three Sisters Faire (6th), Feast of St. Bastilen (19th)")}
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
                {WikiUtils.linkContent(lore, "Okun lar Ustod (1st), Rites of the Dawn (20th)")}
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

