import React, {Component} from 'react';
import WikiUtils from "components/utils/wikiUtils";
import getImgPath from "components/utils/getImgPath.js";

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
            <p className="infoCard__values">{entry.type}</p>
          </div>
        }

        { entry.leaders && 
          <div className="infoCard__row">
            <p className="infoCard__key">Leader(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.leaders, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.members &&
          <div className="infoCard__row">
            <p className="infoCard__key">Members(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.members, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.memberNumber &&
          <div className="infoCard__row">
            <p className="infoCard__key">Number of Members</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.memberNumber, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.location &&
          <div className="infoCard__row">
            <p className="infoCard__key">Location</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.location, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.additionalImages && entry.additionalImages.map( image => {
            return (
              <div className="info mapBox">
                  <img alt="" className="additional" src={ getImgPath(image, entry) }/>
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }
}