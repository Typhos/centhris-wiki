import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/search';
import Page from '../../components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/categories.scss';

import eventsData from 'data/lore/events';
import godsData from 'data/lore/gods';
import racesData from 'data/lore/races';
import creaturesData from 'data/lore/creatures';
import loreData from 'data/lore/lore';

class LoreCategories extends Component {

  constructor (props) {
    super(props);

    const combinedLore = {...eventsData, ...racesData, ...godsData, ...creaturesData, ...loreData};

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(combinedLore)) {
      if ( obj.playerKnown || dmView ) {
        filteredOutput[key] = obj;
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
    this.handleSearch = this.handleSearch.bind(this);
    this.limitCategories = this.limitCategories.bind(this);
  }

  render () {
    const noSCategories = [];

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
        <div className={`category ${category.replace(/\s/g,"-")}`}>
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
        <Search handleSearch={ this.handleSearch }  data={this.state.combinedLore}/>
        <nav className="subNav">
          <ul className="navList">
            <li className={`navElement ${ (this.state.active === "All") ? "active" : "" }`}  onClick={this.limitCategories}>All</li>
            <li className={`navElement ${ (this.state.active === "Gods") ? "active" : "" }`} onClick={this.limitCategories}>Gods</li>
            <li className={`navElement ${ (this.state.active === "Races") ? "active" : "" }`} onClick={this.limitCategories}>Races</li>
            <li className={`navElement ${ (this.state.active === "Events") ? "active" : "" }`} onClick={this.limitCategories}>Events</li>
            <li className={`navElement ${ (this.state.active === "Monsters") ? "active" : "" }`} onClick={this.limitCategories}>Monsters</li>
          </ul>
        </nav>

        <h2 className="sectionGroup">The Lore of Centhris</h2>
        <div id="categories" >
          {categories}
        </div>
      </Page.LoreCategories>
    )
  }

  limitCategories(e) {
    const category = e.target.innerText;

    this.setState({active: category});
  }

  getEntriesByCategory(category) {
    const loreImg = require.context('img/lore/', false);
    const creatures = require.context('img/lore/creatures/', false);
    const gods = require.context('img/lore/gods/', false);

    return this.state.lore.map( lore => {
      if ( this.state.combinedLore[lore].type === category ) {

        return (
          <li key={lore+category} className="entry">
            <Link to={`/lore/${lore}`}>
              { loreImg.keys().some(x => x.includes( lore )) && 
                <img className={`portrait ${ this.checkEmptyEntry(this.state.combinedLore[lore]) }`} alt="" src={ loreImg('./' + lore + '.png') }/>
              }
              { creatures.keys().some(x => x.includes( lore )) && 
                <img className={`portrait ${ this.checkEmptyEntry(this.state.combinedLore[lore]) }`} alt="" src={ creatures('./' + lore + '.png') }/>
              }
              { gods.keys().some(x => x.includes( lore )) && 
                <img className={`portrait ${ this.checkEmptyEntry(this.state.combinedLore[lore]) }`} alt="" src={ gods('./' + lore + '.png') }/>
              }
              {
                !loreImg.keys().some(x => x.includes( lore )) && creatures.keys().some(x => x.includes( lore )) && gods.keys().some(x => x.includes( lore )) && 
                <div class="imgPlaceholder"></div>
              }
              { !this.state.combinedLore[lore].type.toLowerCase().includes("race") &&
                <p>{this.state.combinedLore[lore].name}</p>
              }
              { this.state.combinedLore[lore].type.toLowerCase().includes("race") &&
                <p>{this.state.combinedLore[lore].nickname}</p>
              }
            </Link>
          </li>
        )
      }
      return undefined;
    });
  }

  checkEmptyEntry(entry) {
    // check if the entry is empty to mark it for future writing
    if ( !entry.description || entry.description.length <= 0 && this.state.dmView ) {
      return "empty";
    }

    return "";
  }

  handleSearch(results) {
    this.setState({lore: results});
  }

}

export { LoreCategories };

