import React, { Component } from 'react';

import "../../styles/Articles/peopleArticle.scss";

const images = require.context('../../img/portraits/', true);

class PeopleArticle extends Component {

  // constructor (props) {
  //   super(props);
  // }

  render () {
    const person = this.props.entry;

    return (
      <article className="person" id={person.name.replace(/\s/,"_")}>
        <h3 className="fullName">{person.name}</h3>
        <aside className="infoBox">
          <h4 className="nickname">{person.nickname}</h4>
          <img className="portrait" alt="" src={images('./' + person.name.replace(/\s/g,"_") + '.png')}/>
          { (person.titles) ? 
            <div className="info">
              <p className="key">Title(s)</p>
              <p className="values">{person.titles}</p>
            </div> : "" 
          }
          <div className="info">
            <p className="key">Age</p>
            <p className="values">{person.age}</p>
          </div>
          <div className="info">
            <p className="key">Gender</p>
            <p className="values">{person.gender}</p>
          </div>
          <div className="info">
            <p className="key">Race</p>
            <p className="values">{person.race}</p>
          </div>
          { (person.occupation) ? 
            <div className="info">
              <p className="key">Occupation</p>
              <p className="values">{person.occupation}</p>
            </div> : "" 
          }
          { (person.class) ? 
            <div className="info">
              <p className="key">Character class</p>
              <p className="values">{person.class}</p>
            </div> : "" 
          }
          <div className="info">
            <p className="key">Affiliation(s)</p>
            <p className="values" dangerouslySetInnerHTML={{__html: person.affiliations}}></p>
          </div>
        </aside>
        <main className="mainContent">
          { (person.quote) ? 
            <i className="quote">{person.quote}</i> : ""
          }
          <p dangerouslySetInnerHTML={{__html: person.description}}></p>
        </main>
        <div className="clear"></div>
      </article>
    )
  }
}

export default PeopleArticle;