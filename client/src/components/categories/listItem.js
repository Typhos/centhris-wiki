import React, { Component } from "react";
import { Link } from "react-router-dom";
import WikiUtils from "components/utils/wikiUtils.js";
import getImgPath from "components/utils/getImgPath.js";

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem("dmView") === "true",
    };
  }

  render() {
    const { entry, imgStyle } = this.props;
    const { dmView } = this.state;
    const id = entry.name.replace(/\s/g, "-");

    return (
      <li
        component-name='listItemComponent'
        key={entry.name.replace(/\s/g, "-")}
        className='category__entry'
        id={entry.name.replace(/\s/g, "-")}
      >
        <Link
          className='category__link'
          to={{ pathname: `/${entry.path}/${id}`, state: "update" }}
        >
          <img
            className={`category__img ${
              imgStyle || "landscape"
            } ${this.checkEmptyEntry(entry)}`}
            alt=''
            src={getImgPath(id, entry, { styles: imgStyle })}
          />

          <p
            className={`category__text ${
              dmView && !entry.playerKnown ? "hidden" : ""
            }`}
          >
            {entry.name}
          </p>
        </Link>
      </li>
    );
  }

  checkEmptyEntry(entry) {
    // if (this.state.dmView && WikiUtils.stubCheck(entry) ) {
    //   return "empty";
    // }
    return "";
  }
}

export default ListItem;
