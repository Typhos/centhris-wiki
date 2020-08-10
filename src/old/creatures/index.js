import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { TitleComponent } from 'components/titleComponent.js';

import DataLoader from 'components/utils/dataLoader';
import WikiUtils from 'components/utils/wikiUtils';
import Back from 'components/back';
import Page from 'components/page';
import StatBlock from 'components/articles/statBlock';

import "styles/articles.scss";

class Creatures extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      pathname: decodeURI(window.location.pathname),
      creature: decodeURI(window.location.pathname.split('/creature/')[1]),
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
    this.hiddenStats = this.hiddenStats.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        creature: decodeURI(window.location.pathname.split('/creature/')[1])
      });
    }
  }

  render () {

    const images = require.context('img/creatures/', true);
    const all = DataLoader.creatures;
    const creature = all[this.state.creature];

    if (!creature) {
      return (
        <Redirect to="/404" />
      )
    }

    const imgPath = images.keys().some( x => x.includes( creature.name.replace(/\s/g,"-") )) &&  images('./' + creature.name.replace(/\s/g,"-") + '.png');

    return (
      <Page.Article>
        <article className="article creature" >
          <TitleComponent title={`${creature.name} - Centhris Wiki`} />
          <Back/>

          <h2 className="fullName">{creature.nickname}</h2>
          
          <aside className={`infoBox ${ this.state.dmView || ""}`}>
            <h4 className="nickname">{creature.name}</h4>
            <img className="portrait" alt="" src={imgPath}/>
            { creature.creatureType &&
              <div className="info affiliations">
                <p className="key">Type</p>
                <p className="values">{WikiUtils.textFormatting(creature.creatureType)}</p>
              </div>
            }
            { creature.affiliations &&
              <div className="info affiliations">
                <p className="key">Affiliation(s)</p>
                <div className="values">{WikiUtils.linkContent(creature, creature.affiliations)}</div>
              </div>
            }
            { this.state.dmView &&
              this.hiddenStats(creature)
            }
          </aside>
          <div className="mainContent">
            { creature.quote && <i className="quote">{creature.quote}</i> }
            { this.getArticles(creature) }
          </div>

          { ( this.state.dmView || creature.showStatBlock ) &&
            <StatBlock entry={creature}/>
          }
        </article>
      </Page.Article>
    )
  }

  hiddenStats(creature) {
    const stats = creature.statBlock;

    return <React.Fragment>
      { stats.challenge && 
        <div className="info">
          <p className="key">Challenge</p>
          <p className="values">{stats.challenge}</p>
        </div>
      }
      { stats.alignment && this.state.dmView && 
        <div className="info">
          <p className="key">Alignment</p>
          <p className="values">{stats.alignment}</p>
        </div>
      }
    </React.Fragment>
  }

  getArticles(creature) {
    let content = [WikiUtils.linkContent(creature, WikiUtils.textFormatting( creature.description) )];

    if (creature.articles) {
      for ( let [heading, array] of Object.entries(creature.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(creature, WikiUtils.textFormatting(array))}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && creature.dmArticles ) {
      for ( let [heading, array] of Object.entries(creature.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(creature, WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Creatures };

