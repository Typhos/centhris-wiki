import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import Page from 'components/page';
import PersonArticle from 'components/articles/personArticle';
import { Redirect } from "react-router-dom";
import { TitleComponent } from 'components/titleComponent.js';

class Person extends Component {

  constructor(props) {
    super(props);
    
    const pathArr = window.location.pathname.split('/');

    this.state = {
      pathname: window.location.pathname,
      person: decodeURI(pathArr[ pathArr.length - 1 ])
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      const pathArr = nextProps.location.pathname.split('/');

      this.setState({
        pathname: nextProps.location.pathname,
        person: decodeURI(pathArr[ pathArr.length - 1 ])
      });
    }
  }

  render () {
    const peopleData = {...DataLoader.characters, ...DataLoader.people};
    const person = this.state.person;

    if ( !peopleData[person] ) {
      return (
        <Redirect to="/404" />
      )
    }

    return (
      <Page.Default>
        <TitleComponent title={`${peopleData[person].name} - Centhris Wiki`} />
        <section id="people" className="article" >
          <PersonArticle key={person} data={{peopleData}} entry={peopleData[person]}/>
        </section>
      </Page.Default>
    )
  }
}

export { Person };

