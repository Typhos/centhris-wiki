import React, { Component } from 'react';
import Back from '../../components/back';
import DataLoader from 'components/utils/dataLoader';

import Page from '../../components/page';
import PlayerCharacter from '../../components/articles/playerCharacter';

const images = require.context('../../img/characters/', true);

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      characterData: DataLoader.characters,
      pathname: window.location.pathname,
      person: window.location.pathname.split('/player-character/')[1]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        person: nextProps.location.pathname.split('/player-character/')[1]
      })
    }
  }

  render () {
    const person = this.state.person;
    const characterData = this.state.characterData;

    return (
      <Page.People>
        <section id="people" className="article" >
          <Back/>
          <PlayerCharacter entry={characterData[person]} data={characterData} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
        </section>
      </Page.People>
    )
  }
}

export { Player };

