import React, { Component } from 'react';
import styles from "./backLink.module.scss";

export default class Back extends Component {
  
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  render() {
    return (
      <div className={styles.backLink}>
        <button className={styles.btn} onClick={this.goBack}>&laquo; Back</button>
      </div>
    )
  }

  goBack() {
    window.history.back();
  }

}