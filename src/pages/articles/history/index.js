import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';


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
    const { dates } = this.state;

    return (
      <Page.Article>
        <TitleComponent title={`${dates.name} - Centhris Wiki`} />
          <article className="article" id={dates.name.replace(/\s/g,"-")}>
            <Back/>

            <h1 className="article__heading">{dates.nickname}</h1>

            { (dates.quote) ? <em className="article__quote">{dates.quote}</em> : ""}

            {
              this.getArticles(dates.articles)
            }
            
          </article>
      </Page.Article>
    )
  }

  getArticles(articles) {
    const {dates} = this.state;
    let content = [ 
      WikiUtils.linkContent(
        dates, 
        WikiUtils.textFormatting( dates.description),
        {
          "paragraphName": "article__paragraph",
          "linkName": "article__link"
        }
      ) 
    ];

    if ( dates.name === "The Vesdarian Calendar" ) {
      content.push( this.vesdarianCalendar() );
    }

    if (dates.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{ heading }</h2>
            {
              WikiUtils.linkContent( dates,  WikiUtils.textFormatting( array), { "paragraphName": "article__paragraph", "linkName": "article__link"} )
            }
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && dates.dmArticles ) {
      for ( let [heading, array] of Object.entries(dates.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{ heading }</h2>
            {
              WikiUtils.linkContent( dates,  WikiUtils.textFormatting( array), { "paragraphName": "article__paragraph", "linkName": "article__link"} )
            }
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { History };

