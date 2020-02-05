import React, { Component } from 'react';
import Navigation from 'components/header/navigation';

class Characters extends Component {

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.location.state === 'update') {
      
    }
  }
  render () {
    return (
      <div className="App">
        <Navigation />
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }

}

export { Characters };

