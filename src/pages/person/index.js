import React, { Component } from 'react';
import peopleData from '../../data/people';

import Page from '../../components/page';
import PersonArticle from '../../components/articles/personArticle';

const images = require.context('./portraits/', true);

class Person extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: window.location.pathname.split('/person/')[1]
    }
  }

  componentWillReceiveProps( nProp ) {
    console.log(nProp);
  }

  render () {
    const person = this.state.person;

    return (
      <Page.People>
        <section id="people" >
          <PersonArticle key={person} data={{peopleData}} entry={peopleData[person]} image={ images('./' + peopleData[person].name.replace(/\s/g,"-") + '.png') } />
        </section>
      </Page.People>
    )
  }
}

export { Person };

