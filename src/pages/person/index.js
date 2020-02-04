import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
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
    const peopleData = DataLoader.people;
    const person = this.state.person;
    const imgPath = images.keys().some( x => x.includes( person )) &&  images('./' + peopleData[person].name.replace(/\s/g,"-") + '.png');

    return (
      <Page.People>
        <section id="people" className="article" >
          <PersonArticle key={person} data={{peopleData}} entry={peopleData[person]} image={ imgPath || "" } />
        </section>
      </Page.People>
    )
  }
}

export { Person };

