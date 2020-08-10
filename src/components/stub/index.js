import React, {Component} from 'react';
import styles from "./stub.module.scss";

export default class Stub extends Component {
  
  render () {
    return (
      <div className={styles.stub}>
        <h3 className={styles.heading}>This article is a stub</h3>
        <p className={styles.text}>If you feel it requires an update to help with your understanding of the world, please let the GM know.</p>
      </div>
    )
  }

}
