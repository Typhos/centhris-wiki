import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';
import ListItem from 'components/categories/listItem';

import banner from "img/lore/banners/cosmos-banner.png";

class Cosmos extends Component {

  constructor (props) {
    super(props);

    const dmView = localStorage.getItem('dmView') === 'true';

    const planes = Object.keys(DataLoader.places).filter( place => {
      const placeData = DataLoader.places[place];
      if (placeData.type === "Plane") {
        if ( dmView || placeData.playerKnown === true ) {
          return true;
        }
      }
      return false;
    });

    this.state = {
      dmView: dmView,
      planes: planes,
      articleContent: DataLoader.all["Cosmos"]
    }

    this.getPlanes = this.getPlanes.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
  }

  render() {
    const numberOfArticles = Object.keys(this.state.planes).length;

    return (
      <Page.CategoryArticle>
        <TitleComponent title={`The Cosmos - Centhris Wiki`} />
        <Back/>

        <h1 className="article__heading">The Cosmos</h1>
        <div style={{
          display: "block",
          height:"100px",
          width: "100%",
          marginBottom: "2em",
          opacity: "90%",
          backgroundImage:`url(${banner})`,
          backgroundPosition: "center center"

        }}></div>
        
        <article className="article">
          <section className="article__content">
            { 
              WikiUtils.linkContent(this.state.articleContent, WikiUtils.textFormatting( this.state.articleContent.description), {"paragraphName": "article__paragraph", "linkName": "article__link"} )
            }
          </section>
        </article>
        
        <div className="category" style={{marginTop: "3em"}}>
          <h2 className="category__subheading">The Known Planes <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
          <ul className="category__list">
            {this.getPlanes(this.state.planes)}
          </ul>
        </div>
      </Page.CategoryArticle>
    );
  }

  getPlanes (planes) {
    return planes.sort().map( plane => {     
      return (
        <ListItem key={DataLoader.places[plane].name} entry={ DataLoader.places[plane] } imgStyle="" />
      )
    });
  }

  checkEmptyEntry(entry) {
    if (this.state.dmView && WikiUtils.stubCheck(entry) ) {
      return "empty";
    }

    return "";
  }
  
}

export { Cosmos };