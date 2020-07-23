import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils.js";
import DataLoader from 'components/utils/dataLoader';

// import { Link } from 'react-router-dom';
// import getImgPath from "components/utils/getImgPath.js";


import "styles/statBlock.scss";

export default class StatBlock extends Component {

  constructor (props) {
    super(props);

    this.state = {
      entry: this.props.entry,
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.allies = this.allies.bind(this);
    this.getMod = this.getMod.bind(this);
    this.statBlock = this.statBlock.bind(this);
  }

  getMod(score) {
    const num = Math.round( (10.5 - score ) * -1 / 2 );
    return ( num >= 0 ) ? `+${num}` : `${num}`;
  }

  render() {
    const entry = this.state.entry;
    const block = entry.statBlock;

    if ( block && ( block.show || this.state.dmView ) ) {
      return (
        <div className="statBlocks">
          {
            this.statBlock(entry, block)
          }
          { entry.allies &&
            this.allies()
          }
        </div>
      );
    } else {
      return false;
    }
  }

  allies() {
    const allies = this.state.entry.allies;
    const allyData = allies.map( str => DataLoader.all[str.replace(/\s/g,"-")] );

    return allyData.map( entry => {
      const block = entry.statBlock;

      return (
        this.statBlock(entry, block)
      )
    });
  }

  statBlock(entry, block) {
    return (
      <div className="statsShell">
        <section id="statBlock">
          <div className="grouping heading">
            <h3 className="entryName">{entry.name}</h3>
            <p>{WikiUtils.textFormatting( `@*${block.creatureType}*@` )}, {WikiUtils.textFormatting(`@*${block.alignment}*@`)}</p>
          </div>
          <div className="grouping basics">
            <p><strong>Armor Class</strong> {block.armor}</p>
            <p><strong>Hit Points</strong> {block.hitPoint} ({block.hitDie})</p>
            <p><strong>Speed</strong> {block.speed}</p>
          </div>
          <div className="grouping stats">
            {
              block.stats.map( stat => {
                return <p className="block" key={stat.name}>
                  <strong>{stat.name}</strong> <span className="numerical">{stat.val} <small>({this.getMod(stat.val)})</small></span>
                </p>
              })
            }
          </div>
          <div className="grouping general">
            { block.savingThrows &&
              <p><strong>Saving Throws</strong> {block.savingThrows}</p>
            }
            { block.skills &&
              <p><strong>Skills</strong> {block.skills}</p>
            }
            { block.damageResistances &&
              <p><strong>Damage Resistances</strong> {block.damageResistances}</p>
            }
            { block.damageImmunities &&
              <p><strong>Damage Immunities</strong> {block.damageImmunities}</p>
            }
            { block.damageVulnerabilities &&
              <p><strong>Damage Vulnerabilities</strong> {block.damageVulnerabilities}</p>
            }
            { block.conditionImmunities &&
              <p><strong>Condition Immunities</strong> {block.conditionImmunities}</p>
            }
            <p>
              <strong>Senses</strong> 
                {block.senses}
                {block.senses && block.passiveWisdom && <React.Fragment>, </React.Fragment>} 
                passive Perception {block.passiveWisdom}
            </p>
            { block.languages &&
              <p><strong>Languages</strong> {block.languages}</p>
            }
            { !block.languages &&
              <p><strong>Languages</strong> &mdash; </p>
            }
            <p><strong>Challenge</strong> {block.challenge}</p>
          </div>
          <div className="grouping abilities">
            {
              block.abilities.map( ability => {
                return <p key={ability.name}>
                  <strong>{ability.name}</strong> <span className="descriptionText">{ WikiUtils.textFormatting(ability.text) }</span>
                  { ability.list && 
                    <ul className="abilityList">
                      { ability.list.map( (str, i) => {
                          return <li className="abilityItem" key={ability.name + "-" + i}>{str}</li>
                        })
                      }
                    </ul> 
                  }
                </p>
              })
            }
          </div>
          <div className="grouping actions">
            <h4 className="heading">Actions</h4>
            {
              block.actions.map( action => {
                return <p key={action.name}>
                  <strong>{action.name}</strong> { WikiUtils.textFormatting(action.text) }
                </p>
              })
            }
          </div>
          { block.bonusActions && 
            <div className="grouping reactions">
              <h4 className="heading">Bonus Actions</h4>
              {
                block.bonusActions.map( bonus => {
                  return <React.Fragment key={bonus}>
                    <p>
                      <strong>{bonus.name}</strong> { WikiUtils.textFormatting(bonus.text) }
                    </p>
                  </React.Fragment>
                })
              }
            </div>
          }
          { block.reactions && 
            <div className="grouping reactions">
              <h4 className="heading">Reactions</h4>
              {
                block.reactions.map( reaction => {
                  return <React.Fragment key={reaction}>
                    <p>
                      <strong>{reaction.name}</strong> { WikiUtils.textFormatting(reaction.text) }
                    </p>
                  </React.Fragment>
                })
              }
            </div>
          }
          { block.villainActions &&
            <div className="grouping villain">
              <h4 className="heading">Villain Actions</h4>
              {
                block.villainActions.map( actions => {
                  return <React.Fragment key={actions}>
                    <p>
                      <strong>{actions.order}{actions.name}</strong> { WikiUtils.textFormatting(actions.text) }
                    </p>
                  </React.Fragment>
                })
              }
            </div>
          }
          { block.legendary &&
            <div className="grouping legendary">
              <h4 className="heading">Legendary Actions</h4>
              {
                block.legendary.map( legendary => {
                  if ( legendary.name === 'description' ) {
                    return <React.Fragment key={legendary.text}>
                      <p>
                        {legendary.text}
                      </p>
                    </React.Fragment>
                  }

                  return <React.Fragment key={legendary.name}>
                    <p>
                      <strong>{legendary.name}</strong> { WikiUtils.textFormatting(legendary.text) }
                    </p>
                  </React.Fragment>
                })
              }
            </div>
          }
        </section>
      </div>
    )
  }

}