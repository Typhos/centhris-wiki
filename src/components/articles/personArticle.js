import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Back from '../../components/back';

import "styles/personArticle.scss";

export default class PeopleArticle extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }

    this.getArticles = this.getArticles.bind(this);
  }

  render () {
    const person = this.props.entry;
    const descriptionEntries = this.getArticles(person);

    const stats = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.stats) ) { 
        array.push(
          <div className="block">
            <span className="stat">{key}</span> <span className="num">{val}</span>
          </div>
        )
      }
      return array;
    }

    const saves = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.saves) ) { 
        array.push(
          <div key={key} className="block">
            <span className="stat">{key}</span> <span className="num">{val}</span>
          </div>
        )
      }
      return array;
    }

    const skills = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.skills) ) { 
        array.push(
          <div key={val} className="block">
            <small className="stat">{key}</small> <span className="num">{val}</span>
          </div>
        )
      }
      return array;
    }

    const attacks = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.attacks) ) { 
        array.push(
          <div key={val} className="block">
            <small className="stat">{key}</small> <span className="num">{val}</span>
          </div>
        )
      }
      return array;
    }

    const attunedItems = person.attunedItems && person.attunedItems.map( item => <li className="item" key={item}>{item}</li>);

    return (

      <article className="person" id={person.name.replace(/\s/g,"-")}>

        <Back/>

        <h2 className="fullName">{person.nickname}</h2>
        <aside className={`infoBox ${ this.state.dmView}`}>
          <h4 className="nickname">{person.name}</h4>
          <img className="portrait" alt="" src={this.props.image}/>
          { (person.titles) ? 
            <div className="info">
              <p className="key">Title(s)</p>
              <div className="values">{
                person.titles.map( title => {
                  return <React.Fragment>
                    <p className="linkedContent">{title}</p>
                  </React.Fragment>
                })
              }</div>
            </div> : "" 
          }
          { person.race && 
            <div className="info">
              <p className="key">Race</p>
              <div className="values">{WikiUtils.linkContent(person, person.race)}</div>
            </div>
          }
          { person.gender && 
            <div className="info">
              <p className="key">Gender</p>
              <p className="values">{person.gender}</p>
            </div>
          }
          { person.age &&
            <div className="info">
              <p className="key">Age</p>
              <p className="values">{person.age}</p>
            </div>
          }
          { person.birthYear && 
            <div className="info">
              <p className="key">Born</p>
              <p className="values monoSpace">{person.birthYear}</p>
            </div>
          }
          { person.deathYear && 
            <div className="info">
              <p className="key">Died</p>
              <p className="values monoSpace">{person.deathYear}</p>
            </div>
          }
          { person.background && this.state.dmView && 
            <div className="info">
              <p className="key">Background</p>
              <p className="values">{person.background}</p>
            </div>
          }
          { person.class && this.state.dmView && 
            <div className="info">
              <p className="key">Character class</p>
              <p className="values">{person.class}</p>
            </div>
          }
          { person.subclass && this.state.dmView &&
            <div className="info">
              <p className="key">Subclass</p>
              <p className="values">{person.subclass}</p>
            </div>
          }
          { person.level && this.state.dmView && 
            <div className="info">
              <p className="key">Level</p>
              <p className="values big">{person.level}</p>
            </div>
          }
          { person.languages && this.state.dmView && 
            <div className="info">
              <p className="key">Languages</p>
              <p className="values">{person.languages}</p>
            </div>
          }
          { person.ac && this.state.dmView && 
            <div className="info">
              <p className="key">Armor Class</p>
              <p className="values">{person.ac}</p>
            </div>
          }
          { person.stats && this.state.dmView && 
            <div className="statblock">
              <p className="heading">Stats</p>
              {stats()}
            </div>
          }
          { person.saves && this.state.dmView &&
            <div className="statblock saves">
              <p className="heading">Saves</p>
              {saves()}
            </div>
          }
          { person.skills && this.state.dmView &&
            <div className="statblock skills">
              <p className="heading">Skills</p>
              {skills()}
            </div>
          }
          { person.passiveWisdom && this.state.dmView && 
            <div className="info">
              <p className="key">Passive Wisdom</p>
              <p className="values">{person.passiveWisdom}</p>
            </div>
          }
          { person.attacks && this.state.dmView &&
            <div className="statblock attacks">
              <p className="heading">Attacks</p>
              {attacks()}
            </div>
          }
          { person.attunedItems && this.state.dmView &&
            <div className="attunedItems">
              <p className="heading">Attuned Items</p>
              {attunedItems}
            </div>
          }
          { person.occupation && 
            <div className="info">
              <p className="key">Occupation</p>
              <div className="values">{WikiUtils.linkContent(person, person.occupation)}</div>
            </div>
          }
          { person.affiliations &&
            <div className="info affiliations">
              <p className="key">Affiliation(s)</p>
              <div className="values">{WikiUtils.linkContent(person, person.affiliations)}</div>
            </div>
          }
          { person.link && this.state.dmView &&
            <div className="info link">
              <a href={person.link} target="_blank" rel="noopener noreferrer">
                <p className="heading">D&D Beyond Profile</p>
              </a>
            </div>
          }
        </aside>
        <div className="mainContent">
          { person.quote && <i className="quote">{person.quote}</i> }
          {descriptionEntries}
        </div>
        <div className="clear"></div>
      </article>
    )
  }

  getArticles(person) {
    let content = [WikiUtils.linkContent(person, WikiUtils.textFormatting( person.description) )];

    if (person.articles) {
      for ( let [heading, array] of Object.entries(person.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(person, array)}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && person.dmArticles ) {
      for ( let [heading, array] of Object.entries(person.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subheading">{heading}</h3>
            {WikiUtils.linkContent(person, WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}