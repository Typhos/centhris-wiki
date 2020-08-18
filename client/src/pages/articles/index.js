import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import Page from 'components/page';
import Back from 'components/back';
import InfoCard from 'components/infoCard';

import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';

class Article extends Component {

  constructor(props) {
    super(props);

    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0];
    const entryName = pathArray[1];

    this.state = {
      "pathname": window.location.pathname,
      "type": type,
      "entry": DataLoader.all[ decodeURI(entryName) ],
      "dmView": localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  static getDerivedStateFromProps (nextProps, prevState){
    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0];
    const entryName = pathArray[1];

    if ( nextProps.location.pathname !== prevState.pathname ) {
      return {
        "pathname": nextProps.location.pathname,
        "type": type,
        "entry": DataLoader.all[ decodeURI(entryName) ]
      };
    }
    return null;
  }
  
  getArticles(articles) {
    const {entry} = this.state;
    let content = [WikiUtils.linkContent(entry, WikiUtils.textFormatting( entry.description), {"paragraphName": "article__paragraph", "linkName": "article__link"} )];

    if (entry.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{heading}</h2>
            {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array), {"paragraphName": "article__paragraph", "linkName": "article__link"} )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && entry.dmArticles ) {
      for ( let [heading, array] of Object.entries(entry.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{heading}</h2>
            {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array ), {"paragraphName": "article__paragraph", "linkName": "article__link"} )}
          </React.Fragment>
        );
      }
    }

    return content;
  }

  render () {
    const { entry, type } = this.state;

    if ( !entry ) {
      return (
        <Redirect to="/404" />
      )
    }

    return (
      <Page.Article>
        <TitleComponent title={`${entry.name} - Centhris Wiki`} />
        
        <Back/>

        <article className="article" id={entry.name.replace(/\s/g,"-")}>
          <h1 className="article__heading">{entry.nickname}</h1>

          <InfoCard entry={entry} display={type} />

          <section className="article__content">
            { WikiUtils.stubCheck(entry) }
            { (entry.quote) ? <em className="article__quote">{entry.quote}</em> : ""}

            {
              this.getArticles(entry.articles)
            }
          </section>

        </article>
      </Page.Article>
    )
  }
}

export { Article };

