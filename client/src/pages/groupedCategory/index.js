import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';

import Page from 'components/page';
import Back from 'components/back';
import WikiUtils from "components/utils/wikiUtils";
import CategoryGroup  from 'components/categories/categoryGroup';
import DataLoader from 'components/utils/dataLoader';

class GroupedCategory extends Component {

  constructor(props) {
    super(props);

    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0].replace("Category","");
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

    let categories = Object.keys(filteredOutput).map( entry => DataLoader.all[entry].type);
    categories = [...(new Set(categories))];

    this.state = {
      "categories": categories,
      "articles": WikiUtils.sortByName( Object.keys(filteredOutput) ),
      "type": type,
      "data": filteredOutput,
      "dmView": dmView
    }
  }

  static getDerivedStateFromProps (nextProps, prevState){
    const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
    const type = pathArray[0].replace("Category","");;
    const dmView = localStorage.getItem('dmView') === 'true';
    
    let filteredOutput = {};
    for (let [key, obj] of Object.entries( DataLoader[type] )) {
      if ( !obj.hideOnCat ) {
        if (obj.playerKnown || dmView) {
          filteredOutput[key] = obj;
        }
      }
    }

    let categories = Object.keys(filteredOutput).map( entry => DataLoader.all[entry].type).sort();
    categories = [...(new Set(categories))];

    if ( nextProps.location.pathname !== prevState.pathname ) {
      return {
        "categories": categories,
        "articles": WikiUtils.sortByName( Object.keys(filteredOutput) ),
        "type": type,
        "data": filteredOutput,
        "dmView": dmView
      };
    }
    return null;
  }

  getHeading(type, numberOfArticles) {
    switch (type) {
      case "places":
        return "Regions and Locales";
      default:
        return type.substring(0,1).toUpperCase()+type.substring(1);
    }

  }

  render () {
    const { type, categories, data, articles } = this.state;
    const numberOfArticles = Object.keys(data).length;

    return (
      <Page.Category>
        <TitleComponent title={`${type} - Centhris Wiki`} />
        <Back/>

        
        <h1 className="category__heading">
          { this.getHeading(type) }
          <small className="category__entryNumber">
            ({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})
          </small>
        </h1>

        <article className="category columns">
          {
            categories.map( category => {
              const heading = () => {
                if ( category.endsWith('y') ) {
                  return category.substring(0, category.length - 1) + "ies";
                } else {
                  return category + "s";
                }
              }

              return (
                <CategoryGroup 
                  key={category} 
                  articles={articles} 
                  category={category} 
                  heading={heading()}
                  pageData={data} />
              )
            })
          }
        </article>
      </Page.Category>
    )
  }

}

export {GroupedCategory};