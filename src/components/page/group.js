import React, { Component } from 'react';

class Group extends Component {
  
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

export { Group };

