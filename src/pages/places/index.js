import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import placeData from '../../data/places';

// import Search from '../../components/search';
import Page from '../../components/page';
import WikiUtils from "components/utils/wikiUtils";

import 'styles/places.scss';

const maps = require.context('../../img/maps/', true);
const images = require.context('../../img/places/', true);

class Places extends Component {

  constructor (props) {
    super(props);

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};

    for (let [key, obj] of Object.entries(placeData)) {
      if ( obj.playerKnown ) {
        filteredOutput[key] = obj;
      }
    }

    const places = WikiUtils.sortByName( Object.keys(filteredOutput) );

    // Create a list of unique location categories. eg. Cities, regions, nations, continents
    let categories = places.map( place => {
      return placeData[place].type;
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
        <div class="category">
          <h2 className="sectionTitle">{category}s</h2>
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.People>
        {/*<Search handleSearch={ this.handleSearch } />
        
        <h2 className="sectionTitle">Maps</h2>
        <article className="maps">
          
          <a className="mapLink" href={ maps('./Ulfwyst-2C-2573.png') }>
            <img alt="Eastern Ulfwyst map"  className="map" src={ maps('./Ulfwyst-2C-2573.png') }/>
            <p>Eastern Ulfwyst c. 2573</p>
          </a>

          <a className="mapLink" href={ maps('./Volikgrad.png') }>
            <img alt="Volikgrad map"  className="map" src={ maps('./Volikgrad.png') }/>
            <p>Volikgrad</p>
          </a>
          
          <a className="mapLink" href={ maps('./Rakenburg.png') }>
            <img alt="Rakenburg map" className="map" src={ maps('./Rakenburg.png') }/>
            <p>Rakenburg</p>
          </a>
          
          <a className="mapLink" href={ maps('./cryptic-toridosa-map.png') }>
            <img alt="Toridosa map"  className="map" src={ maps('./cryptic-toridosa-map.png') }/>
            <p>Toridosa Map</p>
          </a>
        </article>
        */}

        <h2 className="sectionGroup">Places</h2>
        <div id="places" >
          {categories}
        </div>
      </Page.People>
    )
  }

  getEntriesByCategory(category) {
    return this.state.places.map( place => {
      if ( placeData[place].type === category ) {
        return (
          <li className="location">
            <Link to={`/location/${place}`}>
              <img className="portrait" alt="" src={ images('./' + placeData[place].name.replace(/\s/g,"-") + '.png') }/>
              <p>{placeData[place].name}</p>
            </Link>
          </li>
        )
      }
    });
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let sortable = [];
    let results = [];

    for (let key in placeData) {
      sortable.push([key, placeData[key]]);
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

