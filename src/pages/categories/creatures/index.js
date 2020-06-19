import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import { TitleComponent } from 'components/titleComponent.js';

import Filter from 'components/filter';
import Back from 'components/back';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/categories.scss';

class CreatureCategories extends Component {

  constructor (props) {
    super(props);

    const creatures = DataLoader.creatures;

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(creatures)) {
      if ( !obj.hideOnCat ) {
        if ( obj.playerKnown || dmView ) {
          filteredOutput[key] = obj;
        }
      }
    }

    const sortedCreatures = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = sortedCreatures.map( entry => {
      return creatures[entry].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      dmView: dmView,
      categories: WikiUtils.sortByName(categories),
      allCreatures: filteredOutput,
      creatures: sortedCreatures
    };

    this.getEntriesByCategory = this.getEntriesByCategory.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.creatures).length;
    const plural = function( category ) {
      // quick check for non-standard plurals, such as Monstrosity -> Monstrosities

      if ( category === "Fey" || category === "Undead" ) {
         return <h2 className="sectionTitle">{category}</h2>
      } else if ( category === "Monstrosity" ) {
        return <h2 className="sectionTitle">Monstrosities</h2>
      }
      
      return <h2 className="sectionTitle">{category}s</h2>
    }

    return (
      <Page.Default>
        <TitleComponent title={`Creatures - Centhris Wiki`} />
        <Back/>
        <Filter handleFilter={ this.handleFilter }  data={this.state.allCreatures}/>

        <h2 className="sectionGroup">Creatures of Centhris <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        <div id="categories" className="columns">
          {
            this.state.categories.map( category => {
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
            })
          }
        </div>
      </Page.Default>
    )
  }

  getEntriesByCategory(category) {
    const creatureImg = require.context('img/creatures/', false);

    return this.state.creatures.map( entry => {
      const creature = this.state.allCreatures[entry];

      if ( creature.type === category && ( creature.playerKnown || this.state.dmView ) ) {

        return (
          <li key={creature.name+category} className="entry">
            <Link to={`/creature/${creature.name.replace(/\s/g,"-")}`}>
              { creatureImg.keys().some(x => x.includes( creature.name.replace(/\s/g,"-") )) && 
                <img className={`landscape ${ this.checkEmptyEntry(creature)}`} alt="" src={ 
                  creatureImg(creatureImg.keys().filter( x => x.includes(creature.name.replace(/\s/g,"-") ) ) )
                }/>
              }
              {
                !creatureImg.keys().some(x => x.includes( creature.name.replace(/\s/g,"-") )) &&
                <div class="imgPlaceholder"></div>
              }
              { !creature.type.toLowerCase().includes("race") &&
                <p>{creature.name}</p>
              }
              { creature.type.toLowerCase().includes("race") &&
                <p>{creature.nickname}</p>
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
    if ( (!entry.description || entry.description.length <= 0) && this.state.dmView ) {
      return "empty";
    }

    return "";
  }

  handleFilter(results) {
    this.setState({creatures: results});
  }

}

export { CreatureCategories };

