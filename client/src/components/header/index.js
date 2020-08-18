import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from "components/search";

import 'styles/header.scss';

class Header extends Component {

  constructor(props) {
    super(props);

    const images = require.context('img', false);
    
    if (!sessionStorage.getItem("headerImg")) {
      const imgList = images.keys().filter( img => img.includes("header-bg") );
      const leng = imgList.length;
      const randomInt = this.randomInt(1, leng);

      sessionStorage.setItem('headerImg', imgList[randomInt - 1]);
    }

    this.state = {
      images: images,
    };

    this.randomInt = this.randomInt.bind(this);
    // this.randomImage = this.randomImage.bind(this);
  }

  render () {
    const style = {
      backgroundImage: `url(${this.state.images( sessionStorage.getItem("headerImg") )})`
    };

    return (
      <header className="appHeader">
        <div className="headerBox" style={style}>
          <div className="wikiLogo">
            <Link className="home" to="/">The World of Centhris</Link>
          </div>
        </div>

        <div className="mobileSearch">
          <Search />
        </div>
      </header>
    )
  }

  randomInt (min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let num = Math.abs ( Math.floor ( (Math.sin(Math.random() * 9301) * 1000) * ( Math.sin(Math.random() * 49297) * 10001) ) )
    num = (num * 9301 + 49297) % 233280;
    const rnd = num / 233280;

    // return Math.floor( Math.random() * (max - min + 1) ) + min; //The maximum is inclusive and the minimum is inclusive 
    return Math.floor( Math.abs(min + Math.floor(rnd * (max - min + 1 ))));
  }
}

export default Header;