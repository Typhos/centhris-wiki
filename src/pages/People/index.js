import React, { Component } from 'react';
// import PeopleArticle from './Articles/peopleArticle';
import peopleData from '../../data/people';

import Page from '../../components/Page';

class People extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  render () {
    return (
      <Page.People>
        <section id="people">
          TEST PEOPLE
        </section>
      </Page.People>
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

export { People };

