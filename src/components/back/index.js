import React, { Component } from 'react';


export default class Back extends Component {
  
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  render() {
    return (
      <div id="backLink">
        <p onClick={this.goBack}>&laquo; Back</p>
      </div>
    )
  }

  goBack() {
    window.history.back();
  }

}