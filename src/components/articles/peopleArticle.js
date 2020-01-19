import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import "./peopleArticle.scss";

export default class PeopleArticle extends Component {

  constructor (props) {
    super(props);

    this.linkContent = this.linkContent.bind(this);
  }

  render () {
    const person = this.props.entry;

    return (
      <article className="person" id={person.name.replace(/\s/,"_")}>
        <h3 className="fullName">{person.name}</h3>
        <aside className="infoBox">
          <h4 className="nickname">{person.nickname}</h4>
          <img className="portrait" alt="" src={this.props.image}/>
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
            <p className="values">{person.affiliations}</p>
          </div>
        </aside>
        <div className="mainContent">
          { (person.quote) ? 
            <i className="quote">{person.quote}</i> : ""
          }
          {this.linkContent(person, person.description)}

        </div>
        <div className="clear"></div>
      </article>
    )
  }

  linkContent(currentPerson, descriptionArray) {
    const {peopleData} = this.props.data;

    function checkNestedArray(para, name) {
      if ( Array.isArray(para[0]) ) {
        return para.some( a => {
          let bol = false;
          a.forEach( x => {
            if ( typeof x === 'string' && x.includes(name)) {
              bol = true;
            }
          })
          return bol;
        })
      }
    }

    let mapped = descriptionArray.map( (para,i) => {
      para = [para];

      for ( let [key, obj] of Object.entries(peopleData) ) {
        const name = obj.name;
        const nickname = obj.nickname;

        const namesObj = {
          name: name, 
          nickname: nickname
        };

        for ( let [key, val] of Object.entries(namesObj) ) {
          const link = <Link key={`key-${i}-${currentPerson}`} to={`/person/${name.replace(/\s/g,"-")}`}>{val}</Link>;

          if ( para.some( v => v.indexOf(val) >= 0) && val !== currentPerson[key] && currentPerson[key] === "Priceli Nezella Philyorin") {

            para = para.map( e => e.replace(val, `|${val}|`));
            para = para.map( e => e.split("|"));

            para = para.map( str => {
              return str.map( sub => ( sub === val ) ? link : sub);
            });

          } else if ( checkNestedArray(para, val) && val !== currentPerson[key] && currentPerson[key] === "Priceli") {

            para.map( (outer, i) => {
              outer.map( (inner,j) => {
                if ( typeof inner === 'string' && inner.includes(val) ) {
                  let rep = inner.replace(val, `|${val}|`);
                  rep = rep.split("|");

                  rep = rep.map( str => {
                    return ( str === val ) ? link : str;
                  });

                  para[i][j] = rep;

                }
              })
            });

            para.flat(Infinity);
            console.log(para);
          }
        }
      }

      return <p key={currentPerson+i}>{para}</p>;
    });

    return mapped.flat();
  }
}