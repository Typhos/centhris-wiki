import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';

import styles from './search.module.scss';
import SearchLogic from "components/search/searchLogic";
import dataLoader from "components/utils/dataLoader";

class Search extends Component {

  constructor(props) {
    super(props);

    const searchStringIndex = window.location.search.split(/[=?&]/g).indexOf('search') + 1;
    const searchString = window.location.search.split(/[=?&]/g)[searchStringIndex];

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true',
      data: this.props.data,
      searchString: searchString,
      searchResults: []
    }

    this.updateSearchString = this.updateSearchString.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  clearSearch() {
    this.setState({
      searchResults: [],
      searchString: ""
    });
    // this.handleSearch();
  }

  updateSearchString (e) {
    const searchTerm = (e.target) ? e.target.value.toLowerCase() : e.toLowerCase();

    if (this.state.searchString !== e) this.setState({searchString: searchTerm});
  }

  handleSearch(e) {
    e.preventDefault();
    
    if ( this.state.searchString.length >= 3 ) {
      this.setState({searchResults: SearchLogic(this.state.searchString, this.state.dmView) });
    } else {
      this.setState({searchResults: []});
    }
  }

  render() {
    const searchResults = this.state.searchResults;
    const images = require.context('img/', true);

    return (
      <div className={styles.search}>
        <div className={styles.container}>
          <form className={styles.searchForm} onSubmit={this.handleSearch} onKeyUp={this.handleSearch}>
            <input className={styles.searchBox} placeholder="search" value={this.state.searchString} onChange={ this.updateSearchString }/>
            <button className={styles.searchButton}></button>
          </form>
        </div>
        
        { searchResults.length > 0 && 
          <div className={styles.searchResults}>
            <ul className={styles.results}>
              {
                searchResults.map( res => {
                  let path = images.keys().filter( path => path.includes( res.name )).filter( path => !path.includes("maps"))[0];
                  if ( !path && dataLoader.all[res.name].forceImg ) path = images.keys().filter( path => path.includes( dataLoader.all[res.name].forceImg )).filter( path => !path.includes("maps"))[0];

                  if ( res.playerKnown || this.state.dmView ) {
                    return (
                      <li key={res.name} className={styles.listItem}>
                       { res.path && path !== undefined &&
                        <Link to={`/${res.path}/${res.name}`} className="crop" onClick={this.clearSearch} >
                          <img className={styles.searchImg} alt="" src={ images(path) }/>
                        </Link>
                       }
                       { ( !res.path || !path ) &&
                        <div className={styles.noImg}></div>
                       }
                        <Link className={styles.textLink} to={`/${res.path}/${res.name}`} onClick={this.clearSearch} >{res.displayName}</Link>
                      </li>
                    )
                  }

                  return undefined;
                })
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Search);