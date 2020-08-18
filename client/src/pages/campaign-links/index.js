import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';
import SearchLogic from "components/search/searchLogic";
import Page from 'components/page';
import Back from 'components/back';

import ListItem from 'components/categories/listItem';
import DataLoader from 'components/utils/dataLoader';
import jsonData from 'data/curated';

// TODO: Add analytics tracking and dynamically build topical articles section based on player activity.

class Curated extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.compileData = this.compileData.bind(this);
  }

  render () {
    const data = this.compileData(jsonData);

    return (
      <Page.Category>
        <TitleComponent title={`Curated Links - Centhris Wiki`} />
        <Back/>        

        <h1 className="category__heading">Curated Campaign Artilces</h1>
        {
          Object.keys(data).map( key => {
            return (
              <section className="category__group" key={key}>
                <h2 className="category__subheading">{key}</h2>
                <ul className="sectionList">
                  {
                    data[key].map( entry => {
                      if ( (entry && entry.playerKnown ) || (entry && this.state.dmView) )  {
                        return (
                          <ListItem key={DataLoader.all[entry.name].name} entry={DataLoader.all[entry.name]} imgStyle="landscape" />
                        )
                      }

                      return false;
                    })
                  }
                </ul>
              </section>
            )
          })
        }
      </Page.Category>
    );
  }

  compileData (data) {
    // grab arrays of things from JSON file and get data obj to match
    const dmView = this.state.dmView;
    const obj = {};

    Object.keys(data).forEach( (key) => {
      obj[key] = data[key].map( entry => {
        // use keyword search to find the closest match, just encase I messed up the name!
        return SearchLogic(entry.toLowerCase(), dmView)[0];
      });
    });

    Object.keys(obj).forEach( section => {
      obj[section].sort( (a,b) => {
        if ( a.name < b.name ) {
          return -1
        } else {
          return 1
        }
      });
    })

    return obj;
  }

}

export { Curated };