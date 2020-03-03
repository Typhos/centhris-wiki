import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from '../../components/back';

import Page from 'components/page';

import "styles/loreArticle.scss";

class History extends Component {

  constructor(props) {
    super(props);

    const dates = {...DataLoader.historical};

    this.state = {
      pathname: window.location.pathname,
      dates: dates[ decodeURI(window.location.pathname.split('/history/')[1]) ],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    const dates = {...DataLoader.historical};

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        dates: dates[ decodeURI(window.location.pathname.split('/history/')[1]) ]
      });
    }
    
  }

  render () {
    const dates = this.state.dates;
    console.log(dates)
    const descriptionEntries = this.getArticles(dates.articles);

    return (
      <Page.Lore>
        <section id="lore" className="article" >
          <article className="lore" id={dates.name.replace(/\s/g,"-")}>
            <Back/>
            <h2 className="fullName">{dates.nickname}</h2>
            <div className="mainContent">
              { (dates.quote) ? <i className="quote">{dates.quote}</i> : ""}

              {descriptionEntries}
            </div>

          </article>
        </section>
      </Page.Lore>
    )
  }

  getArticles(articles) {
    const dates = this.state.dates;
    let content = [WikiUtils.linkContent(dates, WikiUtils.textFormatting( dates.description) )];

    if ( dates.name === "The Vesdarian Calendar" ) {
      content.push( this.vesdarianCalendar() );
    }

    if (dates.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(dates,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && dates.dmArticles ) {
      for ( let [heading, array] of Object.entries(dates.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(dates,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { History };

