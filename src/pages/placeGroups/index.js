import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';

import Search from '../../components/search';
import Back from '../../components/back';
import Page from '../../components/page';
import WikiUtils from "components/utils/wikiUtils";

import 'styles/categories.scss';

class Places extends Component {

  constructor (props) {
    super(props);

    const combinedPlaces = DataLoader.places;

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    const dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(combinedPlaces)) {
      if ( !obj.hideOnCat ) {
        if ( obj.playerKnown || dmView ) {
          filteredOutput[key] = obj;
        }
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
        <div key={category} className="category">
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
        <Back/>
        <Search handleSearch={ this.handleSearch }  data={this.state.combinedPlaces}/>
        <h2 className="sectionGroup">Places</h2>
        <div id="categories" >
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
          <li key={place+category} className="entry">
            <Link to={`/location/${place}`}>
              { images.keys().some(x => x.includes( place )) && 
                <img className={`landscape ${ this.checkEmptyEntry(this.state.combinedPlaces[place]) }`} alt="" src={ images('./' + place + '.png') }/>
              }
              { crests.keys().some(x => x.includes( place )) &&  
                <img className={`crest ${ this.checkEmptyEntry(this.state.combinedPlaces[place]) }`} alt="" src={ crests('./' + place + '.png')  }/>
              }
              {
                !images.keys().some(x => x.includes( place )) && 
                <div className="imgPlaceholder"></div>
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
    // if ( entry.description.length <= 0 && this.state.dmView ) {
      // return "empty";
    // }

    return "";
  }

  handleSearch(results) {
    this.setState({places: results});
  }

}

export { Places };

