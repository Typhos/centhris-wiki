import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

// My Components
import WikiUtils from "components/utils/wikiUtils";
import Filter from 'components/filter';
import Page from 'components/page';

// STYLES
import 'styles/categories.scss';

// DATA
import orgData from 'data/organizations';

class OrganizationGroups extends Component {

  constructor (props) {
    super(props);

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    let dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(orgData)) {
      if ( obj.playerKnown || dmView ) {
        filteredOutput[key] = obj;
      }
    }

    const orgs = WikiUtils.sortByName( Object.keys(filteredOutput) );

    let categories = orgs.map( org => {
      return orgData[org].type;
    });
    const uniqueSet = new Set(categories);
    categories = [...uniqueSet];

    this.state = {
      orgs: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      categories: WikiUtils.sortByName(categories),
      dmMode: dmView,
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  render () {
    const numberOfArticles = Object.keys(this.state.orgs).length;
    const categories = this.state.categories.map( category => {
      return (
        <div key={category} className="category">
          { this.getEntriesByCategory(category).filter( el => el !== undefined ).length !== 0 &&
            <h2 className="sectionTitle">{category}s</h2>
          }
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.People>
        <TitleComponent title={`Organizations - Centhris Wiki`} />
        <Back/>
        <Filter handleFilter={ this.handleFilter }  data={orgData}/>

        <h2 className="sectionGroup">Organizations & Groups <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Entries" : "Entry"})</small></h2>
        <div id="categories" >
          {categories}
        </div>
      </Page.People>
    )
  }

  getEntriesByCategory(category) {
    const images = require.context('img/organizations', true);
    const allImages = require.context('img/', true);

    return this.state.orgs.map( org => {
      const current = orgData[org];
      if ( current.type === category ) {
        let imgSrc = ( images.keys().some( x => x.includes( org ) ) && images(images.keys().filter( x => x.includes( org ) ) ) ) 
          || images('./unknown.png');

        if ( current.forceImg && allImages.keys().some( x => x.includes( current.forceImg )) ) {
          imgSrc = allImages( allImages.keys().filter( x => x.includes( current.forceImg ) ) );
        }

        return (
          <li key={org} className="entry">
            <Link to={`/group/${org}`}>
              <img className="landscape" alt="" src={ imgSrc }/>
              <p>{current.name}</p>
            </Link>
          </li>
        )
      }
      return undefined;
    });
  }

  handleFilter(results) {
    this.setState({orgs: results});
  }

}

export { OrganizationGroups };

