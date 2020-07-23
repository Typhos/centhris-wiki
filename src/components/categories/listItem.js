import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WikiUtils from "components/utils/wikiUtils.js";
import getImgPath from "components/utils/getImgPath.js";

class ListItem extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem('dmView') === 'true'
    }
  }

  render () {
    const entry = this.props.entry;
    const id = entry.name.replace(/\s/g,"-");

    return (
      <li component-name="listItemComponent" key={entry.name.replace(/\s/g,"-")} className="person entry" id={entry.name.replace(/\s/g,"-")}>
        <Link className="personLink" to={ { pathname:`/${entry.path}/${id}`, state: "update" }}>
          
          <img 
            className={`${this.props.imgStyle || "landscape"} ${this.checkEmptyEntry(entry)}`} 
            alt="" 
            src={ new getImgPath(id, entry, this.props.imgStyle).src }
          />

          <p className={`name ${(this.state.dmView && !entry.playerKnown) ? "hidden": ""}`}>{ entry.name }</p>
        </Link>
      </li>
    )
  }

  checkEmptyEntry(entry) {
    if (this.state.dmView && WikiUtils.stubCheck(entry) ) {
      return "empty";
    }

    return "";
  }


}

export default ListItem;