import React, { Component } from 'react';
import 'styles/people.scss';

class Person extends Component {

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

export { Person };

