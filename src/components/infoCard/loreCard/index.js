import React, {Component} from 'react';
import WikiUtils from "components/utils/wikiUtils";
import getImgPath from "components/utils/getImgPath.js";

export default class LoreCard extends Component {

  arrayToLi = function(value) {
    return value.map( val => <li className="infoCard__listItem" key={val} >{val}</li>);
  }

  render() {
    const { entry } = this.props;

    return (
      <React.Fragment>
        {/* { entry.name === "The Vesdarian Calendar" && 
        <div className="infoCard__row">
          <p className="infoCard__key">
            <a href={ imgs( imgs.keys().filter(x => x.includes( entry.name.replace(/\s/g,"-") )) )} target="_blank"  rel="noopener noreferrer">Full Size Image</a>
          </p>
        </div>
        } */}
        { entry.type && 
        <div className="infoCard__row">
          <p className="infoCard__key">Type</p>
          <p className="infoCard__values">{entry.type}</p>
        </div>
        }

        { entry.alignment && 
          <div className="infoCard__row">
            <p className="infoCard__key">Alignment</p>
            <p className="infoCard__values">{entry.alignment}</p>
          </div>
        }

        { entry.trueName && 
          <div className="infoCard__row">
            <p className="infoCard__key">True Name</p>
            <p className="infoCard__values">{entry.trueName}</p>
          </div>
        }

        { entry.parents && 
          <div className="infoCard__row">
            <p className="infoCard__key">Parents</p>
            <p className="infoCard__values">{WikiUtils.linkContent(entry, entry.parents, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</p>
          </div>
        }

        { entry.siblings && 
          <div className="infoCard__row">
            <p className="infoCard__key">Siblings</p>
            <p className="infoCard__values">{WikiUtils.linkContent(entry, entry.siblings, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</p>
          </div>
        }

        { entry.consorts && 
          <div className="infoCard__row">
            <p className="infoCard__key">Consorts</p>
            <p className="infoCard__values">{WikiUtils.linkContent(entry, entry.consorts, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</p>
          </div>
        }

        { entry.children && 
          <div className="infoCard__row">
            <p className="infoCard__key">Children</p>
            <p className="infoCard__values">{WikiUtils.linkContent(entry, entry.children, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</p>
          </div>
        }

        { entry.gender && 
          <div className="infoCard__row">
            <p className="infoCard__key">Gender</p>
            <p className="infoCard__values">{entry.gender}</p>
          </div>
        }

        { entry.symbol && 
          <div className="infoCard__row">
            <p className="infoCard__key">Symbol(s)</p>
            <p className="infoCard__values">{entry.symbol}</p>
          </div>
        }

        { entry.portfolio && 
          <div className="infoCard__row">
            <p className="infoCard__key">Portfolio</p>
            <ul className="infoCard__values infoCard__list">
              { this.arrayToLi(entry.portfolio) }
            </ul>
          </div>
        }
        { entry.majorTemples && 
          <div className="infoCard__row">
            <p className="infoCard__key">Major Temple(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.majorTemples, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.titles && 
          <div className="infoCard__row">
            <p className="infoCard__key">Title(s)</p>
            <ul className="infoCard__values infoCard__list">
              { this.arrayToLi(entry.titles) }
            </ul>
          </div>
        }
        { entry.worshipers && 
          <div className="infoCard__row">
            <p className="infoCard__key">Worshipers</p>
            <ul className="infoCard__values infoCard__list">
              { this.arrayToLi(entry.worshipers) }
            </ul>
          </div>
        }

        { entry.shrineImg && 
          entry.shrineImg.map( src => {
            return (
              <div key={entry.name} className="infoCard__altImg">
                <p className="infoCard__key">Shrine</p>
                <img alt="" className="infoCard__bonusImg" src={ getImgPath(src, entry) }/>
              </div>
            )
          })
        }

        {/* WEAPON RELATED */}

        { entry.type === "Weapon" && entry.cost &&
          <div className="infoCard__row">
            <p className="infoCard__key">Cost</p>
            <div className="infoCard__values">{entry.cost}</div>
          </div>
        }
        { entry.type === "Weapon" && entry.weight &&
          <div className="infoCard__row">
            <p className="infoCard__key">Weight</p>
            <div className="infoCard__values">{entry.weight}</div>
          </div>
        }
        { entry.type === "Weapon" && entry.damage &&
          <div className="infoCard__row">
            <p className="infoCard__key">Damage</p>
            <div className="infoCard__values">{entry.damage}</div>
          </div>
        }
        { entry.type === "Weapon" && entry.properties &&
          <div className="infoCard__row">
            <p className="infoCard__key">Properties</p>
            <div className="infoCard__values">
              {WikiUtils.linkContent(entry, entry.properties, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }

        {/* SHIP RELATED */}

        { entry.type === "Ship" && entry.class &&
          <div className="infoCard__row">
            <p className="infoCard__key">Ship Class</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.class, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.type === "Ship" && entry.speed &&
          <div className="infoCard__row">
            <p className="infoCard__key">Speed</p>
            <div className="infoCard__values">entry.speed</div>
          </div>
        }
        
        { entry.type !== "Ship" && entry.class &&
          <div className="infoCard__row">
            <p className="infoCard__key">Class</p>
            <div className="infoCard__values">
              {WikiUtils.linkContent(entry, entry.class, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }

        {/* CALENDAR EVENTS & RELATED */}

        { entry.dates && 
          <div className="info dates">
            <p className="infoCard__key">Date(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.dates, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.date && 
          <div className="infoCard__row">
            <p className="infoCard__key">Date</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.date, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.associations && 
          <div className="infoCard__row">
            <p className="infoCard__key">Associated with</p>
            <div className="infoCard__values">
              { WikiUtils.linkContent(entry, entry.associations, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
    
}