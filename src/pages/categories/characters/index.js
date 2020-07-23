import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import ListItem from 'components/categories/listItem';
import Page from 'components/page';
import Back from 'components/back';

import 'styles/characters.scss';

class Characters extends Component {

  constructor (props) {
    super(props);

    const characterData = DataLoader.characters;

    let filteredOutput = {};

    for (let [key, obj] of Object.entries(characterData)) {
      filteredOutput[key] = obj;
    }

    this.state = {
      characters: WikiUtils.sortByName( Object.keys(filteredOutput) ),
    };
  }

  render () {

    return (
      <Page.Characters>
        <TitleComponent title={`Player Characters - Centhris Wiki`} />
        <Back/>
        <h2 className="sectionTitle">Player Characters</h2>

        <ul id="categories" >
          {
            // TODO: For multiple player character parties, group the characters by person.party
            
            this.state.characters.map( person => {
              return <ListItem key={person} entry={DataLoader.characters[person]} imgStyle="portrait" />
            })
          }
        </ul>
      </Page.Characters>
    )
  }

  

}

export { Characters };

