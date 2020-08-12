import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';
import Back from 'components/back';
import ListItem from 'components/categories/listItem';
import DataLoader from 'components/utils/dataLoader';

class SortedCategory extends Component {

  constructor(props) {
    super(props);

    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0];
    const dmView = localStorage.getItem('dmView') === 'true';

    // TODO: eventually turn this into an API endpoint instead of a filter on render...

    // Filter out all of the player unknown characters.
    let filteredOutput = {};
    for (let [key, obj] of Object.entries( DataLoader[type] )) {
      if ( !obj.hideOnCat ) {
        if (obj.playerKnown || dmView) {
          filteredOutput[key] = obj;
        }
      }
    }

    this.state = {
      "type": type,
      "data": filteredOutput,
      "dmView": dmView
    }
  }

  static getDerivedStateFromProps (nextProps, prevState){
    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0];
    const dmView = localStorage.getItem('dmView') === 'true';
    let filteredOutput = {};

    for (let [key, obj] of Object.entries( DataLoader[type] )) {
      if ( !obj.hideOnCat ) {
        if (obj.playerKnown || dmView) {
          filteredOutput[key] = obj;
        }
      }
    }

    if ( nextProps.location.pathname !== prevState.pathname ) {
      return {
        "type": type,
        "data": filteredOutput
      };
    }
    return null;
  }

  render () {
    const { type, data } = this.state;
    const numberOfArticles = Object.keys(data).length;

    return (
      <Page.Category>
        <TitleComponent title={`NPCs - Centhris Wiki`} />
        <Back/>

        <article className="category">

          { type === "people" &&
            <h1 className="category__heading">
              Non-Player Characters <small className="category__entryNumber">({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small>
            </h1>
          }

          { type === "characters" &&
            <h1 className="category__heading">
              Player Characters <small className="category__entryNumber">({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small>
            </h1>
          }
          
          <ul className="category__list" >
            {
              Object.keys(data).sort().map( person => {
                return <ListItem key={person} entry={ DataLoader[type][person] } imgStyle="portrait" />
              })
            }
          </ul>
        </article>
      </Page.Category>
    )
  }

}

export {SortedCategory};