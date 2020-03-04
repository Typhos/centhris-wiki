import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import { Redirect } from "react-router-dom";
import { TitleComponent } from 'components/titleComponent.js';
import Page from 'components/page';
import PersonArticle from 'components/articles/personArticle';

const images = require.context('img/characters/', true);

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      characterData: DataLoader.characters,
      pathname: decodeURI(window.location.pathname),
      person: decodeURI(window.location.pathname.split('/player-character/')[1])
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: decodeURI(nextProps.location.pathname),
        person: decodeURI(nextProps.location.pathname.split('/player-character/')[1])
      })
    }
  }

  render () {
    const person = this.state.person;
    const characterData = this.state.characterData;

    if ( !characterData[person] ) {
      return (
        <Redirect to="/404" />
      )
    }

    return (
      <Page.People>
        <TitleComponent title={`${characterData[person].name} - Centhris Wiki`} />
        <section id="people" className="article" >
          <PersonArticle entry={characterData[person]} data={characterData} image={ images('./' + characterData[person].name.replace(/\s/g,"-") + '.png') }/>
        </section>
      </Page.People>
    )
  }
}

export { Player };

