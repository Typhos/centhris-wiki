import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WikiUtils from "components/utils/wikiUtils";

import placeData from 'data/places';
import characterData from 'data/characters';
import peopleData from 'data/people';
import orgData from 'data/organizations';

import Page from 'components/page';
import "styles/groupArticle.scss";

const images = require.context('img/organizations/', true);

class Group extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: orgData[window.location.pathname.split('/group/')[1]],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  render () {
    const group = this.state.group;
    console.log(group)

    // const races = location.races && location.races.map( race => <span className="race commaSeparated">{ WikiUtils.linkContent(location, race) }</span> );

    function nickname() {
      if (group.nickname) {
        if ( Array.isArray(group.nickname) ) {
          return ( <h4 className="nickname">{group.nickname[0]}</h4> )
        }
        return ( <h4 className="nickname">{group.nickname}</h4> )
      }
    }

    const descriptionEntries = this.getArticles(group.articles);

    return (
      <Page.Group>
        <section id="group" >
          <article className="group" id={group.name.replace(/\s/g,"-")}>
            
            <Link className="backLink" to='/organizations'>&laquo; back to Organizations</Link>

            <h2 className="fullName">{group.name}</h2>
            <aside className="infoBox">
              { nickname() }          
              <img className="portrait" alt="" src={ images('./' + group.name.replace(/\s/g,"-") + '.png') }/>
              { (group.type) ? 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{group.type}</p>
                </div> : "" 
              }
              { (group.population) ? 
                <div className="info">
                  <p className="key">Population</p>
                  <p className="values">{group.population}</p>
                </div> : "" 
              }
              { (group.government) ? 
                <div className="info">
                  <p className="key">Government</p>
                  <p className="values">{group.government}</p>
                </div> : "" 
              }
              { (group.currency) ? 
                <div className="info">
                  <p className="key">Currency</p>
                  <p className="values">{group.currency}</p>
                </div> : "" 
              }
              { (group.capital) ? 
                <div className="info">
                  <p className="key">Capital City</p>
                  <p className="values">{WikiUtils.linkContent(group, group.capital)}</p>
                </div> : "" 
              }
              { (group.leaders) ? 
                <div className="info">
                  <p className="key">Leader(s)</p>
                  <div className="values">{WikiUtils.linkContent(group, group.leaders)}</div>
                </div> : "" 
              }
              { (group.members) ? 
                <div className="info">
                  <p className="key">Members(s)</p>
                  <div className="values">{WikiUtils.linkContent(group, group.members)}</div>
                </div> : "" 
              }
              { (group.races) ? 
                <div className="info">
                  <p className="key">Race(s)</p>
                  <div className="races values">{WikiUtils.linkContent(group, group.races)}</div>
                </div> : "" 
              }
              { (group.nation) ? 
                <div className="info">
                  <p className="key">State</p>
                  <div className="values">{WikiUtils.linkContent(group, group.nation)}</div>
                </div> : "" 
              }
              { (group.group) ? 
                <div className="info">
                  <p className="key">group</p>
                  <div className="values">{WikiUtils.linkContent(group, group.group)}</div>
                </div> : "" 
              }
              { (group.regions) ? 
                <div className="info">
                  <p className="key">Regions</p>
                  <div className="values">{WikiUtils.linkContent(group, group.regions)}</div>
                </div> : "" 
              }
            </aside>
            <div className="mainContent">
              { (group.quote) ? <i className="quote">{group.quote}</i> : ""}

              {descriptionEntries}
            </div>

          </article>
        </section>
      </Page.Group>
    )
  }

  getArticles(articles) {
    const group = this.state.group;
    let content = [WikiUtils.linkContent(group, group.description)];

    if (group.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(group, array)}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && group.dmArticles ) {
      for ( let [heading, array] of Object.entries(group.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(group, array)}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Group };

