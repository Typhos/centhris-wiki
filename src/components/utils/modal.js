import React, {Component} from 'react';


export default class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      thing: props.img
    };

    console.log(this.state.thing)
  }

  render () {

    return (
      <div className="modalWindow">
        hi
      </div>
    );
  }

};