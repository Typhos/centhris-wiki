import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import { TitleComponent } from 'components/titleComponent.js';

import Filter from 'components/filter';
import Back from 'components/back';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/categories.scss';

class LoreCategories extends Component {

  constructor (props) {
    super(props);

    const combinedLore = DataLoader.lore;

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(combinedLore)) {
      if ( !obj.hideOnCat ) {
        if ( obj.playerKnown || dmView ) {
          filteredOutput[key] = obj;
        }
      }
    }

    const lore = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = lore.map( entry => {
      return combinedLore[entry].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      active: "All",
      dmView: dmView,
      combinedLore: combinedLore,
      lore: lore,
      categories: WikiUtils.sortByName(categories),
    };

    this.getEntriesByCategory = this.getEntriesByCategory.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.lore).length;
    const plural = function( category ) {
      if ( category === "World Lore" ) {
         return <h2 className="sectionTitle">{category}</h2>
      } else if ( category.toLowerCase().includes("deity") ) {
        return <h2 className="sectionTitle">{category.split(/\s/g)[0]} Deities</h2>
      } else if (category.toLowerCase().includes("world lore") ) {
        return <h2 className="sectionTitle">World Lore</h2>
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
        <Filter handleFilter={ this.handleFilter }  data={this.state.combinedLore}/>

        <h2 className="sectionGroup">Lore of Centhris <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        <div id="categories" >
          {categories}
        </div>
      </Page.LoreCategories>
    )
  }

  getEntriesByCategory(category) {
    const combinedLore = this.state.combinedLore;
    const loreImg = require.context('img/lore/', false);
    const creatures = require.context('img/creatures/', false);
    const gods = require.context('img/lore/gods/', false);

    return this.state.lore.map( lore => {
      if ( this.state.combinedLore[lore].type === category && combinedLore[lore].subcatLink) {
        return (
          <li key={lore+category} className="entry">
            <Link to={ {pathname: `/${combinedLore[lore].subcatLink}`, state: "update"}}>
              { loreImg.keys().some(x => x.includes( lore )) && 
                <img className={`landscape ${ this.checkEmptyEntry(lore)} ${(combinedLore[lore].doNotClipCatImg ) ? "noTilt" : ""}`} alt="" src={ loreImg('./' + lore + '.png') }/>
              }
              <p>{combinedLore[lore].name}</p>
            </Link>
          </li>
        );
      } else if ( this.state.combinedLore[lore].type === category ) {

        return (
          <li key={lore+category} className="entry">
            <Link to={`/lore/${lore}`}>
              { loreImg.keys().some(x => x.includes( lore )) && 
                <img className={`landscape ${ this.checkEmptyEntry([lore])} ${(combinedLore[lore].doNotClipCatImg ) ? "noTilt" : ""}`} alt="" src={ loreImg('./' + lore + '.png') }/>
              }
              { creatures.keys().some(x => x.includes( lore )) && 
                <img className={`portrait ${ this.checkEmptyEntry(combinedLore[lore]) }`} alt="" src={ creatures('./' + lore + '.png') }/>
              }
              {
                !loreImg.keys().some(x => x.includes( lore )) && creatures.keys().some(x => x.includes( lore )) && gods.keys().some(x => x.includes( lore )) && 
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

  handleFilter(results) {
    this.setState({lore: results});
  }

}

export { LoreCategories };

