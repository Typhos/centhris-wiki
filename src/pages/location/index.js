import React, { Component } from 'react';
import placeData from '../../data/places';

import Page from '../../components/page';
import LocationArticle from '../../components/articles/locationArticle';

const images = require.context('../../img/places/', true);

class Location extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: window.location.pathname.split('/location/')[1]
    }
  }

  componentWillReceiveProps( nProp ) {
    console.log(nProp);
  }

  render () {
    const location = this.state.location;

    return (
      <Page.Location>
        <section id="people" >
          <LocationArticle key={location} data={{placeData}} entry={placeData[location]} image={ images('./' + placeData[location].name.replace(/\s/g,"-") + '.png') }/>
        </section>
      </Page.Location>
    )
  }
}

export { Location };

