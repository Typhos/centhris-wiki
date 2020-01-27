import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/search';
import Page from '../../components/page';
import WikiUtils from "components/utils/wikiUtils";
import 'styles/places.scss';

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures from 'data/places/structures';
import worldRegions from 'data/places/worldRegions';
import politicalStates from 'data/places/politicalStates';
import cityDistricts from 'data/places/cityDistricts';
import cityStates from 'data/places/cityStates';
import settlements from 'data/places/settlements';
import dungeons from 'data/places/dungeons';
import fortifications from 'data/places/fortifications';
import dwarfHolds from 'data/places/dwarfHolds';

class Places extends Component {

  constructor (props) {
    super(props);

    const combinedPlaces = {...cityDistricts, ...structures,...dungeons, ...settlements, ...cityStates, ...politicalStates, ...worldRegions, ...fortifications, ...dwarfHolds};

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(combinedPlaces)) {
      if ( obj.playerKnown || dmView ) {
        filteredOutput[key] = obj;
      }
    }

    const places = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = places.map( place => {
      return combinedPlaces[place].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      dmView: dmView,
      combinedPlaces: combinedPlaces,
      places: places,
      categories: WikiUtils.sortByName(categories),
    };

    this.getEntriesByCategory = this.getEntriesByCategory.bind(this);
    this.checkEmptyEntry = this.checkEmptyEntry.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {

    const categories = this.state.categories.map( category => {
      return (
        <div className="category">
          { this.getEntriesByCategory(category).filter( el => el !== undefined ).length !== 0 &&
            <h2 className="sectionTitle">{category}s</h2>
          }
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.People>
        <Search handleSearch={ this.handleSearch }  data={this.state.combinedPlaces}/>
        <h2 className="sectionGroup">Places</h2>
        <div id="places" >
          {categories}
        </div>
      </Page.People>
    )
  }

  getEntriesByCategory(category) {
    const crests = require.context('img/crests/', true);
    const images = require.context('../../img/places/', true);

    return this.state.places.map( place => {
      if ( this.state.combinedPlaces[place].type === category ) {

        return (
          <li key={place+category} className="location">
            <Link to={`/location/${place}`}>
              { images.keys().some(x => x.includes( place )) && 
                <img className={`portrait ${ this.checkEmptyEntry(this.state.combinedPlaces[place]) }`} alt="" src={ images('./' + place + '.png') }/>
              }
              { crests.keys().some(x => x.includes( place )) &&  
                <img className={`crest ${ this.checkEmptyEntry(this.state.combinedPlaces[place]) }`} alt="" src={ crests('./' + place + '.png')  }/>
              }
              {
                !images.keys().some(x => x.includes( place )) && 
                <div class="imgPlaceholder"></div>
              }
              <p>{this.state.combinedPlaces[place].name}</p>
            </Link>
          </li>
        )
      }
      return undefined;
    });
  }

  checkEmptyEntry(entry) {
    // check if the entry is empty to mark it for future writing
    if ( entry.description.length <= 0 && this.state.dmView ) {
      return "empty";
    }

    return "";
  }

  handleSearch(results) {
    this.setState({places: results});
  }

}

export { Places };

