import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Back from 'components/back';
import DataLoader from 'components/utils/dataLoader';
import { TitleComponent } from 'components/titleComponent.js';

// My Components
import WikiUtils from "components/utils/wikiUtils";
import Page from 'components/page';

// STYLES
import 'styles/categories.scss';
import 'styles/spellCategories.scss';

class SpellCategories extends Component {

  constructor (props) {
    super(props);

    const data = DataLoader.spells;

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    let filteredOutput = {};
    let dmView = localStorage.getItem('dmView') === 'true';

    for (let [key, obj] of Object.entries(data)) {
      if ( obj.playerKnown || dmView ) {
        filteredOutput[key] = obj;
      }
    }

    const knownSpells = WikiUtils.sortByName( Object.keys(filteredOutput) );

    let schools = knownSpells.map( spell => {
      return data[spell].school;
    });
    let uniqueSet = new Set(schools);
    schools = [...uniqueSet];

    let levels = knownSpells.map( spell => {
      return data[spell].level;
    });
    uniqueSet = new Set(levels);
    levels = [...uniqueSet];

    let damageEffect = knownSpells.map( spell => {
      return data[spell].damageEffect;
    });
    uniqueSet = new Set(damageEffect);
    damageEffect = [...uniqueSet];

    this.state = {
      spellsArray: WikiUtils.sortByName( Object.keys(filteredOutput) ),
      levelsArray: WikiUtils.sortByName(levels),
      schoolsArray: WikiUtils.sortByName(schools),
      damageEffectArray: WikiUtils.sortByName(damageEffect),
      sorting: "school",
      dmMode: dmView,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.getSpellsByCat = this.getSpellsByCat.bind(this);
  }

  render () {
    const schoolsArray = this.state.schoolsArray;
    const levelsArray = this.state.levelsArray;
    const damageEffectArray = this.state.damageEffectArray;

    return (
      <Page.Default>
        <TitleComponent title="Spells - Centhris Wiki" />
        <Back/>

        <h2 className="sectionGroup">Spells</h2>

        <div className="subNav spells">
          <label>Sort Spells By:</label>
          <button className={`sortButton ${ (this.state.sorting === "school") ? "active" : ""}`} onClick={ () => { this.setState({sorting: "school"}) }}>School</button>
          <button className={`sortButton ${ (this.state.sorting === "level") ? "active" : ""}`} onClick={() => { this.setState({sorting: "level"}) }}>Level</button>
          <button className={`sortButton ${ (this.state.sorting === "effect") ? "active" : ""}`} onClick={() => { this.setState({sorting: "effect"}) }}>Damage / Effect</button>
        </div>

        <div id="categories" className="spells" >
          { this.state.sorting === "school" && 
            schoolsArray.map( school => {
              return <div className="category" key={school}>
                <h2 className="sectionTitle">{school}</h2>
                {this.getSpellsByCat("school", school)}
              </div>
            })
          }
          { this.state.sorting === "level" && 
            levelsArray.map( level => {
              return <div className="category" key={level}>
                <h2 className="sectionTitle">{level}</h2>
                {this.getSpellsByCat("level", level)}
              </div>
            })
          }
          { this.state.sorting === "effect" && 
            damageEffectArray.map( effect => {
              return <div className="category" key={effect}>
                <h2 className="sectionTitle">{effect}</h2>
                {this.getSpellsByCat("damageEffect", effect)}
              </div>
            })
          }
        </div>
      </Page.Default>
    )
  }

  handleSearch(results) {
    this.setState({orgs: results});
  }

  getSpellsByCat(category, val) {
    const allSpells = DataLoader.spells;
    const images = require.context('img/spellSchools/', false);

    return <ul className="sectionList">
        { Object.keys( allSpells ).map( spell => {
          if ( allSpells[spell][category] === val ) {
            return <li className="entry" key={spell}>
              <Link to={`/spell/${spell}`}>
                { images.keys().some(x => x.includes( allSpells[spell].school )) && 
                  <figure className="imgBox">
                    <img className="landscape noTilt spellSchool" alt="" src={ images('./' + allSpells[spell].school + '.png') }/>
                  </figure>
                }
                { allSpells[spell].name }
              </Link>
            </li>
          }
          
          return undefined;
        }) 
      }
      </ul>
  }

}

export { SpellCategories };

