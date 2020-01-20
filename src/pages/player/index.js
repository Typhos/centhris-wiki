import React, { Component } from 'react';
import characterData from '../../data/characters';

import Page from '../../components/page';
import PlayerCharacter from '../../components/articles/playerCharacter';

const images = require.context('../../img/characters/', true);

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: window.location.pathname.split('/player-character/')[1]
    }
  }

  render () {
    const person = this.state.person;

    return (
      <Page.People>
        <section id="people" >
          <PlayerCharacter entry={characterData[person]} data={characterData} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
        </section>
      </Page.People>
    )
  }
}

export { Player };

