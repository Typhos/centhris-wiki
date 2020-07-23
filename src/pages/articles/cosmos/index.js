import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';
import ListItem from 'components/categories/listItem';
import "styles/locationArticle.scss";

import banner from "img/lore/banners/cosmos-banner.png";

class Cosmos extends Component {

  constructor (props) {
    super(props);

    const planes = Object.keys(DataLoader.places).filter( place => DataLoader.places[place].type === "Plane" );

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true',
      planes: planes,
      articleContent: DataLoader.all["Cosmos"]
    }

    this.getPlanes = this.getPlanes.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
  }

  render() {
    const numberOfArticles = Object.keys(this.state.planes).length;

    return (
      <Page.Location>
        <TitleComponent title={`The Cosmos - Centhris Wiki`} />
        <Back/>

        <h2 className="fullName">The Cosmos</h2>
        <div style={{
          display: "block",
          height:"100px",
          width: "100%",
          marginBottom: "2em",
          opacity: "90%",
          backgroundImage:`url(${banner})`,
          backgroundPosition: "center center"

        }}></div>
        
        { 
          WikiUtils.linkContent(this.state.articleContent, WikiUtils.textFormatting( this.state.articleContent.description) )
        }
        
        <div id="categories" className="columns" style={{marginTop: "3em"}}>
          <h2 className="sectionTitle">The Known Planes <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
          <ul className="sectionList">
            {this.getPlanes(this.state.planes)}
          </ul>
        </div>
      </Page.Location>
    );
  }

  getPlanes (planes) {
    return planes.sort().map( plane => {     
      return (
        <ListItem key={DataLoader.places[plane].name} entry={ DataLoader.places[plane] } imgStyle="portrait" />
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