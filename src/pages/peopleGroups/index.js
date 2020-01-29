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
      if ( !obj.hideOnCat ) {
        if (obj.playerKnown || dmView) {
          filteredOutput[key] = obj;
        }
      }
    }

    this.state = {
      people: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      dmMode: dmView,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    console.log(1)
    const filteredOutput = this.state.people.map( person => {
      const imgPath = images.keys().some( x => x.includes( person )) &&  images('./' + peopleData[person].name.replace(/\s/g,"-") + '.png');

      return <PeopleArticle key={person} data={{peopleData}} entry={peopleData[person]} image={ imgPath || "" }/>
    });

    return (
      <Page.People>
        
        <Search handleSearch={ this.handleSearch } data={peopleData}/>

        <h2 className="sectionTitle">Non-Player Characters</h2>
        
        <ul id="people" >
          {filteredOutput}
        </ul>
      </Page.People>
    )
  }

  handleSearch(results) {
    this.setState({people: results})
  }

}

export { People };

