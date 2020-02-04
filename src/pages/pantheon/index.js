import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import Back from '../../components/back';
import Search from '../../components/search';
import Page from '../../components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/categories.scss';

import godsData from 'data/lore/gods';

class Pantheon extends Component {

  constructor (props) {
    super(props);

    const combinedLore = DataLoader.gods;

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

    const gods = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = gods.map( entry => {
      return combinedLore[entry].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      dmView: dmView,
      combinedLore: combinedLore,
      gods: gods,
      categories: WikiUtils.sortByName(categories),
    };

    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getGods = this.getGods.bind(this);
  }

  render () {
    const categories = this.state.categories.map( category => {
      return (
        <div key={category} className={`category ${category.replace(/\s/g,"-")}`}>
          <h2 className="sectionTitle">{category.split(/\s/g)[0]} Deities</h2>
          <ul className="sectionList">
            {this.getGods(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.LoreCategories>
        <Back/>
        <Search handleSearch={ this.handleSearch } data={this.state.combinedLore}/>
        
        <h2 className="sectionGroup">The Centhrian Pantheon</h2>
        <div id="categories" >
          {categories}
        </div>
      </Page.LoreCategories>
    )
  }

  getGods (category) {
    const imgs = require.context('img/lore/gods/', false);

    return this.state.gods.map( god => {
      if ( godsData[god].type === category ) {
          return (
          <li key={god} className="entry">
            <Link to={`/lore/${god}`}>
              { imgs.keys().some(x => x.includes( god )) && 
                <img className={`portrait ${ this.checkEmptyEntry(godsData[god]) }`} alt="" src={ imgs('./' + god + '.png') }/>
              }
              <p>{godsData[god].name}</p>
            </Link>
          </li>
        )
      }

      return undefined;
    });
  }

  checkEmptyEntry(entry) {
    // check if the entry is empty to mark it for future writing
    if ( (!entry.description || entry.description.length <= 0) && this.state.dmView ) {
      return "empty";
    }

    return "";
  }

  handleSearch(results) {
    this.setState({gods: results});
  }

}

export { Pantheon };

