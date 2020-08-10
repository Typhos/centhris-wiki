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
        
        { entry.school &&
          <div className="infoCard__row">
            <p className="infoCard__key">School</p>
            <p className="infoCard__values">
              {entry.school}
              { entry.ritual && 
                <span> (ritual)</span>
              }
            </p>
          </div>
        }
        { entry.level &&
          <div className="infoCard__row big">
            <p className="infoCard__key">Level</p>
            <p className="infoCard__values green">{entry.level}</p>
          </div>
        }
        { entry.damageEffect &&
          <div className="infoCard__row">
            <p className="infoCard__key">Damage/Effect</p>
            <p className="infoCard__values">{entry.damageEffect}</p>
          </div>
        }
        { entry.castingTime &&
          <div className="infoCard__row">
            <p className="infoCard__key">Casting Time</p>
            <p className="infoCard__values">{entry.castingTime}</p>
          </div> 
        }
        { entry.range &&
          <div className="infoCard__row">
            <p className="infoCard__key">Range/Area</p>
            <p className="infoCard__values">{entry.range}</p>
          </div>
        }
        { entry.components &&
          <div className="infoCard__row">
            <p className="infoCard__key">Components</p>
            <p className="infoCard__values">{
              entry.components.map( (comp,i) => {
                if ( i < entry.components.length - 1) {
                  return <span>{comp + ", "}</span>;
                } else {
                  return <span>{comp}</span>;
                }
              })
            }</p>
          </div>
        }
        { entry.materialComponent && 
          <div className="infoCard__row">
            <p className="infoCard__key">Material Component(s)</p>
            <p className="infoCard__values">{entry.materialComponent}</p>
          </div>
        }
        { entry.duration &&
          <div className="infoCard__row">
            <p className="infoCard__key">Duration</p>
            <p className="infoCard__values">{entry.duration}</p>
          </div>
        }
        { entry.attackOrSave &&
          <div className="infoCard__row">
            <p className="infoCard__key">Attack/Save</p>
            <p className="infoCard__values">{entry.attackOrSave}</p>
          </div>
        }
        { entry.classes &&
          <div className="infoCard__row">
            <p className="infoCard__key">Available to:</p>
            <div className="infoCard__values">{
              entry.classes.map( pc => <p class="demiList">{pc}</p> )
            }</div>
          </div>
        }
      </React.Fragment>
    )
  }
}