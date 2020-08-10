import React, {Component} from 'react';
import WikiUtils from "components/utils/wikiUtils";

export default class PersonCard extends Component {

  arrayToLi = function(value) {
    return value.map( val => <li className="infoCard__listItem" key={val} >{val}</li>);
  }

  render() {
    const { entry } = this.props;

    return (
      <React.Fragment>

        { entry.type && 
          <div className="infoCard__row">
            <p className="infoCard__key">Type</p>
            <p className="infoCard__values">{entry.type}</p>
          </div>
        }

        {entry.type !== "Ship" && entry.class &&
          <div className="infoCard__row">
            <p className="infoCard__key">Class</p>
            <div className="infoCard__values">
              {WikiUtils.linkContent(entry, entry.class)}
            </div>
          </div>
        }

      {/* MAGIC ITEM RELATED */}        
      
        {entry.rarity &&
          <div className="infoCard__row">
            <p className="infoCard__key">Rarity</p>
            <div className="infoCard__values">{entry.rarity}</div>
          </div>
        } 
        {entry.attunement &&
          <div className="infoCard__row">
            <div className="infoCard__values">Requires Attunement</div>
          </div>
        }

      {/* WEAPON RELATED */}

        {entry.type === "Weapon" && entry.cost &&
          <div className="infoCard__row">
            <p className="infoCard__key">Cost</p>
            <div className="infoCard__values">{entry.cost}</div>
          </div>
        }
        {entry.type === "Weapon" && entry.weight &&
          <div className="infoCard__row">
            <p className="infoCard__key">Weight</p>
            <div className="infoCard__values">{entry.weight}</div>
          </div>
        }
        {entry.type === "Weapon" && entry.damage &&
          <div className="infoCard__row">
            <p className="infoCard__key">Damage</p>
            <div className="infoCard__values">{entry.damage}</div>
          </div>
        }
        {entry.type === "Weapon" && entry.properties &&
          <div className="infoCard__row">
            <p className="infoCard__key">Properties</p>
            <div className="infoCard__values">
              {WikiUtils.linkContent(entry, entry.properties, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }

      {/* SHIP RELATED */}
        
        {entry.type === "Ship" && entry.class &&
          <div className="infoCard__row">
            <p className="infoCard__key">Ship Class</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.class, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        {entry.type === "Ship" && entry.speed &&
          <div className="infoCard__row">
            <p className="infoCard__key">Speed</p>
            <div className="infoCard__values">{entry, entry.speed}</div>
          </div>
        }
      </React.Fragment>
    )
  }
}