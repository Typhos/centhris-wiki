import React, { Component } from 'react';
import characterData from 'data/characters';

import Page from 'components/page';
import CharactersList from 'components/articles/charactersList';
import WikiUtils from "components/utils/wikiUtils";

import 'styles/characters.scss';

const images = require.context('../../img/characters/', true);

class Characters extends Component {

  constructor (props) {
    super(props);

    let filteredOutput = {};

    for (let [key, obj] of Object.entries(characterData)) {
      filteredOutput[key] = obj;
    }

    this.state = {
      characters: WikiUtils.sortByName( Object.keys(filteredOutput) ),
    };
  }

  render () {
    const characters = this.state.characters.map( person => {
      return <CharactersList key={person} data={{characterData}} entry={characterData[person]} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
    });

    return (
      <Page.Characters>
        <h2 className="sectionTitle">Player Characters</h2>

        <ul id="characters" >
          {characters}
        </ul>
      </Page.Characters>
    )
  }

  

}

export { Characters };

