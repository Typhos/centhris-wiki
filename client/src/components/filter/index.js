import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils.js";
import { withRouter } from 'react-router-dom';

import styles from './filter.module.scss';

class Filter extends Component {

  constructor(props) {
    super(props);

    const searchStringIndex = window.location.search.split(/[=?&]/g).indexOf('search') + 1;
    const searchString = window.location.search.split(/[=?&]/g)[searchStringIndex];

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true',
      data: this.props.data,
      searchString: searchString
    }

    if ( window.location.search.length !== 0 ) {
      this.handleFilter(searchString);
    }

    this.handleFilter = this.handleFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  clearFilter() {
    this.handleFilter("");
  }

  handleFilter (e) {
    const searchTerm = (e.target) ? e.target.value.toLowerCase() : e.toLowerCase();
    const urlParamString = ( !e || e === "" ) ? "" : "?filter=" + searchTerm ;
    let sortable = [];
    let results = [];

    if (this.state.searchString !== e) this.setState({searchString: searchTerm});

    this.props.history.push({
      search: urlParamString
    });

    for (let key in this.state.data) {
      sortable.push([key, this.state.data[key]]);
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

      if ( !entry.hideOnCat && (entry.playerKnown || this.state.dmView ) && 
        (entry.tags.some( tag => tag.toLowerCase().includes(searchTerm) ) || entry.name.toLowerCase().includes(searchTerm) || entry.nickname.toLowerCase().includes(searchTerm) || ( entry.races && entry.races.includes(searchTerm) ) ) 
      ) {
        results.push( key );
      }
      return true;
    });

    this.props.handleFilter( WikiUtils.sortByName(results) );
  }

  render() {
    const {searchString} = this.state;
    
    return (
      <form className={styles.filtering}>

        <div className={styles.infoBox} title="You can filter for identifying characteristics; ie. names, places, races, or other relevant identifiers."></div>

        <input className={styles.filterBox} placeholder="filter content" value={searchString} onChange={ this.handleFilter }/>
        
        <span className={styles.clearFilter} onClick={this.clearFilter}>x</span>

      </form>
    )
  }
}

export default withRouter(Filter);