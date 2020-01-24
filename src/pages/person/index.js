import React, { Component } from 'react';
import peopleData from '../../data/people';

import Page from '../../components/page';
import PersonArticle from '../../components/articles/personArticle';

const images = require.context('../../img/portraits/', true);

class Person extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      pathname: window.location.pathname,
      person: window.location.pathname.split('/person/')[1]
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        person: nextProps.location.pathname.split('/person/')[1]
      });
    }
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

