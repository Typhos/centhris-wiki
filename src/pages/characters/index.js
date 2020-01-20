import React, { Component } from 'react';
import characterData from '../../data/characters';

import Search from '../../components/search';
import Page from '../../components/page';
import CharactersArticle from '../../components/articles/charactersArticle';

import './characters.scss';

const images = require.context('../../img/characters/', true);

class Characters extends Component {

  constructor (props) {
    super(props);

    let filteredOutput = {};

    for (let [key, obj] of Object.entries(characterData)) {
      filteredOutput[key] = obj;
    }

    this.state = {
      characters: this.sortByName( Object.keys(filteredOutput) ),
    };

    this.sortByName = this.sortByName.bind(this);
  }

  render () {
    const characters = this.state.characters.map( person => {
      return <CharactersArticle key={person} data={{characterData}} entry={characterData[person]} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
    });

    return (
      <Page.Characters>
        <ul id="characters" >
          {characters}
        </ul>
      </Page.Characters>
    )
  }

  sortByName(arr) {
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

export { Characters };

