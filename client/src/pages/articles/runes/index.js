import React, { Component } from 'react';
import WikiUtils from 'components/utils/wikiUtils';
import { Link } from 'react-router-dom';
import Page from 'components/page';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import banner from "img/lore/banners/runesmithing-banner.png";

import runesArticle from 'data/runes/info';
import allRunes from 'data/runes/allRunes';

import weaponRune from 'img/runes/6.svg';
import armorRune from 'img/runes/2.svg';
import talismanRune from 'img/runes/41.svg';

import "styles/runes.scss"

const images = require.context('img/runes/', true);

class Runes extends Component {

  constructor (props) {
    super(props);

    this.state = {
      activeRuneType: "rules",
      activeRuneList: null,
      runeGroups: Object.keys(allRunes),
      itemRunes: [],
      cost: 0,
      dmView: localStorage.getItem('dmView') === 'true'
    };

    // this.getRuneList = this.getRuneList.bind(this);
    this.addRuneToItem = this.addRuneToItem.bind(this);
    this.showRules = this.showRules.bind(this);
  }

  // TODO: Update this to match the standards of other articles written later.

  render () {
    let rules = runesArticle["Rules of Forging"];
    
    let section = 
      <section id="infoSection">
        <ul className="runeList">
          { this.state.activeRuneList && 
            Object.keys(this.state.activeRuneList).map( key => {

              const effects = this.state.activeRuneList[key].effects.map( (e,i) => {
                return <p key={e}>{i+1} Rune(s): {e}</p>
              });

              const glyphs = this.state.activeRuneList[key].svg.map( (g, i) => {
                return <img key={g} alt="" className="runeImg" src={images('./' + g + '.svg')} />
              });

              if ( this.state.activeRuneList[key].found || this.state.dmView) {
                return(
                  <li className="rune" key={key}>
                    <div className="images">{glyphs}</div>
                    <h3 className="runeName">
                      <span className="name">{this.state.activeRuneList[key].name}</span>
                    </h3>
                    <div className="runeEffect">{effects}</div>
                    <div className="runeCost"><span className="num">{this.state.activeRuneList[key].baseCost}</span>gp</div>
                  </li>
                )
              }
              return undefined;
            })
          }
        </ul>
      </section>

    return (
      <Page.Article>
        <TitleComponent title="Runes - Centhris Wiki" />

        <article className="dwarfRunes article" >
          <Back/>

          <h1 className="article__heading">Dwarven Runes</h1>

          <div className="article__banner" style={{
            backgroundImage:`url(${banner})`,
            backgroundPosition: "center bottom"
          }}></div>

          <div className="mainContent">
            {
              WikiUtils.linkContent(runesArticle.entry, WikiUtils.textFormatting(runesArticle.entry.description), {"paragraphName":"article__paragraph", "linkName": "article__link"} )
            }
            
            <h2 className="article__subheading">The Types of Runes</h2>

            <div className="linksGroup">
              <Link className="runeGroupLink" to={`/rune-list?type=weapon-runes`}>
                <img className="runeImg" src={weaponRune} alt=""/>
                <p>Weapon Runes</p>
              </Link>
              <Link className="runeGroupLink" to={`/rune-list?type=armor-runes`}>
                <img className="runeImg" src={armorRune} alt=""/>
                <p>Armor Runes</p>
              </Link>
              <Link className="runeGroupLink" to={`/rune-list?type=talisman-runes`}>
                <img className="runeImg" src={talismanRune} alt=""/>
                <p>Talismanic Runes</p>
              </Link>
            </div>

            <h3 className="article__subheading">The Rules of Runesmithing</h3>

            <section id="ruleSection">
              <ul className="ruleList">
                {
                  rules.map( rule => {
                    return (
                      <li className="rule" key={rule}>
                        <h3>{rule.name}</h3>
                        {
                          rule.description.map( str => {
                            return (
                              <p>{ WikiUtils.textFormatting(str) }</p>
                            )
                          })
                        }
                      </li>
                    )
                  })
                }
              </ul>

              {/* <form id="runeType">
                <label key="rules" className={`rules ${ (this.state.activeRuneType === "rules") ? "active" : "" }`}>
                  The Rules of Forging
                  <input type="radio" name="runeType" className="choiceBtn"  value="rules" onClick={this.showRules} />
                </label>
                { 
                  this.state.runeGroups.map( x => {
                    if ( x !== "entry" ) {
                      return (
                        <label key={x} className={ (this.state.activeRuneType === x ) ? 'active' : '' }>
                          {x}<input type="radio" name="runeType" className="choiceBtn"  value={x} onChange={this.getRuneList} />
                        </label>
                      )
                    }
                  })
                }              
              </form> */}
            </section>
          </div>
        </article>
      </Page.Article>
    );
  }

  showRules() {
    this.setState({
      activeRuneType: "rules",
      activeRuneList: null
    });

  }

  addRuneToItem (e) {
    let itemRunes = this.state.itemRunes;
    itemRunes.push( e.target.closest('li').querySelector('.name').innerHTML );

    this.setState({

      cost: this.state.cost + parseInt(e.target.closest('li').querySelector('.num').innerHTML ) 
    });
  }

}

export {Runes};