import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TitleComponent } from 'components/titleComponent.js';

// My Components
import WikiUtils from "components/utils/wikiUtils";
import Page from 'components/page';
import getImgPath from "components/utils/getImgPath.js";
import DataLoader from 'components/utils/dataLoader';
import Back from 'components/back';

// Styles
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

    this.handleFilter = this.handleFilter.bind(this);
    this.getSpellsByCat = this.getSpellsByCat.bind(this);
  }

  render () {
    const numberOfArticles = this.state.spellsArray.length;
    const schoolsArray = this.state.schoolsArray;
    const levelsArray = this.state.levelsArray;
    const damageEffectArray = this.state.damageEffectArray;

    return (
      <Page.Category>
        <TitleComponent title="Spells - Centhris Wiki" />
        <Back/>

        <h1 className="category__heading">
          Spells <small>({numberOfArticles} { (numberOfArticles > 1 || numberOfArticles === 0) ? "Spells" : "Spell"})</small>
        </h1>

        <div className="subNav spells">
          <label>Sort Spells By:</label>
          <button className={`sortButton ${ (this.state.sorting === "school") ? "active" : ""}`} onClick={ () => { this.setState({sorting: "school"}) }}>School</button>
          <button className={`sortButton ${ (this.state.sorting === "level") ? "active" : ""}`} onClick={() => { this.setState({sorting: "level"}) }}>Level</button>
          <button className={`sortButton ${ (this.state.sorting === "effect") ? "active" : ""}`} onClick={() => { this.setState({sorting: "effect"}) }}>Damage / Effect</button>
        </div>

        <div className="spells" >
          { this.state.sorting === "school" && 
            schoolsArray.map( school => {
              return <div className="category__group" key={school}>
                <h2 className="category__subheading">{school}</h2>
                {this.getSpellsByCat("school", school)}
              </div>
            })
          }
          { this.state.sorting === "level" && 
            levelsArray.map( level => {
              return <div className="category__group" key={level}>
                <h2 className="category__subheading">{level}</h2>
                {this.getSpellsByCat("level", level)}
              </div>
            })
          }
          { this.state.sorting === "effect" && 
            damageEffectArray.map( effect => {
              return <div className="category__group" key={effect}>
                <h2 className="category__subheading">{effect}</h2>
                {this.getSpellsByCat("damageEffect", effect)}
              </div>
            })
          }
        </div>
      </Page.Category>
    )
  }

  handleFilter(results) {
    this.setState({orgs: results});
  }

  getSpellsByCat(category, val) {
    const allSpells = DataLoader.spells;

    return <ul className="category__list">
        { Object.keys( allSpells ).map( spell => {
          if ( allSpells[spell][category] === val ) {
            return <li className="category__entry" key={spell}>
              <Link to={`/spell/${spell}`}>
                <figure className="imgBox">
                  <img className="landscape noTilt spellSchool" alt="" src={ getImgPath( allSpells[spell].school ) }/>
                </figure>
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

