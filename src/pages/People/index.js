import React, { Component } from 'react';
import data from '../../data/people';

import Search from '../../components/Search';
import Page from '../../components/Page';
import PeopleArticle from '../../components/Articles/PeopleArticle';

const images = require.context('./portraits/', true);

// 
class People extends Component {

  constructor (props) {
    super(props);

    let filteredOutput = {};

    for (let [key, obj] of Object.entries(data)) {
      if ( obj.player_known ) {
        filteredOutput[key] = obj;
      }
    }

    this.state = {
      people: this.sortPeopleByName( Object.keys(filteredOutput) ),
    };

    this.sortPeopleByName = this.sortPeopleByName.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    const filteredOutput = this.state.people.map( person => {
      return <PeopleArticle entry={data[person]} image={ images('./' + data[person].name.replace(/\s/g,"_") + '.png') }/>
    });

    return (
      <Page.People>
        <Search handleSearch={ this.handleSearch } />
        <section id="people" >
          {filteredOutput}
        </section>
      </Page.People>
    )
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
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

      if ( !e ) {
        console.log('tatsfasdfs');
      } else if ( entry.player_known && (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) ) ) {
        results.push( key );
      }
      return true;
    });

    results = this.sortPeopleByName(results);
    this.setState({people: results})
  }

  sortPeopleByName(arr) {
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

export { People };

