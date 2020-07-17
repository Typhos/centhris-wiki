import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';
import DataLoader from 'components/utils/dataLoader';

import Page from 'components/page';
import "styles/groupArticle.scss";

const orgData = DataLoader.organizations;

class Organization extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: window.location.pathname,
      group: orgData[ decodeURI(window.location.pathname.split('/group/')[1] )],
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        group: orgData[decodeURI(window.location.pathname.split('/group/')[1])]
      });
    }
    
  }

  render () {
    const images = require.context('img/organizations/', true);
    const allImages = require.context('img/', true);

    const group = this.state.group;
    const descriptionEntries = this.getArticles(group.articles);

    return (
      <Page.Group>
        <TitleComponent title={`${group.name} - Centhris Wiki`} />
        <section id="group" className="article" >
          <article className="group" id={group.name.replace(/\s/g,"-")}>
            
            <Back/>

            <h2 className="fullName">{group.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{group.name}</h4>
              { images.keys().some(x => x.includes( group.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ images('./' + group.name.replace(/\s/g,"-") + '.png') }/>
              }
              {
                group.forceImg && allImages.keys().some( x => x.includes( group.forceImg )) &&
                <img className="portrait" alt="" src={ allImages( allImages.keys().filter( x => x.includes( group.forceImg ) ) ) }/>
              }
              { (group.type) ? 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{group.type}</p>
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
              { (group.memberNumber) ? 
                <div className="info">
                  <p className="key">Number of Members</p>
                  <div className="values">{WikiUtils.linkContent(group, group.memberNumber)}</div>
                </div> : "" 
              }
              { group.location &&
                <div className="info">
                  <p className="key">Location</p>
                  <div className="values">{WikiUtils.linkContent(group, group.location)}</div>
                </div>
              }
              { group.additionalImages && group.additionalImages.map( image => {
                  return (
                    <div className="info mapBox">
                        <img alt="" className="additional" src={images(`./${image}`)}/>
                    </div>
                  )
                })
              }
            </aside>
            <div className="mainContent">
              {WikiUtils.stubCheck(group)}
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
    let content = [WikiUtils.linkContent(group, WikiUtils.textFormatting( group.description ) )];

    if (group.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(group, WikiUtils.textFormatting( array ))}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && group.dmArticles ) {
      for ( let [heading, array] of Object.entries(group.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(group, WikiUtils.textFormatting( array ))}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Organization };

