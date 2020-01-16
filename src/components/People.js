import React, { Component } from 'react';
import PeopleArticle from './articles/PeopleArticle';
import peopleData from '../data/people';

import "../styles/People.scss";

class People extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchTerm: ""
    };

    this.searchQuery = this.searchQuery.bind(this);
    this.sortSearchResults = this.sortSearchResults.bind(this);
  }

  render () {
    let results = this.sortSearchResults(peopleData);

    return (
      <section id="people">
        <header>
          <form id="search">
            <input id="searchBox" type="text" placeholder="search" onChange={this.searchQuery}/>
          </form>
        </header>
        
        {results}

      </section>
    )
  }

  sortSearchResults(data) {
    const searchTerm = this.state.searchTerm.toLowerCase();
    let sortable = [];
    let results = [];

    for (let key in data) {
      sortable.push([key, data[key]]);
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

      if ( entry.player_known && (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) ) ) {
        results.push( <PeopleArticle entry={data[key]} /> );
      }
      return true;
    });

    return results;
  }

  searchQuery (e) {
    const searchTerm = e.target.value;

    this.setState({searchTerm: searchTerm});
  }
}

export default People;