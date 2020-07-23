import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';
import "styles/timeline.scss";

class Timeline extends Component {

  constructor(props) {
    super(props);

    const dates = {...DataLoader.historical};

    this.state = {
      pathname: decodeURI(window.location.pathname),
      dates: dates,
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.timelineEntries = this.timelineEntries.bind(this);
    this.getSpacing = this.getSpacing.bind(this);
    this.orderDates = this.orderDates.bind(this);
  }

  render () {
    return (
      <Page.Default>
        <TitleComponent title={`Timeline - Centhris Wiki`} />
        <section id="lore" className="article" >
          <article className="lore" id="timeline">
            <Back/>

            <h2 className="fullName">Historical Timeline</h2>
            <ul id="datesLine">
              { this.timelineEntries() }
            </ul>
          </article>
        </section>
      </Page.Default>
    )
  }

  getSpacing (dates) {
    return dates.map( (date,i) => {
      const previous = dates[i-1];
      let previousEra = 0;
      let previousYear = 0;

      if (previous) {
        previousEra = parseInt(previous.split("C-")[0]);
        previousYear = parseInt(previous.split("C-")[1]);
      }

      if ( previous && parseInt(date.split("C-")[0]) === 1 && previousEra === 2 ) {
        // special dispensation for ERA change, since the system doesn't understand the shift
        return 3;
      } else if ( previous && previousEra !== parseInt(date.split("C-")[0]) ) {
        return 25;
      }

      if ( previous ) {
        let current = parseInt(date.split("C-")[1]);
        let space = Math.round( (previousYear - current) / 5);

        // if space is too small, spread things out a bit.
        if (space < 3) space = 3;
        // if space his HUGE, limit it.
        if (space > 50) space = 50;

        return space;
      }

      return 0;
    });
  }

  orderDates() {
    return Object.keys(this.state.dates).sort( (a,b) => {
      const aEra = parseInt( a.split("C-")[0] );
      const bEra = parseInt( b.split("C-")[0] );
      const aPost = parseInt( a.split("C-")[1] );
      const bPost = parseInt( b.split("C-")[1] );
      
      if ( aEra > bEra ) {
        return -1;
      } else if ( aEra < bEra) {
        return 1
      } else {
        return (aPost > bPost) ? -1 : 1;
      }
    });
  }

  timelineEntries() {
    const dates = this.orderDates();
    const spacing = this.getSpacing(dates);

    return dates.map( (date, i) => {
      const data = this.state.dates[date];

      if ( (data.playerKnown || this.state.dmView) && 
        
        ( 
          ( data.timeline.major && data.timeline.major.length > 0) || 
          ( data.timeline.minor && data.timeline.minor.length > 0) || 
          ( data.timeline.epoch && data.timeline.epoch.length > 0) || 
          ( data.timeline.gov && data.timeline.gov.length > 0) || 
          ( data.timeline.age && data.timeline.age.length > 0) || 
          ( data.timeline.players && data.timeline.players.length > 0) || 
          ( data.timeline.war && data.timeline.war.length > 0 )
        )

      ) {
      
        return (
          <li className="date" style={{"marginTop": spacing[i]+"em"}} key={date}>
            { (!data.hideDate || this.state.dmView) &&
              <h4 className="heading">{data.name} 
              { i === 0 &&
                <span className="currentYear">(Current Year)</span>
              }
              </h4>
            }
            { (data.hideDate && !this.state.dmView) &&
              <h4 className="heading">???</h4> 
            }
            { data.timeline.major && 
              data.timeline.major.map( event => {
                return <div key={event} title="Major Event" className="">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.epoch && 
              data.timeline.epoch.map( event => {
                return <div key={event} title="Epoch" className="epoch">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.age && 
              data.timeline.age.map( event => {
                return <div key={event} title="Age" className="age">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.players && 
              data.timeline.players.map( event => {
                return <div key={event} title="Age" className="pcs">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.gov && 
              data.timeline.gov.map( event => {
                return <div key={event} title="Age" className="gov">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.war && 
              data.timeline.war.map( event => {
                return <div key={event} title="War" className="war">{WikiUtils.linkContent( date, event )}</div>
              })
            }
            { data.timeline.minor && 
              data.timeline.minor.map( event => {
                return <div key={event} title="Minor Event" className="minor">{WikiUtils.linkContent( date, event )}</div>
              })
            }
          </li>
        );

      }

      return undefined;
    });
  }

}

export { Timeline };

