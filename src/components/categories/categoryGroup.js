import React, { Component } from 'react';
import ListItem from 'components/categories/listItem';

import "styles/categories.scss";

class categoryGroup extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }
  }

  render () {
    const data = this.props.pageData;
    const category = this.props.category;

    const customHeading = () => {
      if ( this.props.heading !== undefined) {
        return <React.Fragment>{this.props.heading}</React.Fragment>
      } else {
        return <React.Fragment>{category}s</React.Fragment>
      }
    }

    return (
      <div className={`category ${category.replace(/\s/g,"-")}`}>
        <h2 className="sectionTitle">
          { customHeading() }
        </h2>

        <ul className="sectionList">
          { this.props.articles.map( entry => {
              if (data[entry].type === category) {
                return <ListItem key={data[entry].name} entry={data[entry]} imgStyle={`landscape ${this.props.imgStyle}`} />
              }
              return undefined;
            })
          }
        </ul>
      </div>
    )
  }

}

export default categoryGroup;