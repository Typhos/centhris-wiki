import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Page from 'components/page';

import Back from 'components/back';
import StatBlock from 'components/articles/statBlock';

import "styles/groupArticle.scss";

const orgData = DataLoader.organizations;

class Organization extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: window.location.pathname,
      data: orgData[ decodeURI(window.location.pathname.split('/group/')[1] )],
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

    const data = this.state.data;
    const descriptionEntries = this.getArticles(data.articles);

    return (
      <Page.Default>
        <TitleComponent title={`${data.name} - Centhris Wiki`} />
        <section id="group" className="article" >
          <article className="group" id={data.name.replace(/\s/g,"-")}>
            
            <Back/>

            <h2 className="fullName">{data.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{data.name}</h4>
              { images.keys().some(x => x.includes( data.name.replace(/\s/g,"-") )) && 
                <img className="portrait" alt="" src={ images('./' + data.name.replace(/\s/g,"-") + '.png') }/>
              }
              {
                data.forceImg && allImages.keys().some( x => x.includes( data.forceImg )) &&
                <img className="portrait" alt="" src={ allImages( allImages.keys().filter( x => x.includes( data.forceImg ) ) ) }/>
              }
              { (data.type) ? 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{data.type}</p>
                </div> : "" 
              }
              { (data.leaders) ? 
                <div className="info">
                  <p className="key">Leader(s)</p>
                  <div className="values">{WikiUtils.linkContent(data, data.leaders)}</div>
                </div> : "" 
              }
              { (data.members) ? 
                <div className="info">
                  <p className="key">Members(s)</p>
                  <div className="values">{WikiUtils.linkContent(data, data.members)}</div>
                </div> : "" 
              }
              { (data.memberNumber) ? 
                <div className="info">
                  <p className="key">Number of Members</p>
                  <div className="values">{WikiUtils.linkContent(data, data.memberNumber)}</div>
                </div> : "" 
              }
              { data.location &&
                <div className="info">
                  <p className="key">Location</p>
                  <div className="values">{WikiUtils.linkContent(data, data.location)}</div>
                </div>
              }
              { data.additionalImages && data.additionalImages.map( image => {
                  return (
                    <div className="info mapBox">
                        <img alt="" className="additional" src={images(`./${image}`)}/>
                    </div>
                  )
                })
              }
            </aside>
            <div className="mainContent">
              {WikiUtils.stubCheck(data)}
              { (data.quote) ? <i className="quote">{data.quote}</i> : ""}

              {descriptionEntries}
            </div>

            <StatBlock entry={data}/>

          </article>
        </section>
      </Page.Default>
    )
  }

  getArticles(articles) {
    const data = this.state.data;
    let content = [WikiUtils.linkContent(data, WikiUtils.textFormatting( data.description ) )];

    if (data.articles) {
      for ( let [heading, array] of Object.entries(articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(data, WikiUtils.textFormatting( array ))}
          </React.Fragment>
        );
      }
    }

    
    if ( this.state.dmView && data.dmArticles ) {
      for ( let [heading, array] of Object.entries(data.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(data, WikiUtils.textFormatting( array ))}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { Organization };

