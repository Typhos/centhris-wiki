import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import placeData from '../../data/places';

import Search from '../../components/search';
import Page from '../../components/page';
import PeopleArticle from '../../components/articles/peopleArticle';

import './places.scss';

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

    this.state = {
      place: this.sortByName( Object.keys(filteredOutput) ),
    };

    this.sortByName = this.sortByName.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    const filteredOutput = this.state.place.map( place => {
      return (
        <li className="location">
          <Link to={`/location/${place}`}>
            <img className="portrait" alt="" src={ images('./' + placeData[place].name.replace(/\s/g,"-") + '.png') }/>
            <p>{placeData[place].name}</p>
          </Link>
        </li>
      )
    });

    console.log(maps);

    return (
      <Page.People>
        {/*<Search handleSearch={ this.handleSearch } />*/}
        
        <h2 className="sectionTitle">Maps</h2>
        <article className="maps">
          
          <a className="mapLink" href={ maps('./Ulfwyst-2C-2573.png') }>
            <img className="map" src={ maps('./Ulfwyst-2C-2573.png') }/>
            <p>Eastern Ulfwyst c. 2573</p>
          </a>

          <a className="mapLink" href={ maps('./Volikgrad.png') }>
            <img className="map" src={ maps('./Volikgrad.png') }/>
            <p>Volikgrad</p>
          </a>
          
          <a className="mapLink" href={ maps('./Rakenburg.png') }>
            <img className="map" src={ maps('./Rakenburg.png') }/>
            <p>Rakenburg</p>
          </a>
          
          <a className="mapLink" href={ maps('./cryptic-toridosa-map.png') }>
            <img className="map" src={ maps('./cryptic-toridosa-map.png') }/>
            <p>Toridosa Map</p>
          </a>

        </article>

        <h2 className="sectionTitle">Locations</h2>
        <ul id="places" >
          {filteredOutput}
        </ul>
      </Page.People>
    )
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

    results = this.sortByName(results);
    this.setState({place: results})
  }

  sortByName(arr) {
    return arr.sort( (a,b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}

export { Places };

