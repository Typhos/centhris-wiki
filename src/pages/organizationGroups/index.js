import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WikiUtils from "components/utils/wikiUtils";

import Search from 'components/search';
import Page from 'components/page';
import OrganizationGroupsArticle from 'components/articles/organizationGroupsArticle';

import placeData from 'data/places';
import characterData from 'data/characters';
import peopleData from 'data/people';
import orgData from 'data/organizations';

import 'styles/organiationGroups.scss';

const images = require.context('img/organizations/', true);

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

    this.handleSearch = this.handleSearch.bind(this);
  }

  render () {
    const filteredOutput = this.state.orgs.map( group => {
      return <OrganizationGroupsArticle key={group} data={{orgData}} entry={orgData[group]} image={ images('./' + orgData[group].name.replace(/\s/g,"-") + '.png') }/>
    });

    const categories = this.state.categories.map( category => {
      return (
        <div className="category">
          <h2 className="sectionTitle">{category}s</h2>
          <ul className="sectionList">
            {this.getEntriesByCategory(category)}
          </ul>
        </div>
      )
    });

    return (
      <Page.People>
        
        {/*<Search handleSearch={ this.handleSearch } />*/}

        <h2 className="sectionGroup">Organizations & Groups</h2>
        <div id="organizations" >
          {categories}
        </div>
      </Page.People>
    )
  }

  getEntriesByCategory(category) {
    return this.state.orgs.map( org => {
      if ( orgData[org].type === category ) {
        return (
          <li className="group">
            <Link to={`/group/${org}`}>
              <img className="portrait" alt="" src={ images('./' + orgData[org].name.replace(/\s/g,"-") + '.png') }/>
              <p>{orgData[org].name}</p>
            </Link>
          </li>
        )
      }
      return undefined;
    });
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let sortable = [];
    let results = [];

    for (let key in peopleData) {
      sortable.push([key, peopleData[key]]);
    }

    sortable.sort( (a,b) => {
      if (a[1].name > b[1].name) {
        return 1;
      } else if (a[1].name < b[1].name) {
        return -1;
      } else {
        return 0;
      }
    });

    sortable.map( ent => {
      const key = ent[0];
      const entry = ent[1];

      if ( entry.playerKnown && (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) ) ) {
        results.push( key );
      }
      return true;
    });

    results = WikiUtils.sortByName(results);
    this.setState({people: results})
  }

}

export { OrganizationGroups };

