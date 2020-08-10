import React, { Component } from 'react';
import ListItem from 'components/categories/listItem';

// import "styles/categories.scss";

class categoryGroup extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }
  }

  render () {
    const {pageData, category, heading, articles, imgStyle, fullWidth} = this.props

    const customHeading = () => {
      if ( heading !== undefined) {
        return <React.Fragment>{heading}</React.Fragment>
      } else {
        return <React.Fragment>{category}s</React.Fragment>
      }
    }

    return (
      <div className={`${ fullWidth ? "category__fullWidth" : "category__group"} ${category.replace(/\s/g,"-")}`}>
        <h2 className="category__subheading">
          { customHeading() }
        </h2>

        <ul className="category__list">
          { articles.map( entry => {
              if (pageData[entry].type === category) {
                return <ListItem key={pageData[entry].name} entry={pageData[entry]} imgStyle={`landscape ${imgStyle}`} />
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