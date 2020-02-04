import React, { Component } from 'react';

// import 'styles/LoreCategories.scss';

class LoreCategories extends Component {

  render () {
    return (
      <div className="App">
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { LoreCategories };

