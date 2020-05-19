import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import Page from 'components/page';
import CharactersList from 'components/articles/charactersList';
import WikiUtils from "components/utils/wikiUtils";
import { TitleComponent } from 'components/titleComponent.js';

import 'styles/characters.scss';

const images = require.context('img/characters/', true);

class Characters extends Component {

  constructor (props) {
    super(props);

    const characterData = DataLoader.characters;

    let filteredOutput = {};

    for (let [key, obj] of Object.entries(characterData)) {
      filteredOutput[key] = obj;
    }

    this.state = {
      characterData: characterData,
      characters: WikiUtils.sortByName( Object.keys(filteredOutput) ),
    };
  }

  render () {
    const characterData = this.state.characterData;
    const characters = this.state.characters.map( person => {
      return <CharactersList key={person} data={{characterData}} entry={characterData[person]} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
    });

    return (
      <Page.Characters>
        <TitleComponent title={`Player Characters - Centhris Wiki`} />
        <h2 className="sectionTitle">Player Characters</h2>

        <ul id="characters" >
          {characters}
        </ul>
      </Page.Characters>
    )
  }

  

}

export { Characters };

