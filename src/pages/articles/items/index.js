import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import "styles/loreArticle.scss";

class ItemArticle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: decodeURI(window.location.pathname),
      item: decodeURI(window.location.pathname.split('/item/')[1]),
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        item: decodeURI(window.location.pathname.split('/item/')[1])
      });
    }
  }

  render () {
    const images = require.context("img/items/", true);
    const all = DataLoader.items;
    const item = all[this.state.item];
    const imgPath = images.keys().some( x => x.includes( item.name.replace(/\s/g,"-") )) &&  images('./' + item.name.replace(/\s/g,"-") + '.png');

    if ( !item ) {
      return (
        <Redirect to="/404" />
      )
    }
    
    return (
      <Page.Default>
        <section id="item" className="article" >
          <article className="lore item" id={item.name.replace(/\s/g,"-")}>
            <TitleComponent title={`${item.name} - Centhris Wiki`} />
            <Back/>
            <h2 className="fullName">{item.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{item.name}</h4>
              <img className="portrait" alt="" src={imgPath}/>  
              { item.type && 
                <div className="info">
                  <p className="key">Type</p>
                  <p className="values">{item.type}</p>
                </div>
              }
              {item.type !== "Ship" && item.class &&
                <div className="info">
                  <p className="key">Class</p>
                  <div className="values">
                    {WikiUtils.linkContent(item, item.class)}
                  </div>
                </div>
              }
      {/* MAGIC ITEM RELATED */}        
              {item.rarity &&
                <div className="info">
                  <p className="key">Rarity</p>
                  <div className="values">{item.rarity}</div>
                </div>
              } 
              {item.attunement &&
                <div className="info">
                  <div className="values">Requires Attunement</div>
                </div>
              }
      {/* WEAPON RELATED */}
              {item.type === "Weapon" && item.cost &&
                <div className="info">
                  <p className="key">Cost</p>
                  <div className="values">{item.cost}</div>
                </div>
              }
              {item.type === "Weapon" && item.weight &&
                <div className="info">
                  <p className="key">Weight</p>
                  <div className="values">{item.weight}</div>
                </div>
              }
              {item.type === "Weapon" && item.damage &&
                <div className="info">
                  <p className="key">Damage</p>
                  <div className="values">{item.damage}</div>
                </div>
              }
              {item.type === "Weapon" && item.properties &&
                <div className="info">
                  <p className="key">Properties</p>
                  <div className="values">
                    {WikiUtils.linkContent(item, item.properties)}
                  </div>
                </div>
              }
      {/* SHIP RELATED */}
              {item.type === "Ship" && item.class &&
                <div className="info">
                  <p className="key">Ship Class</p>
                  <div className="values">{WikiUtils.linkContent(item, item.class)}</div>
                </div>
              }
              {item.type === "Ship" && item.speed &&
                <div className="info">
                  <p className="key">Speed</p>
                  <div className="values">{WikiUtils.linkContent(item, item.speed)}</div>
                </div>
              }
            </aside>
            <div className="mainContent">
              { item.quote && <i className="quote">{item.quote}</i> }
              { this.getArticles(item) }
            </div>

          </article>
        </section>
      </Page.Default>
    )
  }

  getArticles(item) {
    let content = [WikiUtils.linkContent(item, WikiUtils.textFormatting( item.description) )];

    if (item.articles) {
      for ( let [heading, array] of Object.entries(item.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(item, WikiUtils.textFormatting(array))}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && item.dmArticles ) {
      for ( let [heading, array] of Object.entries(item.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(item, WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}

export { ItemArticle };

