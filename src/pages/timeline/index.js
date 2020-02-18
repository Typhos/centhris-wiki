import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from '../../components/back';

import Page from 'components/page';
import "styles/timeline.scss";

class Timeline extends Component {

  constructor(props) {
    super(props);

    const dates = {...DataLoader.historical};

    this.state = {
      pathname: window.location.pathname,
      dates: dates,
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.timelineEntries = this.timelineEntries.bind(this);
  }

  render () {
    return (
      <Page.Default>
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

  timelineEntries() {
    let dates = Object.keys(this.state.dates).sort( (a,b) => {
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

    const spacing = dates.map( (date,i) => {
      const previous = dates[i-1];
      let previousEra = 0;
      let previousYear = 0;

      if (previous) {
        previousEra = parseInt(previous.split("C-")[0]);
        previousYear = parseInt(previous.split("C-")[1]);
      }

      if ( previous && previousEra !== parseInt(date.split("C-")[0]) ) return 25;
      if ( previous ) {
        let current = parseInt(date.split("C-")[1]);
        let space = Math.round( (previousYear - current) / 5);

        if (space < 3) space = 3;

        return space;
      }

      return 0;
    });

    return dates.map( (date, i) => {
      const data = this.state.dates[date];

      if ( (data.playerKnown || this.state.dmView) && ( data.timeline.major.length > 0 || data.timeline.minor.length > 0 ) ) {
      
        return (
          <li className="date" style={{"margin-top": spacing[i]+"em"}} key={date}>
            <h4 className="heading">{data.name}</h4>
            {
              data.timeline.major.map( event => {
                return WikiUtils.linkContent( date, event )
              })
            }
            {
              data.timeline.minor.map( event => {
                return <div key={event} className="minor">{WikiUtils.linkContent( date, event )}</div>
              })
            }
          </li>
        );

      }
    });
  }

}

export { Timeline };

