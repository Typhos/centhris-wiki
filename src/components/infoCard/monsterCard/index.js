import React, {Component} from 'react';
import WikiUtils from "components/utils/wikiUtils";

export default class LocationCard extends Component {

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
            <p className="infoCard__values">{WikiUtils.textFormatting(entry.type)}</p>
          </div>
        }

        { entry.affiliations &&
          <div className="infoCard__row">
            <p className="infoCard__key">Affiliation(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.affiliations)}</div>
          </div>
        }
        
        { entry.challenge && this.state.dmView && 
          <div className="infoCard__row">
            <p className="infoCard__key">Challenge</p>
            <p className="infoCard__values">{entry.challenge}</p>
          </div>
        }
        { entry.alignment && this.state.dmView && 
          <div className="infoCard__row">
            <p className="infoCard__key">Alignment</p>
            <p className="infoCard__values">{entry.alignment}</p>
          </div>
        }
      </React.Fragment>
    )
  }
}
