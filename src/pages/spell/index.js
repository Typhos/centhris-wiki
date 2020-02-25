import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import DataLoader from 'components/utils/dataLoader';
import Back from '../../components/back';

import Page from 'components/page';

import "styles/spells.scss";

class Spell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: window.location.pathname,
      spell: DataLoader.spells[ decodeURI(window.location.pathname.split('/spell/')[1] )],
      dmView: localStorage.getItem('dmView') === 'true'
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps){

    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        spell: DataLoader.spells[ decodeURI(window.location.pathname.split('/spell/')[1] )],
      });
    }
    
  }

  render () {
    const images = require.context('img/spellSchools/', false);
    const spell = this.state.spell;

    return (
      <Page.Group>
        <section id="spell" className="article" >
          <article className="group" id={spell.name.replace(/\s/g,"-")}>
            
            <Back/>

            <h2 className="fullName">{spell.nickname}</h2>
            <aside className="infoBox">
              <h4 className="nickname">{spell.name}</h4>
              { images.keys().some(x => x.includes( spell.school.replace(/\s/g,"-") )) && 
                <figure className="imgBox">
                  <img className="portrait spellSchool" alt="" src={ images('./' + spell.school.replace(/\s/g,"-") + '.png') }/>
                </figure>
              }
              { spell.school &&
                <div className="info">
                  <p className="key">School</p>
                  <p className="values">{spell.school}</p>
                </div>
              }
              { spell.level &&
                <div className="info big">
                  <p className="key">Level</p>
                  <strong className="values green">{spell.level}</strong>
                </div>
              }
              { spell.damageEffect &&
                <div className="info">
                  <p className="key">Damage/Effect</p>
                  <p className="values">{spell.damageEffect}</p>
                </div>
              }
              { spell.castingTime &&
                <div className="info">
                  <p className="key">Casting Time</p>
                  <p className="values">{spell.castingTime}</p>
                </div> 
              }
              { spell.range &&
                <div className="info">
                  <p className="key">Range/Area</p>
                  <p className="values">{spell.range}</p>
                </div>
              }
              { spell.components &&
                <div className="info">
                  <p className="key">Components</p>
                  <p className="values">{
                    spell.components.map( (comp,i) => {
                      if ( i < spell.components.length - 1) {
                        return <span>{comp + ", "}</span>;
                      } else {
                        return <span>{comp}</span>;
                      }
                    })
                  }</p>
                </div>
              }
              { spell.materialComponent && 
                <div className="info">
                  <p className="key">Material Component(s)</p>
                  <p className="values">{spell.materialComponent}</p>
                </div>
              }
              { spell.duration &&
                <div className="info">
                  <p className="key">Duration</p>
                  <p className="values">{spell.duration}</p>
                </div>
              }
              { spell.attackOrSave &&
                <div className="info">
                  <p className="key">Attack/Save</p>
                  <p className="values">{spell.attackOrSave}</p>
                </div>
              }
              { spell.classes &&
                <div className="info">
                  <p className="key">Available to:</p>
                  <div className="values">{
                    spell.classes.map( pc => <p class="demiList">{pc}</p> )
                  }</div>
                </div>
              }
            </aside>
            <div className="mainContent">
              {
                WikiUtils.linkContent(spell, WikiUtils.textFormatting(spell.description))
              }
            </div>

          </article>
        </section>
      </Page.Group>
    )
  }
}

export { Spell };

