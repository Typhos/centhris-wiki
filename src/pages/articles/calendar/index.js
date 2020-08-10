import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import Page from 'components/page';
import getImgPath from "components/utils/getImgPath.js";
import { TitleComponent } from 'components/titleComponent.js';

class VesdarianCalendar extends Component {

  constructor(props) {
    super(props);

    this.getArticles = this.getArticles.bind(this);
    this.calendarGrid = this.calendarGrid.bind(this);
    this.getLunarPhase = this.getLunarPhase.bind(this);
    this.getMoons = this.getMoons.bind(this);
    this.updateYear = this.updateYear.bind(this);

    this.state = {
      pathname: window.location.pathname,
      lore: {...DataLoader.lore["The-Vesdarian-Calendar"]},
      dmView: localStorage.getItem('dmView') === 'true',
      calendarDay: DataLoader.calendar.year * DataLoader.calendar.year_len,
      year: DataLoader.calendar.year,
      calendarData: {...DataLoader.calendar},
      moonPhases: {...DataLoader.calendar.lunar_shf} 
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: window.location.pathname,
        lore: {...DataLoader.lore["The-Vesdarian-Calendar"]},
        dmView: localStorage.getItem('dmView') === 'true',
        calendarDay: DataLoader.calendar.year * DataLoader.calendar.year_len,
        year: DataLoader.calendar.year,
        calendarData: {...DataLoader.calendar},
        moonPhases: {...DataLoader.calendar.lunar_shf} 
      });
    }
    
  }

  render () {
    const lore = this.state.lore;
    const imgs = require.context('img/', true);
    const runes = require.context('img/runes/', true);

    const descriptionEntries = this.getArticles(lore.articles, "standard");
    const dmEntries = this.getArticles(lore.articles, "DM");

    return (
      <Page.Article>
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
              <div className="info mapBox">
                <a href={ new getImgPath("Vesdarian-Wheel").src } target="_blank"  rel="noopener noreferrer">
                  <img alt="Vesdarian Wheel" className="additional" src={new getImgPath("Vesdarian-Wheel").src}/>  
                </a>
              </div>
              { lore.type && 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{lore.type}</p>
                </div>
              }
            </aside>
            <div className="mainContent">
              {descriptionEntries}

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

              { this.calendarGrid() }

              {dmEntries}
            </div>

          </article>
        </section>
      </Page.Article>
    )
  }

  getArticles(articles, type) {
    const lore = this.state.lore;
    let content = [];

    if (lore.articles && type === "standard") {
      content.push( WikiUtils.linkContent(lore, WikiUtils.textFormatting( lore.description) ) );
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(lore,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && lore.dmArticles && type === "DM") {
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

  calendarGrid() {
    const calendar = this.state.calendarData;
    const currentYear = this.state.year;

    const grid = calendar.months.map( (month, monthNum) => {
      let rows = [];
      let weeks = [];

      for ( let i = 0; i < calendar.month_len[month]; i++ ) {
        this.state.calendarDay++;

        const moonStatus = this.getMoons(currentYear, this.state.calendarDay);
        let events = [];

        if ( moonStatus.phases[0] === 0 && moonStatus.phases[1] === 0 && moonStatus.phases[2] === 4 ) {
          events.push("Bloody Moon");
        } else if ( moonStatus.phases[0] === 4 && moonStatus.phases[1] === 0 && moonStatus.phases[2] === 0 ) {
          events.push("Amber Star");
        } else if ( moonStatus.phases[0] === 0 && moonStatus.phases[1] === 4 && moonStatus.phases[2] === 0 ) {
          events.push("Emerald Jewel");
        } else if ( moonStatus.phases[0] === 4 && moonStatus.phases[1] === 4 && moonStatus.phases[2] === 4 ) {
          events.push("Three Sisters");
        } else if ( moonStatus.phases[0] === 0 && moonStatus.phases[1] === 0 && moonStatus.phases[2] === 0 ) {
          events.push("Noctis Torvus");
        }

        weeks.push(
          <td key={this.state.calendarDay}>
            <p className="numericalDate">{i+1}</p>
            {moonStatus.markup}
            {events.length > 0 &&
              <p className="eventsHeading">Events(s)</p>
            }
            { events.length > 0 && 
              events.map( e => {
                return <li className="event" key={e}>{e}</li>
              })
            }
          </td>
        );
      }

      // force days of the week on top of all months but holidays;
      if (!calendar.festivals.includes(month)) {
        const daysOfTheWeek = calendar.weekdays.map( day => {
          return <td className="dayOfWeek">{day}</td>
        });

        rows.push(<tr>{daysOfTheWeek}</tr>);
      }

      for ( let i = 0; i < calendar.month_len[month] / calendar.week_len; i++) {
        const columns = weeks.splice( 0, calendar.week_len);

        rows.push(<tr key={month+`-`+i}>{columns}</tr>)
      }

      return (
        <table className={`month ${( calendar.festivals.includes(month) ) ? "festival" : ""}`} key={month}>
          <tbody>
            <tr>
              <td colSpan={ calendar.festivals.includes(month) ? calendar.month_len[month] : calendar.week_len } className="monthName">
                <h4>{month}</h4>
              </td>
            </tr>
            {rows}
          </tbody>
        </table>
      );
    });

    return (
      <div className="calendarGrid">
        
        <h3 className="subjectArea">
          <button className="changeYear previous" title="previous year" onClick={ () => { this.updateYear(-1)} } >&laquo;</button>
          <span>Calendar Year for {calendar.era} {this.state.year}</span>
          <button className="changeYear next" title="next year" onClick={ () => { this.updateYear(1)} }>&raquo;</button>
        </h3>
        
        {grid}
      </div>
    );
  }

  getLunarPhase(moon, dayOfTheYear) {
    const cycleLen = this.state.calendarData.lunar_cyc[moon];
    const phaseLen = cycleLen / 8;
    const shift = this.state.moonPhases[moon];
    const currentCycle = (dayOfTheYear+shift) % cycleLen;

    return Math.floor( currentCycle / phaseLen );
  }

  getMoons(year, date) {
    const calendar = this.state.calendarData;
    const moons = calendar.moons;
    let moonMarkup = [];
    let phases = [];

    // get the phases
    moons.forEach( moon => {
      phases.push( this.getLunarPhase(moon, date) );
    });


    // create markup based on the phases
    moonMarkup = moons.map( (moon, i) => {
      return <div title={moon} className={`moons ${moon} phase-${phases[i]}`}></div>;
    });



    return ({markup: moonMarkup, phases: phases})
  }

  updateYear(dateChange) {
    // Actions when user changes the year on the calendar
    let newStartDay; // = oldStartDay + ( this.state.calendarData.year_len * dateChange );

    if ( dateChange > 0 ) {
      newStartDay = this.state.calendarDay;
    } else {
      newStartDay = this.state.calendarDay - ( this.state.calendarData.year_len * 2 );
    }
    
    this.setState({
      calendarDay: newStartDay,
      year: this.state.year + dateChange
    });


  }
}

export { VesdarianCalendar };

