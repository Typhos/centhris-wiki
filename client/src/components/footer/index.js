import React, {Component} from 'react';
import styles from "./footer.module.scss";

export default class Footer extends Component {
  
  render () {
    let date = new Date().getFullYear();
    return (
      <footer className={styles.footer}>
        <p>Copyright {date} Michael Curtis</p>
        <p>All art is copyright of the individual artist</p>
      </footer>
    )
  }

}