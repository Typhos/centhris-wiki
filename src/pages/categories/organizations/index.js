import React, { Component } from 'react';
import { TitleComponent } from 'components/titleComponent.js';

// My Components
import WikiUtils from "components/utils/wikiUtils";
import Back from 'components/back';
import Filter from 'components/filter';
import Page from 'components/page';
import DataLoader from 'components/utils/dataLoader';
import CategoryGroup  from 'components/categories/categoryGroup';

// STYLES
import 'styles/categories.scss';

class OrganizationGroups extends Component {

  constructor (props) {
    super(props);

    const data = DataLoader.organizations;
    const dmView = localStorage.getItem('dmView') === 'true';
    let filteredOutput = {};

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.    
    for (let [key, obj] of Object.entries(data)) {
      if ( !obj.hideOnCat && ( obj.playerKnown || dmView ) ) {
        filteredOutput[key] = obj;
      }
    }

    // Get all categories from the category group, compile them into a big array, then use Set to eliminate duplicates
    let categories = Object.keys(filteredOutput).map(entry => data[entry].type);
    categories = WikiUtils.sortByName( [...(new Set(categories))] );

    this.state = {
      dmView: dmView,
      pageData: data,
      categories: categories,
      articles: WikiUtils.sortByName( Object.keys(filteredOutput) )
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.articles).length;

    return (
      <Page.Default>
        <TitleComponent title={`Organizations - Centhris Wiki`} />
        <Back/>
        <Filter handleFilter={ this.handleFilter }  data={this.state.pageData}/>

        <h2 className="sectionGroup">Organizations & Groups <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        <div id="categories" className="columns" >
          {
            this.state.categories.map( category => {
              return <CategoryGroup key={category} articles={this.state.articles} category={category} pageData={this.state.pageData}/>
            })
          }
        </div>
      </Page.Default>
    )
  }

  handleFilter(results) {
    let categories = results.map(entry => this.state.pageData[entry].type);
    categories = WikiUtils.sortByName( [...(new Set(categories))] );

    this.setState({
      articles: results,
      categories: categories
    });
  }

}

export { OrganizationGroups };

