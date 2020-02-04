import React, { Component } from 'react';

class Characters extends Component {

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.location.state === 'update') {
      
    }
  }
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

export { Characters };

