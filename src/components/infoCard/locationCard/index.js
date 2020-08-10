import React, {Component} from 'react';
import WikiUtils from "components/utils/wikiUtils";
import getImgPath from "components/utils/getImgPath.js";

export default class LocationCard extends Component {

  arrayToLi = function(value) {
    return value.map( val => <li className="infoCard__listItem" key={val} >{val}</li>);
  }

  render() {
    const { entry } = this.props;
    const currencyImg = entry.currency && getImgPath(entry.currency);

    return (
      <React.Fragment>
        { entry.type &&  
          <div className="infoCard__row">
            <p className="infoCard__key">Type</p>
            <p className="infoCard__values">{entry.type}</p>
          </div>
        }

        { entry.capital && 
          <div className="infoCard__row">
            <p className="infoCard__key">Capital</p>
            <div className="infoCard__values">
              { WikiUtils.linkContent(entry, entry.capital, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }

        { entry.location && 
          <div className="infoCard__row">
            <p className="infoCard__key">Location</p>
            <div className="infoCard__values">
              { WikiUtils.linkContent(entry, entry.location, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }
            </div>
          </div>
        }

        { entry.area && 
          <div className="infoCard__row">
            <p className="infoCard__key">Area</p>
            <p className="infoCard__values">{entry.area}</p>
          </div> 
        }

        { entry.population && 
          <div className="infoCard__row">
            <p className="infoCard__key">Population</p>
            <p className="infoCard__values">{entry.population}</p>
          </div> 
        }

        { entry.demonyms && 
          <div className="infoCard__row">
            <p className="infoCard__key">Demonym(s)</p>
            <p className="infoCard__values">{entry.demonyms}</p>
          </div> 
        }

        { entry.government &&
          <div className="infoCard__row">
            <p className="infoCard__key">Government</p>
            <p className="infoCard__values">{entry.government}</p>
          </div>
        }

        { entry.emblem && 
          <div className="infoCard__row">
            <p className="infoCard__key">Emblem</p>
            <p className="infoCard__values">
              <img className="infoCard__emblem" alt="" src={ getImgPath(entry.emblem) }/>
            </p>
          </div>
        }

        { entry.currency && 
          <div className="infoCard__row">
            <p className="infoCard__key">Currency</p>
            <p className="infoCard__values">
              {entry.currency}
              { !currencyImg.includes("placeholder") && 
                <img className="infoCard__currency" alt="" src={ currencyImg }/>
              }
            </p>
          </div>
        }
        { entry.leaders && 
          <div className="infoCard__row">
            <p className="infoCard__key">Leader(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.leaders, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.river && 
          <div className="infoCard__row">
            <p className="infoCard__key">River</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.river, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }
        { entry.lake && 
          <div className="infoCard__row">
            <p className="infoCard__key">Lake</p>
            <div className="infoCard__values">
              { WikiUtils.linkContent(entry, entry.lake) }
            </div>
          </div>
        }

        { entry.districts &&
          <div className="infoCard__row">
            <p className="infoCard__key">Districts</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.districts, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.cities && 
          <div className="infoCard__row">
            <p className="infoCard__key">Major Cities</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.cities, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.races && 
          <div className="infoCard__row">
            <p className="infoCard__key">Race(s)</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.races, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"}) }</div>
          </div>
        }

        { entry.nation &&  
          <div className="infoCard__row">
            <p className="infoCard__key">State</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.nation, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"})}</div>
          </div>
        }

        { entry.regions && 
          <div className="infoCard__row">
            <p className="infoCard__key">Regions</p>
            <div className="infoCard__values">{WikiUtils.linkContent(entry, entry.regions, {"paragraphName":"infoCard__entry", "linkName": "infoCard__link"})}</div>
          </div>
        }
        
        { entry.additionalImages && 
          entry.additionalImages.map( image => {
            image = getImgPath(image);

            if (image) {
              return (
                <div className="infoCard__altImg" key={image}>
                  <a className="link" href={ image }>
                    <img alt="" className="infoCard__bonusImg" src={ image }/>
                  </a>
                </div>
              )
            }

            return undefined;
          })
        }

        { entry.map && 
          <div className="infoCard__altImg">
            <p className="infoCard__key">Map</p>
            <a href={ getImgPath(entry.map.replace(/\s/g,"-")) }>
              <img alt="map" className="infoCard__bonusImg" src={ getImgPath(entry.map.replace(/\s/g,"-")) }/>
            </a>
          </div>   
        }
      </React.Fragment>
    )
  }
}