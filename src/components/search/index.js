import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils.js";
import { withRouter } from 'react-router-dom';

import 'styles/search.scss'

class Search extends Component {

  constructor(props) {
    super(props);

    const searchStringIndex = window.location.search.split(/[=?&]/g).indexOf('search') + 1;
    const searchString = window.location.search.split(/[=?&]/g)[searchStringIndex];

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true',
      data: this.props.data,
      searchString: searchString
    }

    this.handleSearch(searchString);

    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  render() {
    return (
      <form id="search">
        <input id="searchBox" placeholder="search" value={this.state.searchString} onChange={ this.handleSearch }/>
        <span id="clearSearch" onClick={this.clearSearch}>x</span>
      </form>
    )
  }

  clearSearch() {
    this.handleSearch("");
  }

  handleSearch (e) {
    const searchTerm = (e.target) ? e.target.value.toLowerCase() : e.toLowerCase();
    let sortable = [];
    let results = [];

    if (this.state.searchString !== e) this.setState({searchString: searchTerm});

    this.props.history.push({
      search: '?search=' + searchTerm
    });

    for (let key in this.state.data) {
      sortable.push([key, this.state.data[key]]);
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

      if ( (entry.playerKnown || this.state.dmView ) && 
        (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) || ( entry.races && entry.races.includes(searchTerm) ) ) 
      ) {
        results.push( key );
      }
      return true;
    });

    this.props.handleSearch( WikiUtils.sortByName(results) );
  }
}

export default withRouter(Search);