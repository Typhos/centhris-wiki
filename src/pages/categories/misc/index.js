import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import { TitleComponent } from 'components/titleComponent.js';

import Search from 'components/search';
import Back from 'components/back';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/categories.scss';

class MiscellaneousCategories extends Component {

  constructor (props) {
    super(props);

    const data = DataLoader.misc;

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(data)) {
      if ( !obj.hideOnCat ) {
        if ( obj.playerKnown || dmView ) {
          filteredOutput[key] = obj;
        }
      }
    }

    const articles = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = articles.map( entry => {
      return data[entry].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      active: "All",
      dmView: dmView,
      combinedLore: data,
      lore: articles,
      categories: WikiUtils.sortByName(categories),
    };

    this.getEntriesByCategory = this.getEntriesByCategory.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.lore).length;
    const plural = function( category ) {
      if ( category === "World Lore" ) {
         return <h2 className="sectionTitle">{category}</h2>
      } else if ( category.toLowerCase().includes("deity") ) {
        return <h2 className="sectionTitle">{category.split(/\s/g)[0]} Deities</h2>
      } 

      return <h2 className="sectionTitle">{category}s</h2>
    }

    const categories = this.state.categories.map( category => {
      return (
        <div key={category} className={`category ${category.replace(/\s/g,"-")}`}>
          { this.getEntriesByCategory(category).filter( el => el !== undefined ).length !== 0 &&
            plural(category)
          }
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.LoreCategories>
        <TitleComponent title={`Lore - Centhris Wiki`} />
        <Back/>
        <Search handleSearch={ this.handleSearch }  data={this.state.combinedLore}/>

        <h2 className="sectionGroup">Miscellaneous <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        <div id="categories" >
          {categories}
        </div>
      </Page.LoreCategories>
    )
  }

  getEntriesByCategory(category) {
    const combinedLore = this.state.combinedLore;
    const imgs = require.context('img/', true);

    return this.state.lore.map( lore => {
      if ( this.state.combinedLore[lore].type === category && combinedLore[lore].subcatLink) {
        return (
          <li key={lore+category} className="entry">
            <Link to={ {pathname: `/${combinedLore[lore].subcatLink}`, state: "update"}}>
              { imgs.keys().some(x => x.includes( lore )) && 
                <img className={`landscape ${ this.checkEmptyEntry(lore)} ${(combinedLore[lore].doNotClipCatImg ) ? "noTilt" : ""}`} alt="" src={ imgs('./' + lore + '.png') }/>
              }
              <p>{combinedLore[lore].name}</p>
            </Link>
          </li>
        );
      } else if ( this.state.combinedLore[lore].type === category ) {

        return (
          <li key={lore+category} className="entry">
            <Link to={`/lore/${lore}`}>
              { imgs.keys().some(x => x.includes( lore )) && 
                <img 
                  className={`landscape ${ this.checkEmptyEntry([lore])} ${(combinedLore[lore].doNotClipCatImg ) ? "noTilt" : ""}`} 
                  alt="" 
                  src={ imgs( imgs.keys().filter(x => x.includes( combinedLore[lore].name.replace(/\s/g,"-") )) )} />
              }
              {
                !imgs.keys().some(x => x.includes( lore )) && 
                <div class="imgPlaceholder"></div>
              }
              { !this.state.combinedLore[lore].type.toLowerCase().includes("race") &&
                <p>{combinedLore[lore].name}</p>
              }
              { combinedLore[lore].type.toLowerCase().includes("race") &&
                <p>{combinedLore[lore].nickname}</p>
              }
            </Link>
          </li>
        )
      }

      return undefined;
    });
  }

  checkEmptyEntry(entry) {
    entry = this.state.combinedLore[entry];
    // check if the entry is empty to mark it for future writing
    if ( (!entry.description || entry.description.length <= 0) && this.state.dmView ) {
      return "empty";
    }

    return "";
  }

  handleSearch(results) {
    this.setState({lore: results});
  }

}

export { MiscellaneousCategories };

