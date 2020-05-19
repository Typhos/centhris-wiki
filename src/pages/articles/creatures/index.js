import React, { Component } from 'react';
import DataLoader from 'components/utils/dataLoader';
import WikiUtils from 'components/utils/wikiUtils';
import Back from 'components/back';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';
import { Redirect } from "react-router-dom";

import "styles/creatureArticle.scss";

class Creatures extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      pathname: decodeURI(window.location.pathname),
      creature: decodeURI(window.location.pathname.split('/creature/')[1]),
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
    this.hiddenStats = this.hiddenStats.bind(this);
    this.getStatBlock = this.getStatBlock.bind(this);
    this.getMod = this.getMod.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.state.pathname !== nextProps.location.pathname) {
      this.setState({
        pathname: nextProps.location.pathname,
        creature: decodeURI(window.location.pathname.split('/creature/')[1])
      });
    }
  }

  render () {

    const images = require.context('img/creatures/', true);
    const all = DataLoader.creatures;
    const creature = all[this.state.creature];

    if (!creature) {
      return (
        <Redirect to="/404" />
      )
    }

    const imgPath = images.keys().some( x => x.includes( creature.name.replace(/\s/g,"-") )) &&  images('./' + creature.name.replace(/\s/g,"-") + '.png');

    return (
      <Page.Default>
        <article className="article creature" >
          <TitleComponent title={`${creature.name} - Centhris Wiki`} />
          <Back/>

          <h2 className="fullName">{creature.nickname}</h2>
          
          <aside className={`infoBox ${ this.state.dmView || ""}`}>
            <h4 className="nickname">{creature.name}</h4>
            <img className="portrait" alt="" src={imgPath}/>
            { creature.creatureType &&
              <div className="info affiliations">
                <p className="key">Type</p>
                <p className="values">{WikiUtils.textFormatting(creature.creatureType)}</p>
              </div>
            }
            { creature.affiliations &&
              <div className="info affiliations">
                <p className="key">Affiliation(s)</p>
                <div className="values">{WikiUtils.linkContent(creature, creature.affiliations)}</div>
              </div>
            }
            { this.state.dmView &&
              this.hiddenStats(creature)
            }
          </aside>
          <div className="mainContent">
            { creature.quote && <i className="quote">{creature.quote}</i> }
            { this.getArticles(creature) }
          </div>

          { ( this.state.dmView || creature.showStatBlock ) &&
            <div className="statsShell">
              {this.getStatBlock(creature)}
            </div>
          }
        </article>
      </Page.Default>
    )
  }

  hiddenStats(creature) {
    return <React.Fragment>
      { creature.challenge && 
        <div className="info">
          <p className="key">Challenge</p>
          <p className="values">{creature.challenge}</p>
        </div>
      }
      { creature.alignment && this.state.dmView && 
        <div className="info">
          <p className="key">Alignment</p>
          <p className="values">{creature.alignment}</p>
        </div>
      }
    </React.Fragment>
  }

  getArticles(creature) {
    let content = [WikiUtils.linkContent(creature, WikiUtils.textFormatting( creature.description) )];

    if (creature.articles) {
      for ( let [heading, array] of Object.entries(creature.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(creature, WikiUtils.textFormatting(array))}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && creature.dmArticles ) {
      for ( let [heading, array] of Object.entries(creature.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(creature, WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }

  getMod(score) {
    const num = Math.round( (10.5 - score ) * -1 / 2 );
    return ( num >= 0 ) ? `+${num}` : `${num}`;
  }

  getStatBlock(creature) {
    return <section id="statBlock">
      <div className="grouping heading">
        <h3 className="creatureName">{creature.name}</h3>
        <p>{WikiUtils.textFormatting( `@*${creature.creatureType}*@` )}, {WikiUtils.textFormatting(`@*${creature.alignment}*@`)}</p>
      </div>
      <div className="grouping basics">
        <p><strong>Armor Class</strong> {creature.armor}</p>
        <p><strong>Hit Points</strong> {creature.hitPoint} ({creature.hitDie})</p>
        <p><strong>Speed</strong> {creature.speed}</p>
      </div>
      <div className="grouping stats">
        {
          creature.stats.map( stat => {
            return <React.Fragment>
              <p class="block">
                <strong>{stat.name}</strong> <p class="numerical">{stat.val} <small>({this.getMod(stat.val)})</small></p>
              </p>
            </React.Fragment>
          })
        }
      </div>
      <div className="grouping general">
        { creature.savingThrows &&
          <p><strong>Saving Throws</strong> {creature.savingThrows}</p>
        }
        { creature.skills &&
          <p><strong>Skills</strong> {creature.skills}</p>
        }
        { creature.damageResistances &&
          <p><strong>Damage Resistances</strong> {creature.damageResistances}</p>
        }
        { creature.damageImmunities &&
          <p><strong>Damage Immunities</strong> {creature.damageImmunities}</p>
        }
        { creature.conditionImmunities &&
          <p><strong>Condition Immunities</strong> {creature.conditionImmunities}</p>
        }
        <p><strong>Senses</strong> {creature.senses}, passive Perception {creature.passiveWisdom}</p>
        { creature.languages &&
          <p><strong>Languages</strong> {creature.languages}</p>
        }
        { !creature.languages &&
          <p><strong>Languages</strong> &mdash; </p>
        }
        <p><strong>Challenge</strong> {creature.challenge}</p>
      </div>
      <div className="grouping abilities">
        {
          creature.abilities.map( ability => {
            return <React.Fragment>
              <p>
                <strong>{ability.name}</strong> { WikiUtils.textFormatting(ability.text) }
              </p>
            </React.Fragment>
          })
        }
      </div>
      <div className="grouping actions">
        <h4 className="heading">Actions</h4>
        {
          creature.actions.map( action => {
            return <React.Fragment>
              <p>
                <strong>{action.name}</strong> { WikiUtils.textFormatting(action.text) }
              </p>
            </React.Fragment>
          })
        }
      </div>
      { creature.bonusActions && 
        <div className="grouping reactions">
          <h4 className="heading">Bonus Actions</h4>
          {
            creature.bonusActions.map( bonus => {
              return <React.Fragment>
                <p>
                  <strong>{bonus.name}</strong> { WikiUtils.textFormatting(bonus.text) }
                </p>
              </React.Fragment>
            })
          }
        </div>
      }
      { creature.reactions && 
        <div className="grouping reactions">
          <h4 className="heading">Reactions</h4>
          {
            creature.reactions.map( reaction => {
              return <React.Fragment>
                <p>
                  <strong>{reaction.name}</strong> { WikiUtils.textFormatting(reaction.text) }
                </p>
              </React.Fragment>
            })
          }
        </div>
      }
      { creature.villainActions &&
        <div className="grouping villain">
          <h4 className="heading">Villain Actions</h4>
          {
            creature.villainActions.map( actions => {
              return <React.Fragment>
                <p>
                  <strong>{actions.order}{actions.name}</strong> { WikiUtils.textFormatting(actions.text) }
                </p>
              </React.Fragment>
            })
          }
        </div>
      }
      { creature.legendary &&
        <div className="grouping legendary">
          <h4 className="heading">Legendary Actions</h4>
          {
            creature.legendary.map( legendary => {
              if ( legendary.name === 'description' ) {
                return <React.Fragment>
                  <p>
                    {legendary.text}
                  </p>
                </React.Fragment>
              }

              return <React.Fragment>
                <p>
                  <strong>{legendary.name}</strong> { WikiUtils.textFormatting(legendary.text) }
                </p>
              </React.Fragment>
            })
          }
        </div>
      }
      
    </section>
  }
}

export { Creatures };

