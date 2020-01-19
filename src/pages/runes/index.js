import React, { Component } from 'react';
import dwarfRunes from '../../data/dwarfRunes';

import Page from '../../components/page';

const images = require.context('../../img/runes/', true);

class Runes extends Component {

  constructor (props) {
    super(props);
    this.state = {
      activeRuneType: null,
      activeRuneList: null,
      runeGroups: Object.keys(dwarfRunes),
      itemRunes: [],
      cost: 0
    };

    this.getRuneList = this.getRuneList.bind(this);
    this.addRuneToItem = this.addRuneToItem.bind(this);
    this.showRules = this.showRules.bind(this);
  }

  render () {    
    let section;

    if ( this.state.activeRuneType === "rules" ) {
      section = 
        <section id="ruleSection">
          <ul>
            <li>
              <h3>Rule of Mastery</h3>
              <p>Runic items hold incredible magical enchantments, wards and invocations. Any runic item possessed by the bearer requires attunement, no matter how many runes the item contains.</p>
            </li>
            <li>
              <h3>Rule of Three</h3>
              <p>No item can have more than three runes. It is virtually impossible to forge items that can bare the strain of carrying so much power.</p>
            </li>
            <li>
              <h3>Rule of Form</h3>
              <p>Weapon runes can only be inscribed on weapons, armor runes can only be inscribed on armor, and wondrous runes can only be inscribed on talismans or wondrous items.</p>
            </li>
            <li>
              <h3>Rule of Pride</h3>
              <p>Creating runic items takes a great deal of effort, and Runesmiths don’t like repeating themselves. Nor do they copy other Runesmiths’ work, except during their apprenticeship. As such, runesmiths will rarely create multiple of a given type of runic item. Generally, runesmiths avoid forging items with the same combination of runes on a regular basis, often waiting months or years before they willingly forge an item with a set of runes they have used before.
              </p>
              <p>This restriction also applies to the use of single runes, though some smiths do specialize in certain kinds of more common runes.</p>
            </li>
            <li>
              <h3>Rule of Power</h3>
              <p>If a runesmith wishes to create an item with multiple different runes, the cost of creating such an item scales with the number of runes on the item. The first rune forged costs the normal amount. A second rune increases the cost of forging the double the cost of the two runes added together. If a third rune is added, the item's cost increases to 3 times the cost of the combined runes, such is the skill and power needed to harness magical energies into the item.</p>
              <p>After many trials and mishaps, runesmiths have found that sometimes the same rune can be used multiple times on an item to gain additional effects.</p>
              <p>Though runesmiths can forge powerful items with multiple runes, repeating the same rune on an item multiple times increases the difficulty of creating such an item. If a runesmith wishes to create an item with multiple of the same rune, the cost of creating such an item scales exponentially. The first rune forged costs the normal amount. A second of the same rune increases the cost of forging the by ten fold. If the final rune is the same as well, the item's cost increases to 100x the base cost of the first rune, such is the skill and power needed to harness magical energies into the item.</p>
              
              <small><strong>Example:</strong> Brokki Highmountain is forging a blade for the Duke of Stonzik. The duke has requested Brokki forge the blade with three Runes of Immolation. The first Rune of Immolation costs 250gp to forge. Adding the second rune increases the cost 2x, meaning if Brokki were to stop there, the blade would be worth 2,500gp. Adding a third Rune of Immolation to a blade can only be achieved by the greatest Master Runesmiths at incredible time and material cost, meaning the item would now cost 25,000gp to forge.</small>

              <small><strong>Example:</strong> Igna Silverhorn is crafting a hammer for the Thane of Felrast and wishes to combine multiple different runes to create an artistic masterpiece that she feels represents the new Thane. After much diliberation, Igna settles on a Rune of Strength (2500), a Rune of Binding (250) and a Rune of Warning (500). The cost of this item would be as follows: (2500 + 250 + 500) * 3 = 9750g.</small>

              <small><strong>Example:</strong> Grimmir the Wyrmslayer has commissioned a new axe to commemorate his latest victory over a white dragon. Grimmir requests that the axe be forged with 2 Runes of Striking (250) and a Master Rune of Glory (5000). The cost of this item would be as follows: (250*10 + 5000) * 3 = 22,500g.</small>
            </li>
            <li>
              <h3>Rule of Immutability</h3>
              <p>Runesmiths take great pride in their work, going to great lengths to hone their craft and ensure that each item they make is of the highest standards. No runesmith is willing to remove runes once they have been added to an item, regardless of wether the rune is one they forged, or the work of another. Once a rune has been added to an item, it is forever a part of that item.</p>
              <p>Runesmiths are willing, however, to add new runes to existing items. The cost for adding a new rune to an existing item is the full cost of the new rune(s) minus the previously paid cost.</p>
              <small><strong>Example:</strong> Lethindrik the wizard wishes to have his Amulet of Arcane Supremicy infused with a new rune. The amulet already contains a Master Rune of the Spellbreaker (5000g) and a Rune of Focus (250g). If Lethindrik wished to have a Rune of Warding (500g) added to the amulet, the cost would be: (5000 + 250 + 500) * 3 - (5000 + 250) * 2 = 6750g.</small>
            </li>
            <li>
              <h3>Jealous Runes</h3>
              <p>No more than one master rune can be inscribed on an item. Master runes are so powerful that they cannot be combined together on the same item, or used together on the same battlefield. For this reason, Runesmiths describe these runes as Jealous Runes. If two of the same master rune exist </p>
              <small><strong>Example:</strong> Bandan Ironhelm is a Master Runesmith who has honed his craft for 350 years, and has mastered the rites to craft 6 standard runes and 2 master runes. Lady Fayne Dumbert, a hedge knight, requests Master Ironhelm craft her a new flanged mace with the Master Rune of Swiftness and the Master Rune of the Summit forged upon it. If Master Ironhelm were to attempt this, the results would likely be catastrophic, possibly killing him and those around him as the runic magic sunders violently. As such, he refuses and forces Lady Fayne to choose only one Master Rune for her weapon.</small>

              <small>In addition, if Lady Fayne were to request her companion, Besik the Minstrel, also recieve a weapon forged with the same master rune, Master Ironhelm could craft such an item, assuming it also follows the Rule of Pride. However, only one of their weapons could be activated upon the field of battle, as the other runic weapon would grow jealous and refuse to function.</small>
            </li>
            <li>
              <h3>Esoteric Rites</h3>
              <p>The most basic runes that a Runesmith can forge require years of mastery. A smith must know the proper incantations, material components, rhythmic patterns of hammering and any other more esoteric requirements to forge a given rune.  The most powerful runes might require a runesmith to hammer a specific pattern perfectly for 12 hours under the light of a waxing moon. A single missed swing or slip of the hand rending the rune worthless and inert. Others might require rare or dangerous materials, such as powdered dragonscale or the tongue of a mimic, or the item might require tempering or quenching in a specific liquid, such as fresh troll's blood, in order to activate the rune during forging. Each rune is different and temperamental. Beyond the material cost of a rune, the DM might require someone wishing to forge a rune blade to aid in the creation the item by helping perform part of these rites.</p>
            </li>
          </ul>
        </section>
    } else {
      section = 
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

                if ( this.state.activeRuneList[key].found ) {
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
              })
            }
          </ul>
        </section>
    }

    return (
      <Page.Runes>
        <div className="dwarfRunes">
          <section className="runeGroups">
            <form id="runeType">
              <label key="rules" className={`rules ${ (this.state.activeRuneType === "rules") ? "active" : "" }`}>
                The Rules of Forging
                <input type="radio" name="runeType" className="choiceBtn"  value="rules" onClick={this.showRules} />
              </label>
              { 
                this.state.runeGroups.map( x => {
                  return (
                    <label key={x} className={ (this.state.activeRuneType === x ) ? 'active' : '' }>{x}<input type="radio" name="runeType" className="choiceBtn"  value={x} onChange={this.getRuneList} /></label>
                  )
                })
              }              
            </form>
          </section>

          {section}
        </div>
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

    this.setState({
      activeRuneType: runeType,
      activeRuneList: dwarfRunes[runeType]      
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