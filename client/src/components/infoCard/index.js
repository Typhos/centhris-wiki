import React, {Component} from 'react';
import ItemCard from "./itemCard";
import LocationCard from "./locationCard";
import LoreCard from "./loreCard";
import MonsterCard from "./monsterCard";
import OrgCard from "./orgCard";
import PersonCard from "./personCard";
import SpellCard from "./spellCard";
import getImgPath from "components/utils/getImgPath.js";
import "styles/infoCard.scss";

export default class InfoCard extends Component {
  
  render () {
    let {
      entry,
      display
    } = this.props;

    let imgSrc = getImgPath(entry.name, entry);

    return (
      <aside className={`infoCard ${display}`}>
        <h4 className="infoCard__name">{entry.name}</h4>

        { !imgSrc.includes("placeholder") && !imgSrc.includes("unknown") &&
          <img className="infoCard__portrait" alt="" src={ imgSrc }/>
        }

        { display === "creature" &&
          <MonsterCard entry={entry}/>
        }

        { display === "item" &&
          <ItemCard entry={entry}/>
        }

        { display === "lore" &&
          <LoreCard entry={entry} />
        }

        { display === "location" &&
          <LocationCard entry={entry}/>
        }

        { display === "organization" &&
          <OrgCard entry={entry}/>
        }

        { (display === "person" || display === "player-character") &&
          <PersonCard entry={entry}/>
        }

        { display === "spell" &&
          <React.Fragment>
            <figure className="infoCard__figure">
              <img className="infoCard__spellSchool" alt="" src={ getImgPath(entry.school.replace(/\s/g,"-")) }/>
            </figure>
            <SpellCard entry={entry}/>
          </React.Fragment>
          
        }
        
      </aside>
    )
  }

}