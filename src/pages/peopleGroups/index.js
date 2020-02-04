import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';

import Search from 'components/search';
import Back from '../../components/back';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils.js";

const images = require.context('../../img/portraits/', true);

class People extends Component {

  constructor (props) {
    super(props);

    const peopleData = DataLoader.people;

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
      peopleData: filteredOutput,
      people: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      dmMode: dmView,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.peopleCategory = this.peopleCategory.bind(this);
  }

  render () {
    const peopleData = this.state.peopleData;
    const filteredOutput = this.state.people.map( person => {
      const imgPath = images.keys().some( x => x.includes( person )) &&  images('./' + peopleData[person].name.replace(/\s/g,"-") + '.png');

      return this.peopleCategory(peopleData[person], imgPath);
    });

    return (
      <Page.People>
        <Back/>
        <Search handleSearch={ this.handleSearch } data={peopleData}/>

        <h2 className="sectionTitle">Non-Player Characters</h2>
        
        <ul id="people" >
          {filteredOutput}
        </ul>
      </Page.People>
    )
  }

  peopleCategory (person, imgPath = "") {
    return (
      <li key={person.name.replace(/\s/g,"-")} className="person" id={person.name.replace(/\s/g,"-")}>
        <Link className="personLink" to={ { pathname:`/person/${person.name.replace(/\s/g,"-")}`, state: "update" }}>
          <img className="portrait" alt="" src={imgPath}/>
          <p className="name">{person.name}</p>
        </Link>
      </li>
    )
  }

  handleSearch(results) {
    this.setState({people: results})
  }

}

export { People };

