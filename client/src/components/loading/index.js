import React, { Component } from "react";
import styles from "./spinner.module.scss";

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    );
  }
}
