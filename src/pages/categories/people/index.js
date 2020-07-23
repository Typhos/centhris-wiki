import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import { TitleComponent } from 'components/titleComponent.js';

import Filter from 'components/filter';
import Back from 'components/back';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils.js";
import ListItem from 'components/categories/listItem';

import 'styles/categories.scss';

class People extends Component {

  constructor (props) {
    super(props);

    let filteredOutput = {};
    let dmView = localStorage.getItem('dmView') === 'true';

    // Filter out all of the player unknown characters.
    // TODO: When making an API endpoint, refactor to just not send the hidden characters instead.

    for (let [key, obj] of Object.entries( DataLoader.people )) {
      if ( !obj.hideOnCat ) {
        if (obj.playerKnown || dmView) {
          filteredOutput[key] = obj;
        }
      }
    }

    this.state = {
      peopleData: filteredOutput,
      people: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      dmView: dmView,
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.people).length;

    return (
      <Page.People>
        <TitleComponent title={`NPCs - Centhris Wiki`} />
        <Back/>
        <Filter handleFilter={ this.handleFilter } data={ DataLoader.people }/>

        <h2 className="sectionTitle">Non-Player Characters <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        
        <ul id="categories" >
          {
            this.state.people.map( person => {
              return <ListItem key={person} entry={ DataLoader.people[person] } imgStyle="portrait" />
            })
          }
        </ul>
      </Page.People>
    )
  }

  handleFilter(results) {
    this.setState({people: results})
  }

}

export { People };

