import React, { Component } from 'react';
import WikiUtils from 'components/utils/wikiUtils';
import { Link } from 'react-router-dom';
import Page from 'components/page';
import Back from 'components/back';
import { TitleComponent } from 'components/titleComponent.js';

import banner      from "img/lore/banners/runesmithing-banner.png";

import runesArticle     from 'data/runes/info';
import allRunes         from 'data/runes/allRunes';

import weaponRune       from 'img/runes/6.svg';
import armorRune        from 'img/runes/2.svg';
import talismanRune     from 'img/runes/41.svg';

const images = require.context('img/runes/', true);

class Runes extends Component {

  constructor (props) {
    super(props);

    const dmView = localStorage.getItem('dmView') === 'true';

    this.state = {
      activeRuneType: "rules",
      activeRuneList: null,
      runeGroups: Object.keys(allRunes),
      itemRunes: [],
      cost: 0,
      dmView: dmView
    };

    this.getRuneList = this.getRuneList.bind(this);
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
      <Page.Runes>
        <TitleComponent title="Runes - Centhris Wiki" />
        <article className="dwarfRunes lore" >
          <Back/>
          <h2 className="fullName">Dwarven Runes</h2>
          <div className="pageBanner" style={{
            backgroundImage:`url(${banner})`,
            backgroundPosition: "center bottom"
          }}></div>

          <div className="mainContent">
            {
              WikiUtils.linkContent(runesArticle.entry, WikiUtils.textFormatting(runesArticle.entry.description) )
            }
            
            <h3 className="subjectArea">The Types of Runes</h3>
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

            <h3 className="subjectArea">The Rules of Runesmithing</h3>

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
      </Page.Runes>
    );
  }

  showRules() {

    this.setState({
      activeRuneType: "rules",
      activeRuneList: null
    });

  }

  getRuneList (e) {
    const runeType = e.target.value;

    // this.setState({
    //   activeRuneType: runeType,
    //   activeRuneList: dwarfRunes[runeType]      
    // });
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