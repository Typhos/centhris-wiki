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
        
        { entry.race && 
          <div className="infoCard__row">
            <p className="infoCard__key">Race</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.race, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.gender && 
          <div className="infoCard__row">
            <p className="infoCard__key">Gender</p>
            <p className="infoCard__values">{entry.gender}</p>
          </div>
        }
        { entry.age &&
          <div className="infoCard__row">
            <p className="infoCard__key">Age</p>
            <p className="infoCard__values">{entry.age}</p>
          </div>
        }
        { entry.birthYear && 
          <div className="infoCard__row">
            <p className="infoCard__key">Born</p>
            <p className="infoCard__values monoSpace">{entry.birthYear}</p>
          </div>
        }
        { entry.deathYear && 
          <div className="infoCard__row">
            <p className="infoCard__key">Died</p>
            <p className="infoCard__values monoSpace">{entry.deathYear}</p>
          </div>
        }
        { entry.occupation && 
          <div className="infoCard__row">
            <p className="infoCard__key">Occupation</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.occupation, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.affiliations &&
          <div className="infoCard__row">
            <p className="infoCard__key">Affiliation(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.affiliations, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.player &&
          <div className="infoCard__row">
            <p className="infoCard__key">Player</p>
            <p className="infoCard__values">{ WikiUtils.textFormatting(entry.player) }</p>
          </div>
        }
        { entry.class &&
          <div className="infoCard__row">
            <p className="infoCard__key">Class</p>
            <p className="infoCard__values">{ WikiUtils.textFormatting(entry.class) }</p>
          </div>
        }
        { entry.subclass &&
          <div className="infoCard__row">
            <p className="infoCard__key">Subclass</p>
            <p className="infoCard__values">{ WikiUtils.textFormatting(entry.subclass) }</p>
          </div>
        }
        { entry.background &&
          <div className="infoCard__row">
            <p className="infoCard__key">Background</p>
            <p className="infoCard__values">{ WikiUtils.textFormatting(entry.background) }</p>
          </div>
        }
        
      </React.Fragment>
    )
  }
}