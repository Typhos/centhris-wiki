import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import Search from '../../components/search';
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

const combinedPlaces = Object.assign(structures, worldRegions, politicalStates, cityDistricts, cityStates, settlements, dungeons, fortifications);
const images = require.context('../../img/places/', true);

class Places extends Component {

  constructor (props) {
    super(props);

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    let dmView = localStorage.getItem('dmView') === 'true';

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
      places: places,
      categories: WikiUtils.sortByName(categories),
    };

    this.getEntriesByCategory = this.getEntriesByCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {

    const categories = this.state.categories.map( category => {
      return (
        <div className="category">
          <h2 className="sectionTitle">{category}s</h2>
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.People>
        <h2 className="sectionGroup">Places</h2>
        <div id="places" >
          {categories}
        </div>
      </Page.People>
    )
  }

  getEntriesByCategory(category) {
    return this.state.places.map( place => {
      if ( combinedPlaces[place].type === category ) {
        return (
          <li className="location">
            <Link to={`/location/${place}`}>
              <img className="portrait" alt="" src={ images('./' + combinedPlaces[place].name.replace(/\s/g,"-") + '.png') }/>
              <p>{combinedPlaces[place].name}</p>
            </Link>
          </li>
        )
      }
      return undefined;
    });
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let sortable = [];
    let results = [];

    for (let key in combinedPlaces) {
      sortable.push([key, combinedPlaces[key]]);
    }

    sortable.sort( (a,b) => {
      if (a[1].name > b[1].name) {
        return 1;
      } else if (a[1].name < b[1].name) {
        return -1;
      } else {
        return 0;
      }
    });

    sortable.map( ent => {
      const key = ent[0];
      const entry = ent[1];

      if ( entry.playerKnown && 
        (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) 
          || entry.name.toLowerCase().includes(searchTerm) 
          || entry.nickname.toLowerCase().includes(searchTerm)
          || entry.location.toLowerCase().includes(searchTerm)
          || entry.races.some( race => race.toLowerCase().includes(searchTerm) ) 
          ) 
      ) {
        results.push( key );
      }
      return true;
    });

    results = WikiUtils.sortByName(results);
    this.setState({place: results})
  }

}

export { Places };

