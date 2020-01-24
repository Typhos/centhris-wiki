import React, { Component } from 'react';
import peopleData from 'data/people';

import Search from 'components/search';
import Page from 'components/page';
import PeopleArticle from 'components/articles/peopleArticle';
import WikiUtils from "components/utils/wikiUtils.js";

const images = require.context('../../img/portraits/', true);

class People extends Component {

  constructor (props) {
    super(props);

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    let dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(peopleData)) {
      if ( obj.playerKnown || dmView ) {
        filteredOutput[key] = obj;
      }
    }

    this.state = {
      people: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      dmMode: dmView,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    const filteredOutput = this.state.people.map( person => {
      return <PeopleArticle key={person} data={{peopleData}} entry={peopleData[person]} image={ images('./' + peopleData[person].name.replace(/\s/g,"-") + '.png') }/>
    });

    return (
      <Page.People>
        
        <Search handleSearch={ this.handleSearch } />

        <h2 className="sectionTitle">Non-Player Characters</h2>
        
        <ul id="people" >
          {filteredOutput}
        </ul>
      </Page.People>
    )
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let sortable = [];
    let results = [];

    for (let key in peopleData) {
      sortable.push([key, peopleData[key]]);
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

      if ( entry.playerKnown && (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) ) ) {
        results.push( key );
      }
      return true;
    });

    results = WikiUtils.sortByName(results);
    this.setState({people: results})
  }

}

export { People };

