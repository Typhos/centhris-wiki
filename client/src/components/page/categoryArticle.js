import React, { Component } from 'react';
import Navigation from 'components/navigation';

import "styles/articles.scss";
import "styles/categories.scss";

class CategoryArticle extends Component {

  render () {
    return (
      <div className="app">
        <Navigation />
        <main className="content article">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { CategoryArticle };

