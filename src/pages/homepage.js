import React, { Component } from 'react';
import Page from 'components/page';
import WikiUtils from "components/utils/wikiUtils";
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import ListItem from 'components/categories/listItem';
import { TitleComponent } from 'components/titleComponent.js';

import 'styles/app.scss';
import 'styles/categories.scss';
import styles from "./homepage.module.scss";

import globe from "../img/globe.png";

export default class HomePage extends Component {

  render () {
    return (
      <Page.Default>
        <TitleComponent title="Centhris" />
        <article className={styles.homepage}>
          <section className="article">
            <div className={styles.central}>
              <div className={styles.globe} >
                <img src={globe}/>
              </div>
              <h2 className={styles.name}>Centhris</h2>
              <h3 className={styles.year}>The year 2C 2573</h3>
            </div>
          </section>
          <section className={styles.worldDescription}>
            {
              WikiUtils.linkContent({},[
                "The world of Centhris, in many ways, resembles our own in the early days of the Italian Renaissance, Ming dynasty, and Age of Exploration. Innovations in political thought, arcane study, and scientific theory are beginning to shake the foundations of old structures. After a millennia of recovery from the world shattering calamity of the Ruination, a new age of enlightenment has begun. As the various peoples of the world embrace innovations in science, magic and technology, great nations, and the powerful political interests at their center, seek to maintain control, lest they be swept away in the tide.",

                "Far from the clamour and tumult of the world's great cities, the people of small towns and villages make use of their day to day lives farming, hunting, foraging and building. The world beyond the civilized borders is as dangerous as it has ever been, with dangerous beasts, restless spirits, and savage warlords carving out their claim in the wild lands beyond the fortified walls of castle and village."
              ])
            }
          </section>
          <br/>
          <section id="categories">
            <div className="category">
              <h3 className="subjectArea">Featured Articles</h3>
              <ul className="sectionList">
                
                <ListItem entry={DataLoader.all["Centhrian-Pantheon"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["The-Vesdarian-Calendar"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["The-Second-Convergence"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Lords-of-the-Fell"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Courts-of-the-Feywild"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Khün-Mönnas"]} imgStyle="landscape" />

                <ListItem entry={DataLoader.all["The-Three-Moons-of-Centhris"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Navolin"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Lemuria"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Rakenburg"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Kilurus"]} imgStyle="landscape" />
                <ListItem entry={DataLoader.all["Postek"]} imgStyle="landscape" />
                
              </ul>
            </div>
          </section>
        </article>
      </Page.Default> 
    )
  }
}