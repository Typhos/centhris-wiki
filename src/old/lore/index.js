import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import Page from 'components/page';
import Back from 'components/back';
import InfoCard from 'components/infoCard';

import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';

const combinedLore = {
  ...DataLoader.gods, 
  ...DataLoader.holidays, 
  ...DataLoader.historical, 
  ...DataLoader.lore, 
  ...DataLoader.misc
};

class Lore extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "pathname": window.location.pathname,
      "entry": combinedLore[ decodeURI(window.location.pathname.split('/lore/')[1]) ],
      "dmView": localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  static getDerivedStateFromProps (nextProps, prevState){
    if ( nextProps.location.pathname !== prevState.pathname ) {
      return {
        "pathname": nextProps.location.pathname,
        "entry": combinedLore[ decodeURI(nextProps.location.pathname.split('/lore/')[1]) ]
      };
    }
    return null;
  }

  component

  render () {
    console.log(this.state)
    const { entry } = this.state;

    if ( !entry ) {
      return (
        <Redirect to="/404" />
      )
    }

    return (
      <Page.Article>
        <TitleComponent title={`${entry.name} - Centhris Wiki`} />
        <article className="article" id={entry.name.replace(/\s/g,"-")}>
          <Back/>

          <h1 className="article__heading">{entry.nickname}</h1>

          <InfoCard entry={entry} display="lore" />

          <section className="article__content">
            { WikiUtils.stubCheck(entry) }
            { (entry.quote) ? <i className="quote">{entry.quote}</i> : ""}

            {
              this.getArticles(entry.articles)
            }
          </section>

        </article>
      </Page.Article>
    )
  }

  getArticles(articles) {
    const {entry} = this.state;
    let content = [WikiUtils.linkContent(entry, WikiUtils.textFormatting( entry.description) )];

    if (entry.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{heading}</h2>
            {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && entry.dmArticles ) {
      for ( let [heading, array] of Object.entries(entry.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h2 className="article__headline">{heading}</h2>
            {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }

}

export { Lore };

