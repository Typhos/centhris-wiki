import React, { Component } from 'react';
import WikiUtils from "components/utils/wikiUtils";
import Back from '../../components/back';
import StatBlock from 'components/articles/statBlock';
import getImgPath from "components/utils/getImgPath.js";

import "styles/articles.scss";

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

    const getMod = function(score) {
      const num = Math.round( (10.5 - score ) * -1 / 2 );
      return ( num >= 0 ) ? `+${num}` : `${num}`;
    }

    const stats = function() {
      let array = [];
      for ( let [key, val] of Object.entries(person.stats) ) { 
        array.push(
          <div className="block">
            <span className="stat">{key}</span> 
            <span className="num">
              <span className="mod">{getMod(val)}</span> <small className="score">({val})</small>
            </span>
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
          <div key={val} className="attacks">
            <span className="name">{key}</span> <span className="stats">{val}</span>
          </div>
        )
      }
      return array;
    }

    const attunedItems = person.attunedItems && person.attunedItems.map( item => <li className="item" key={item}>{item}</li>);
    const id = person.name.replace(/\s/g,"-");

    return (

      <article className="person article" id={id}>

        <Back/>

        <h2 className="fullName">{person.nickname}</h2>
        <aside className={`infoBox ${ this.state.dmView || ""}`}>
          <h4 className="nickname">{person.name}</h4>
          <img className={`portrait ${ (!this.props.image) ? "fillSpace" : "" }`} alt="" src={ new getImgPath(id, this.props.entry, "portrait").src }/>
          { person.titles &&
            <div className="info">
              <p className="key">Title(s)</p>
              <div className="values">{
                person.titles.map( title => {
                  return <React.Fragment key={title}>
                    <p className="linkedContent">{title}</p>
                  </React.Fragment>
                })
              }</div>
            </div> 
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
          { person.feats && this.state.dmView &&
            <div className="info">
              <p className="key">Feats</p>
              <div className="values">{WikiUtils.linkContent(person, person.feats)}</div>
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
          { person.player &&
            <div className="info affiliations">
              <p className="key">Player</p>
              <p className="values">{ WikiUtils.textFormatting(person.player) }</p>
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
          {WikiUtils.stubCheck(person)}
          { person.quote && <i className="quote">{person.quote}</i> }
          {descriptionEntries}
          
          { ( this.state.dmView || person.showStatBlock ) &&
            <StatBlock entry={person}/>
          }
        </div>

      </article>
    )
  }

  getArticles(person) {
    let content = [WikiUtils.linkContent(person, WikiUtils.textFormatting( person.description) )];

    if (person.articles) {
      for ( let [heading, array] of Object.entries(person.articles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(person, WikiUtils.textFormatting(array))}
          </React.Fragment>
        );
      }
    }

    if ( this.state.dmView && person.dmArticles ) {
      for ( let [heading, array] of Object.entries(person.dmArticles) ) {
        content.push(
          <React.Fragment key={heading}>
            <h3 className="subjectArea">{heading}</h3>
            {WikiUtils.linkContent(person, WikiUtils.textFormatting( array) )}
          </React.Fragment>
        );
      }
    }

    return content;
  }
}