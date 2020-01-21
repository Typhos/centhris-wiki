import React, { Component } from 'react';

import 'styles/search.scss'

export default class Search extends Component {

  render() {
    return (
      <form id="search">
        <input id="searchBox" placeholder="search" onChange={ this.props.handleSearch }/>
      </form>
    )
  }

  // sortSearchResults(data) {
  //   const searchTerm = this.state.searchTerm.toLowerCase();
  //   let sortable = [];
  //   let results = [];

  //   for (let key in data) {
  //     sortable.push([key, data[key]]);
  //   }

  //   sortable.sort( (a,b) => {
  //     if (a[1].name > b[1].name) {
  //       return 1;
  //     } else if (a[1].name < b[1].name) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   sortable.map( ent => {
  //     const key = ent[0];
  //     const entry = ent[1];

  //     if ( entry.player_known && (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) ) ) {
  //       results.push( <PeopleArticle entry={data[key]} /> );
  //     }
  //     return true;
  //   });

  //   return results;
  // }

  // searchQuery (e) {
  //   const searchTerm = e.target.value;

  //   this.setState({searchTerm: searchTerm});
  // }
}